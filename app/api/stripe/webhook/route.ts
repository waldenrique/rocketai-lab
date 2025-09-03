import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { updateOrderStatus, getOrderByStripeSession } from '@/lib/supabase-utils';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura Stripe ausente' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook do Stripe:', error);
    return NextResponse.json(
      { error: 'Erro no webhook' },
      { status: 400 }
    );
  }
}

async function handleCheckoutCompleted(session: any) {
  try {
    console.log('Checkout completado:', session.id);

    // Buscar pedido no Supabase
    const order = await getOrderByStripeSession(session.id);
    if (!order) {
      console.error('Pedido não encontrado:', session.id);
      return;
    }

    // Atualizar status do pedido para completed
    await updateOrderStatus(
      session.id,
      'completed',
      session.payment_intent
    );

    // Aqui você pode adicionar lógica para:
    // - Enviar email de confirmação
    // - Gerar links de download
    // - Notificar sistemas externos

    console.log('Pedido atualizado com sucesso:', order.id);
  } catch (error) {
    console.error('Erro ao processar checkout completado:', error);
  }
}

async function handlePaymentSucceeded(paymentIntent: any) {
  try {
    console.log('Pagamento bem-sucedido:', paymentIntent.id);
    
    // Lógica adicional se necessário
    // O status já foi atualizado no checkout.session.completed
  } catch (error) {
    console.error('Erro ao processar pagamento bem-sucedido:', error);
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  try {
    console.log('Pagamento falhou:', paymentIntent.id);
    
    // Buscar pedido pela payment_intent_id se necessário
    // e atualizar status para 'failed'
    
  } catch (error) {
    console.error('Erro ao processar falha no pagamento:', error);
  }
}
