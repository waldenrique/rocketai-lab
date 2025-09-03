import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validar credenciais
    if (username === config.admin.username && password === config.admin.password) {
      // Gerar token de autenticação
      const timestamp = Date.now().toString();
      const payload = `${username}:${timestamp}`;
      const token = btoa(payload);

      return NextResponse.json({
        success: true,
        token,
        loginTime: timestamp,
        expiresIn: config.session.durationHours * 60 * 60 * 1000, // em ms
      });
    } else {
      return NextResponse.json(
        { error: 'Usuário ou senha incorretos' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
