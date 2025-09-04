"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/auth.client';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Tentando login...', { email, password: '***' });

    try {
      const { data, error: signInError } = await auth.signIn(email, password);
      
      console.log('📊 Resultado do signIn:', { data: !!data, error: signInError?.message });
      
      if (signInError) {
        console.error('❌ Erro de signIn:', signInError);
        setError(`Erro de login: ${signInError.message}`);
        setLoading(false);
        return;
      }

      console.log('✅ Login realizado, verificando admin...');
      
      // Verificar se é admin
      const isAdmin = await auth.isAdmin();
      console.log('👑 É admin?', isAdmin);
      
      if (!isAdmin) {
        setError('Acesso negado. Apenas administradores podem acessar.');
        await auth.signOut();
        setLoading(false);
        return;
      }

      console.log('🚀 Redirecionando para admin...');
      // Sucesso - redirecionar para admin seguro
      router.push('/admin/secure');
      
    } catch (error) {
      console.error('❌ Erro no login:', error);
      setError(`Erro interno: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-slate-950 to-slate-950"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar ao início
        </Link>

        <Card className="border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-4">
              <Lock className="size-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Acesso Administrativo
            </CardTitle>
            <p className="text-slate-400">
              Entre com suas credenciais para acessar o painel
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center space-x-2 p-3 bg-red-900/50 border border-red-700 rounded-md"
                >
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-300">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-medium py-3"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Sistema de autenticação seguro via Supabase
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sistema seguro - credenciais não expostas */}
      </motion.div>
    </div>
  );
}
