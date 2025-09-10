"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, CheckCircle2, Star, Zap, Target, TrendingUp, Users, Clock, BarChart3, Globe, Globe2, MessageCircle, Award, Rocket, Bot, Sparkles, ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { pushToDataLayer } from '../utils/gtm';

/**
 * Rocket Lab Marketing — Landing Page
 * Stack: React + Tailwind + shadcn/ui + framer-motion + lucide-react
 * Pronto para Vercel. Use como app/page.tsx ou src/app/page.tsx (Next.js).
 * Idioma: PT-PT (Português de Portugal)
 * Versão em inglês disponível em breve
 * Técnicas de SEO aplicadas para pesquisas e indexação por robôs do Google
 */

const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Cases", href: "#cases" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    icon: <Bot className="size-6" aria-hidden />,
    title: "Automações Inteligentes com n8n",
    desc: "Automatize tarefas, integrações e fluxos de trabalho para ganhar eficiência e escalar seu negócio.",
    bullets: [
      "Robôs e fluxos personalizados",
      "Integração entre sistemas e APIs",
      "Redução de retrabalho e erros",
    ],
  },
  {
    icon: <Globe2 className="size-6" aria-hidden />,
    title: "Sistemas Web & SaaS",
    desc: "Desenvolvimento de sistemas web, SaaS e softwares sob medida para empresas inovadoras.",
    bullets: [
      "Soluções personalizadas",
      "Painéis, dashboards e automação",
      "Escalabilidade e segurança",
    ],
  },
  {
    icon: <Rocket className="size-6" aria-hidden />,
    title: "Consultoria e Integrações",
    desc: "Ajudamos a conectar ferramentas, criar automações e transformar processos digitais.",
    bullets: [
      "Mapeamento de processos",
      "Consultoria em automação",
      "Integração de plataformas",
    ],
  },
];

const posts = [
  {
    title: "Por que sua empresa precisa de presença digital em 2025",
    excerpt:
      "Descubra como uma presença bem estruturada multiplica a autoridade da sua marca e impacta diretamente no faturamento.",
  },
  {
    title: "Automação: o futuro do atendimento ao cliente",
    excerpt:
      "Chatbots, fluxos e integrações que reduzem custos e aumentam a satisfação — sem perder o tom humano.",
  },
  {
    title: "Pequenas empresas, grandes resultados online",
    excerpt:
      "Como marcas locais estão usando conteúdo e tráfego pago para conquistar mercado.",
  },
];

