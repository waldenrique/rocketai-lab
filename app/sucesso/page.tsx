"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderDetails {
  id: string;
  productName: string;
  amount: number;
  currency: string;
  customerEmail: string;
  downloadUrl?: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails(sessionId);
    } else {
      setError('ID da sessão não encontrado');
      setLoading(false);
    }
  }, [sessionId]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/orders/${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      } else {
        setError('Pedido não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do pedido:', error);
      setError('Erro ao carregar informações do pedido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
          <p className="mt-4 text-slate-300">Processando seu pedido...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
          <Link href="/produtos">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <ArrowLeft className="size-4 mr-2" />
              Voltar aos produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-emerald-500/20 p-6 rounded-full">
              <CheckCircle className="size-16 text-emerald-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Pagamento Realizado com Sucesso! 🎉
          </h1>
          
          <p className="text-xl text-slate-300 mb-8">
            Obrigado pela sua compra! Seu produto digital está pronto para download.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <Card className="border-slate-800/60 bg-slate-900/40 max-w-2xl mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="size-5" />
                  Detalhes do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Produto</p>
                    <p className="text-white font-semibold">{orderDetails.productName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Valor Pago</p>
                    <p className="text-white font-semibold">
                      {orderDetails.currency.toUpperCase()} {orderDetails.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-400 text-sm">Email de Confirmação</p>
                    <p className="text-white font-semibold">{orderDetails.customerEmail}</p>
                  </div>
                </div>

                {/* Download Button */}
                {orderDetails.downloadUrl && (
                  <div className="pt-4 border-t border-slate-800/60">
                    <Button 
                      asChild
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
                    >
                      <a href={orderDetails.downloadUrl} download>
                        <Download className="size-4 mr-2" />
                        Fazer Download
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Próximos Passos:
            </h3>
            <ul className="text-left space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Verifique seu email para a confirmação do pedido
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                {orderDetails?.downloadUrl 
                  ? "Faça o download do seu produto usando o botão acima"
                  : "O link de download será enviado por email em breve"
                }
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="size-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                Entre em contato conosco se tiver alguma dúvida
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos">
              <Button 
                variant="outline" 
                className="border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Ver Mais Produtos
              </Button>
            </Link>
            
            <Link href="/#contato">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Precisa de Ajuda?
              </Button>
            </Link>
            
            <Link href="/">
              <Button 
                variant="outline" 
                className="border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <ArrowLeft className="size-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
