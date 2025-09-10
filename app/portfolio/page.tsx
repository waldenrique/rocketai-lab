"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const portfolioItems = [
  {
    title: "CV 3D Rocket",
    description: "Gere currículos profissionais com IA em minutos. Plataforma completa para criação e gestão de CVs com tecnologia de ponta.",
    image: "/cv.png",
    url: "https://cv.3d-rocket.pt/",
    technologies: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
    category: "SaaS"
  },
  {
    title: "Post Waldenrique",
    description: "Sistema avançado de postagem e automação para marketing digital. Gestão completa de conteúdo e campanhas.",
    image: "/post.png",
    url: "https://post.waldenrique.com.br/",
    technologies: ["React", "Node.js", "Automação", "APIs"],
    category: "Automação"
  },
  {
    title: "3D Rocket",
    description: "Site institucional moderno para agência de tecnologia e automação. Design inovador e performance otimizada.",
    image: "/3drocket.png",
    url: "https://3d-rocket.pt/",
    technologies: ["Next.js", "Framer Motion", "SEO", "Performance"],
    category: "Website"
  }
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
            <ArrowLeft className="size-4" />
            Voltar ao início
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Nosso <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">Portfólio</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-300">
              Projetos desenvolvidos sob medida com tecnologia de ponta e foco em resultados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:scale-[1.02] transition-all hover:border-slate-700"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      {item.title}
                      <ExternalLink className="size-4 opacity-50 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-3 text-sm text-slate-300 line-clamp-3">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800/60">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Vamos criar algo incrível juntos?</h2>
          <p className="mt-3 text-slate-300">
            Entre em contato e vamos conversar sobre como podemos transformar sua ideia em realidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-2xl">
              <Link href="/#contato">Iniciar projeto</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-white text-black hover:bg-slate-100 hover:text-black border border-slate-200"
            >
              <a href="https://wa.me/351938392404" target="_blank" rel="noopener noreferrer">
                Conversar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}