import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/supabase-utils';

export async function GET() {
  try {
    const products = await getAllProducts(true); // Apenas produtos ativos
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