export default function RocketLabLanding() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <StarsBg />
      {/* Header principal fixo */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 shadow-lg">
              <Rocket className="size-5" />
            </span>
            <span className="font-semibold tracking-tight">Rocket Lab Marketing</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-slate-300 hover:text-white">
                {n.label}
              </a>
            ))}
            <Button asChild className="rounded-2xl">
              <a href="#contato">Fale com a gente</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
              <Sparkles className="size-3" /> Pronto para impulsionar sua marca
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Impulsionamos sua marca ao <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">espaço digital</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-300">
              Especialistas em automações inteligentes com n8n, criação de sistemas web, SaaS e softwares personalizados para empresas que querem escalar com tecnologia. Atendemos Portugal, Porto, Braga e Vila Nova de Famalicão.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-slate-700">
                <a href="#cases" className="flex items-center gap-2 text-black">
                  Ver cases <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <ul className="mt-6 grid max-w-xl grid-cols-2 gap-3 text-sm text-slate-300">
              {[
                "Estratégia + execução",
                "Relatórios claros",
                "Conteúdo que vende",
                "Atendimento próximo",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400" /> {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroCard />
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="relative border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Serviços</h2>
            <p className="mt-3 text-slate-300">Tudo o que você precisa para sair do chão e crescer.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="border-slate-800/60 bg-slate-900/40">
                <CardHeader>
                  <div className="mb-2 inline-flex rounded-2xl border border-slate-700 bg-slate-800/60 p-2">{s.icon}</div>
                  <CardTitle className="text-white">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300">
                  <p>{s.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4" /> {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section id="processo" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Como trabalhamos</h2>
            <p className="mt-3 text-slate-300">Processo claro, previsível e colaborativo.</p>
          </div>
          <ol className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Imersão", desc: "Entendimento do negócio, público e objetivos." },
              { step: "2", title: "Plano", desc: "Estratégia de conteúdo, funis e canais." },
              { step: "3", title: "Execução", desc: "Produção e publicação com calendário." },
              { step: "4", title: "Otimização", desc: "Acompanhamento e ajustes guiados por dados." },
            ].map((p) => (
              <li key={p.step} className="relative">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60 font-semibold">
                  {p.step}
                </div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Portfólio</h2>
            <p className="mt-3 text-slate-300">Alguns projetos desenvolvidos sob medida.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <a href="https://cv.3d-rocket.pt/" target="_blank" rel="noopener" className="block rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:scale-[1.02] transition">
              <img src="/cv.png" alt="CV 3D Rocket" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">CV 3D Rocket</h3>
                <p className="mt-2 text-sm text-slate-300">Gere currículos com IA em minutos.</p>
              </div>
            </a>
            <a href="https://post.waldenrique.com.br/" target="_blank" rel="noopener" className="block rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:scale-[1.02] transition">
              <img src="/post.png" alt="Post Waldenrique" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">Post Waldenrique</h3>
                <p className="mt-2 text-sm text-slate-300">Sistema de postagem e automação para marketing digital.</p>
              </div>
            </a>
            <a href="https://3d-rocket.pt/" target="_blank" rel="noopener" className="block rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:scale-[1.02] transition">
              <img src="/3drocket.png" alt="3D Rocket" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">3D Rocket</h3>
                <p className="mt-2 text-sm text-slate-300">Site institucional para agência de tecnologia e automação.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Contato</h2>
            <p className="mt-3 text-slate-300">Vamos conversar sobre como podemos ajudar sua empresa a crescer.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardContent>
                <form className="grid gap-4" onSubmit={e => {
                  pushToDataLayer('form_submit', {
                    categoria: 'Contato',
                    rotulo: 'Formulário Landing',
                  });
                }}>
                  <div>
                    <label className="mb-1 block text-sm">Nome</label>
                    <Input
                      name="name"
                      placeholder="Seu nome completo"
                      className="bg-slate-950 border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Mensagem</label>
                    <Textarea
                      name="message"
                      placeholder="Fale um pouco do seu projeto"
                      className="bg-slate-950 border-slate-800 min-h-28"
                      required
                    />
                  </div>
                  <Button type="submit" className="rounded-2xl">Enviar mensagem</Button>
                  {/* Exemplo: Adicione pushToDataLayer em botões importantes */}
                  {/*
                  <Button onClick={() => pushToDataLayer('whatsapp_click', {
                    categoria: 'Contato',
                    rotulo: 'Botão WhatsApp',
                  })}>WhatsApp</Button>
                  */}
                </form>
              </CardContent>
            </Card>

            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="flex flex-col justify-center gap-5 p-6 text-slate-300">
                <p>
                  Preferimos um papo direto e transparente. Chame a gente no canal que preferir e vamos acelerar seu
                  projeto.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2"><Mail className="size-4" /> waldenriquept@gmail.com</div>
                  <div className="flex items-center gap-2"><Phone className="size-4" /> +351 938 392 404</div>
                  <div className="flex items-center gap-2"><MapPin className="size-4" /> Portugal • Porto • Braga • Vila Nova de Famalicão • Atendimento remoto</div>
                </div>
                <div className="mt-2 flex gap-3">
                  <a href="#" aria-label="Instagram" className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 hover:bg-slate-800">
                    <Instagram className="size-5" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 hover:bg-slate-800">
                    <Linkedin className="size-5" />
                  </a>
                  <a href="#" aria-label="Facebook" className="rounded-xl border border-slate-700 bg-slate-800/60 p-2 hover:bg-slate-800">
                    <Facebook className="size-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog (teaser) */}
      <section id="blog" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Do nosso blog</h2>
            <p className="mt-3 text-slate-300">Dicas, novidades e insights para impulsionar seu negócio.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <div key={post.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
                <Button asChild className="mt-4 rounded-2xl">
                  <a href="#" className="text-sm">
                    Ler mais
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400">
              <Rocket className="size-4" />
            </span>
            <span className="text-sm text-slate-300">© {new Date().getFullYear()} Rocket Lab Marketing</span>
          </div>
          <div className="text-sm text-slate-400">Feito com ❤ em Portugal</div>
        </div>
      </footer>
    {/* Botão WhatsApp fixo */}
    <a
      href="https://wa.me/351938392404"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all"
      onClick={() => pushToDataLayer('whatsapp_click', {
        categoria: 'Contato',
        rotulo: 'Botão WhatsApp',
        valor: 1
      })}
      aria-label="Falar no WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 2.042.613 3.938 1.664 5.537L2 22l4.634-1.527A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.798 0-3.49-.527-4.91-1.432l-.35-.217-2.75.906.916-2.68-.228-.353C4.527 15.49 4 13.798 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-5.845c-.242-.121-1.434-.707-1.655-.788-.221-.081-.382-.121-.543.121-.161.242-.622.788-.762.95-.141.161-.282.181-.523.06-.242-.121-1.022-.377-1.947-1.201-.72-.642-1.207-1.433-1.35-1.675-.141-.242-.015-.373.106-.494.109-.108.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.302-.02-.423-.06-.121-.543-1.312-.744-1.797-.196-.471-.396-.406-.543-.414-.141-.007-.302-.009-.463-.009-.161 0-.423.06-.645.302-.221.242-.845.827-.845 2.017 0 1.19.865 2.341.985 2.504.121.161 1.701 2.6 4.127 3.537.577.198 1.027.316 1.378.404.578.147 1.104.126 1.52.077.464-.055 1.434-.586 1.637-1.152.202-.566.202-1.051.141-1.152-.06-.101-.221-.161-.463-.282z"/>
      </svg>
      WhatsApp
    </a>
  </div>
  );
}

function HeroCard() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-900/60 p-6 shadow-2xl">
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-gradient-to-br from-amber-400/20 to-fuchsia-500/20 blur-3xl" />

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60 p-2">
          <Zap className="size-5" />
        </div>
        <div className="text-sm text-slate-300">Plano de voo personalizado</div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800/60 bg-slate-950 p-4">
        <div className="text-sm text-slate-400">Próximos 30 dias</div>
        <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
          <Metric label="Posts publicados" value="32" trend="↑ 18%" />
          <Metric label="Leads gerados" value="124" trend="↑ 27%" />
          <Metric label="CTR médio" value="3,8%" trend="↑ 9%" />
          <Metric label="CPL" value="€ 4,10" trend="↓ 12%" />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-800/60 bg-slate-950 p-4">
        <div className="mb-2 text-sm text-slate-400">Canais</div>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "Facebook", "LinkedIn", "Google Ads", "WhatsApp Bot"].map((c) => (
            <span
              key={c}
              className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      <div className="text-xs text-emerald-400">{trend}</div>
    </div>
  );
}

function StarsBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <svg className="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#0b1220" />
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
      {/* Noise stars */}
      <div className="size-full bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
    </div>
  );
}
