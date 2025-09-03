/**
 * PRODUCTS E-COMMERCE PAGE
 * Status: ⚠️ ESTRUTURA PRONTA - AGUARDANDO FASE 2 (Stripe)
 * 
 * Implementado:
 * - Interface de produtos
 * - Cards responsivos
 * - Botões de compra (visual)
 * 
 * Pendente:
 * - Configuração Stripe
 * - Integração de pagamentos
 * - Sistema de checkout
 * 
 * URL: http://localhost:3000/produtos
 * Próxima fase: Configurar credenciais Stripe
 */

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Download, 
  Star, 
  Check, 
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  Code,
  Play,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from '@/lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];

const getProductIcon = (type: Product['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText className="size-6" />;
    case 'spreadsheet':
      return <FileSpreadsheet className="size-6" />;
    case 'json':
      return <Code className="size-6" />;
    case 'video_access':
      return <Play className="size-6" />;
    case 'bundle':
      return <Package className="size-6" />;
    default:
      return <Download className="size-6" />;
  }
};

const getProductTypeLabel = (type: Product['type']) => {
  switch (type) {
    case 'pdf':
      return 'PDF Digital';
    case 'spreadsheet':
      return 'Planilha';
    case 'json':
      return 'Arquivo JSON';
    case 'video_access':
      return 'Acesso a Vídeos';
    case 'bundle':
      return 'Pacote Completo';
    default:
      return 'Produto Digital';
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (product: Product) => {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          priceId: product.stripe_price_id,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-slate-300">Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-all"
            >
              <ArrowLeft className="size-4" />
              Voltar ao início
            </Link>
            
            <Link 
              href="/login" 
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Produtos Digitais
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
              Ferramentas, templates e recursos para acelerar seu crescimento digital
            </p>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="size-16 text-slate-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-white mb-4">
                Nenhum produto disponível
              </h2>
              <p className="text-slate-300 mb-8">
                Em breve teremos produtos incríveis aqui!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {/* Product Image */}
                    {product.thumbnail && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      {/* Product Type Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                          {getProductIcon(product.type)}
                          {getProductTypeLabel(product.type)}
                        </div>
                      </div>
                      
                      <CardTitle className="text-white group-hover:text-indigo-300 transition-colors">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-slate-300 mb-4 flex-1">
                        {product.description}
                      </p>
                      
                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-200 mb-2">
                            O que você vai receber:
                          </h4>
                          <ul className="space-y-1">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                <Check className="size-4 text-emerald-400 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                            {product.features.length > 3 && (
                              <li className="text-sm text-slate-400">
                                + {product.features.length - 3} outros recursos
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {/* Price and Purchase */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-3xl font-bold text-white">
                              €{product.price}
                            </span>
                            {product.access_duration_days && (
                              <p className="text-sm text-slate-400">
                                Acesso por {product.access_duration_days} dias
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => handlePurchase(product)}
                          className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        >
                          <ShoppingCart className="size-4 mr-2" />
                          Comprar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de algo personalizado?
          </h2>
          <p className="text-slate-300 mb-8">
            Entre em contato conosco para soluções sob medida para seu negócio.
          </p>
          <Link 
            href="/#contato" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/60 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-all duration-300"
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </div>
  );
}
