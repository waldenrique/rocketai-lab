"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, CheckCircle2, Star, Zap, Target, TrendingUp, Users, Clock, BarChart3, Globe, Globe2, MessageCircle, Award, Rocket, Bot, Sparkles, ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

/**
 * Rocket Lab Marketing — Landing Page
 * Stack: React + Tailwind + shadcn/ui + framer-motion + lucide-react
 * Pronto para Vercel. Use como app/page.tsx ou src/app/page.tsx (Next.js).
 * Idioma: PT-BR
 */

const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Planos", href: "#planos" },
  { label: "Cases", href: "#cases" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const services = [
  {
    icon: <Rocket className="size-6" aria-hidden />,
    title: "Gestão de Redes Sociais",
    desc: "Planejamento, calendário editorial, criação e tráfego pago para crescer com consistência.",
    bullets: ["Identidade visual consistente", "Conteúdo que converte", "Relatórios mensais"],
  },
  {
    icon: <Globe2 className="size-6" aria-hidden />,
    title: "Sites & Sistemas Web",
    desc: "Landing pages, sites institucionais e pequenos sistemas sob medida para o seu negócio.",
    bullets: ["Next.js + SEO", "Performance e acessibilidade", "Integrações e automações"],
  },
  {
    icon: <Bot className="size-6" aria-hidden />,
    title: "Automações Inteligentes",
    desc: "Chatbots, funis, integrações com n8n e automações que escalam o atendimento.",
    bullets: ["Captação 24/7", "Qualificação de leads", "Menos retrabalho"],
  },
];

const plans = [
  {
    name: "Launch",
    price: "€399",
    tagline: "Para começar com o pé direito",
    features: [
      "Gestão de 1 rede social",
      "8 posts/mês + 8 stories",
      "Calendário editorial",
      "Relatório mensal simples",
    ],
    cta: "Quero decolar",
    highlighted: false,
  },
  {
    name: "Orbit",
    price: "€799",
    tagline: "Foco em crescimento consistente",
    features: [
      "Gestão de 2 redes sociais",
      "16 posts/mês + 16 stories",
      "2 campanhas de tráfego",
      "Landing page otimizada",
      "Relatório de performance",
    ],
    cta: "Entrar em órbita",
    highlighted: true,
  },
  {
    name: "Galaxy",
    price: "€1499",
    tagline: "Para escalar com automação",
    features: [
      "Gestão de 3+ redes sociais",
      "Conteúdo multimídia (vídeo/reels)",
      "4 campanhas de tráfego",
      "Automação com chatbot",
      "SEO + Blog (2 posts/mês)",
      "Relatórios avançados",
    ],
    cta: "Dominar a galáxia",
    highlighted: false,
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
      {/* Header com navegação */}
      <header className="border-b border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-white">Rocket Lab</h1>
              <nav className="flex items-center gap-6">
                <a href="#inicio" className="text-slate-300 hover:text-white transition-colors">
                  Início
                </a>
                <a href="#servicos" className="text-slate-300 hover:text-white transition-colors">
                  Serviços
                </a>
                <a href="#cases" className="text-slate-300 hover:text-white transition-colors">
                  Cases
                </a>
                <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
                  Blog
                </Link>
                <a href="#contato" className="text-slate-300 hover:text-white transition-colors">
                  Contato
                </a>
              </nav>
            </div>
            
            <Link 
              href="/login" 
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>
      <StarsBg />

      {/* Header */}
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
              Gestão de redes sociais, criação de sites e automações inteligentes para empresas que querem escalar com
              previsibilidade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-2xl">
                <a href="#planos" className="flex items-center gap-2">
                  Ver planos <ArrowRight className="size-4" />
                </a>
              </Button>
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

      {/* Planos */}
      <section id="planos" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Planos</h2>
            <p className="mt-3 text-slate-300">Escolha o melhor combustível para sua jornada.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`border-slate-800/60 bg-slate-900/40 ${p.highlighted ? "ring-2 ring-indigo-400" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between text-white">
                    <span>{p.name}</span>
                    <span className="text-2xl font-bold">{p.price}</span>
                  </CardTitle>
                  <p className="text-slate-300">{p.tagline}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-5 w-full rounded-2xl">{p.cta}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cases (mock) */}
      <section id="cases" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Resultados</h2>
            <p className="mt-3 text-slate-300">Alguns números de projetos que amamos.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { kpi: "+220%", label: "Alcance em 90 dias" },
              { kpi: "-35%", label: "Custo por lead" },
              { kpi: "3.1x", label: "Retorno sobre investimento" },
            ].map((c) => (
              <Card key={c.label} className="border-slate-800/60 bg-slate-900/40">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-white">{c.kpi}</div>
                  <div className="mt-2 text-slate-300">{c.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog (teaser) */}
      <section id="blog" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Do nosso blog</h2>
            <p className="mt-3 text-slate-300">Conteúdos para levar sua marca mais longe.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Card key={p.title} className="group border-slate-800/60 bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="group-hover:text-white transition-colors text-white">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{p.excerpt}</p>
                  <a href="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">
                    Ler artigo <ArrowRight className="size-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="border-t border-slate-800/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">Vamos conversar</h2>
            <p className="mt-3 text-slate-300">Conte sobre seu desafio e receba um plano de voo personalizado.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6">
                <form
                  action="https://formspree.io/f/xpwjyvnd"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1 block text-sm">Nome</label>
                    <Input
                      name="name"
                      placeholder="Seu nome"
                      className="bg-slate-950 border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
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
                  <div className="flex items-center gap-2"><MapPin className="size-4" /> Portugal • Atendimento remoto</div>
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
