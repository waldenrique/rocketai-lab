import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { getProductById, createOrder } from '@/lib/supabase-utils';

export async function POST(request: NextRequest) {
  try {
    const { productId, priceId } = await request.json();

    if (!productId || !priceId) {
      return NextResponse.json(
        { error: 'Product ID e Price ID são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar produto no Supabase
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Criar sessão do Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        productId: productId,
        productName: product.name,
        productType: product.type,
      },
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/produtos`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // Stripe vai pedir o email
    });

    // Criar pedido pendente no Supabase
    await createOrder({
      customer_email: '', // Será preenchido pelo webhook
      product_id: productId,
      stripe_session_id: session.id,
      amount: product.price,
      currency: product.currency,
      status: 'pending',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
