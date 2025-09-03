"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPost } from '@/lib/blog.types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-slate-300">Carregando posts...</p>
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
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6"
          >
            ← Voltar ao início
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Blog da Rocket Lab
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
              Insights, dicas e estratégias para impulsionar sua presença digital
            </p>
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Nenhum post publicado ainda
              </h2>
              <p className="text-slate-300 mb-8">
                Em breve você encontrará conteúdos incríveis aqui!
              </p>
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Criar primeiro post <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 overflow-hidden">
                      {post.image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {post.readingTime} min
                          </div>
                        </div>
                        
                        <CardTitle className="text-white group-hover:text-indigo-300 transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-slate-300 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="size-4 text-slate-400" />
                            <span className="text-sm text-slate-400">
                              {post.category}
                            </span>
                          </div>
                          
                          <div className="text-indigo-300 group-hover:text-indigo-200 transition-colors">
                            <ArrowRight className="size-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
            Quer impulsionar sua marca?
          </h2>
          <p className="text-slate-300 mb-8">
            Entre em contato conosco e descubra como podemos acelerar seu crescimento digital.
          </p>
          <Link 
            href="/#contato" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white rounded-2xl hover:from-indigo-600 hover:to-fuchsia-600 transition-all duration-300"
          >
            Falar com especialista <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
