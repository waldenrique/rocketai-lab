"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular verificação de login com melhor segurança
    setTimeout(() => {
      if (credentials.username === 'waldenrique' && credentials.password === 'rocketai85') {
        // Gerar token de autenticação
        const timestamp = Date.now().toString();
        const payload = `${credentials.username}:${timestamp}`;
        const token = btoa(payload);
        
        // Salvar sessão com token
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUser', credentials.username);
        localStorage.setItem('authToken', token);
        localStorage.setItem('loginTime', timestamp);
        
        router.push('/admin');
      } else {
        setError('Usuário ou senha incorretos');
      }
      setLoading(false);
    }, 1000);
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
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Usuário
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value
                      })}
                      className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      placeholder="Digite seu usuário"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                      })}
                      className="pl-10 pr-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-medium py-3"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/60">
              <div className="text-center text-sm text-slate-400">
                <p>Para acessar o painel administrativo,</p>
                <p>utilize suas credenciais fornecidas.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
