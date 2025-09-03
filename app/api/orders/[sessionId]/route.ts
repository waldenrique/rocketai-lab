import { NextRequest, NextResponse } from 'next/server';
import { getOrderByStripeSession } from '@/lib/supabase-utils';
import { stripe } from '@/lib/stripe-server';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar pedido no Supabase
    const order = await getOrderByStripeSession(sessionId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Buscar detalhes da sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer']
    });

    return NextResponse.json({
      id: order.id,
      productName: session.metadata?.productName || 'Produto Digital',
      amount: order.amount,
      currency: order.currency,
      customerEmail: session.customer_details?.email || order.customer_email,
      status: order.status,
      downloadUrl: order.status === 'completed' ? `/api/download/${order.id}` : null,
    });

  } catch (error) {
    console.error('Erro ao buscar detalhes do pedido:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
