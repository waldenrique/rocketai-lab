import { supabaseAdmin } from '../lib/supabase'

const sampleProducts = [
  {
    name: "Guia Completo de Marketing Digital",
    description: "E-book completo com estratégias, templates e cases reais para acelerar seu marketing digital. Inclui checklist de implementação e planilhas de controle.",
    price: 47.00,
    currency: "EUR",
    type: "pdf" as const,
    stripe_product_id: "prod_example_1", // Substitua pelo ID real do Stripe
    stripe_price_id: "price_example_1", // Substitua pelo ID real do Stripe
    thumbnail: "/images/products/ebook-marketing.jpg",
    preview_images: [
      "/images/products/ebook-preview-1.jpg",
      "/images/products/ebook-preview-2.jpg"
    ],
    features: [
      "120 páginas de conteúdo estratégico",
      "15 templates prontos para usar",
      "5 planilhas de controle",
      "Checklist de implementação",
      "Cases reais de clientes",
      "Suporte por 30 dias"
    ],
    download_limit: 5,
    access_duration_days: 365,
    active: true
  },
  {
    name: "Planilha de Planejamento de Conteúdo",
    description: "Planilha completa para planejar seu conteúdo para redes sociais com calendário editorial, banco de ideias e métricas de performance.",
    price: 27.00,
    currency: "EUR",
    type: "spreadsheet" as const,
    stripe_product_id: "prod_example_2",
    stripe_price_id: "price_example_2",
    thumbnail: "/images/products/planilha-conteudo.jpg",
    features: [
      "Calendário editorial anual",
      "Banco de 500+ ideias de posts",
      "Calculadora de ROI",
      "Templates de legendas",
      "Métricas automáticas",
      "Vídeo tutorial incluso"
    ],
    download_limit: 3,
    access_duration_days: null,
    active: true
  },
  {
    name: "Configurações de Automação n8n",
    description: "Arquivo JSON com workflows prontos para automação de marketing, vendas e atendimento usando n8n. Economize semanas de configuração.",
    price: 67.00,
    currency: "EUR",
    type: "json" as const,
    stripe_product_id: "prod_example_3",
    stripe_price_id: "price_example_3",
    thumbnail: "/images/products/n8n-workflows.jpg",
    features: [
      "10 workflows prontos",
      "Automação de email marketing",
      "Integração WhatsApp + CRM",
      "Lead scoring automático",
      "Relatórios automatizados",
      "Documentação completa",
      "Suporte para instalação"
    ],
    download_limit: 2,
    access_duration_days: 180,
    active: true
  },
  {
    name: "Curso: Vendas Digitais Avançadas",
    description: "Acesso exclusivo a 20 aulas práticas sobre técnicas avançadas de vendas digitais, funis de conversão e automação de vendas.",
    price: 197.00,
    currency: "EUR",
    type: "video_access" as const,
    stripe_product_id: "prod_example_4",
    stripe_price_id: "price_example_4",
    thumbnail: "/images/products/curso-vendas.jpg",
    features: [
      "20 aulas em alta qualidade",
      "4 horas de conteúdo prático",
      "Templates de funil de vendas",
      "Scripts de e-mail prontos",
      "Grupo VIP no WhatsApp",
      "Certificado de conclusão",
      "Acesso vitalício"
    ],
    access_duration_days: null, // Acesso vitalício
    active: true
  },
  {
    name: "Kit Completo - Agência Digital",
    description: "Pacote completo com todos os nossos produtos digitais: e-books, planilhas, workflows e acesso ao curso. Tudo que você precisa para escalar sua agência.",
    price: 297.00,
    currency: "EUR",
    type: "bundle" as const,
    stripe_product_id: "prod_example_bundle",
    stripe_price_id: "price_example_bundle",
    thumbnail: "/images/products/kit-completo.jpg",
    features: [
      "Todos os 4 produtos inclusos",
      "Economia de mais de 40%",
      "Bônus: Consultoria de 1h",
      "Grupo VIP exclusivo",
      "Atualizações gratuitas por 1 ano",
      "Suporte prioritário",
      "Acesso vitalício ao curso"
    ],
    access_duration_days: null,
    active: true
  }
]

export async function insertSampleProducts() {
  try {
    console.log('🚀 Inserindo produtos de exemplo...')
    
    for (const product of sampleProducts) {
      console.log(`📦 Inserindo: ${product.name}`)
      
      const { data, error } = await supabaseAdmin
        .from('products')
        .insert(product)
        .select()
        .single()
      
      if (error) {
        console.error(`❌ Erro ao inserir produto ${product.name}:`, error)
      } else {
        console.log(`✅ Produto inserido: ${product.name} (ID: ${data.id})`)
      }
    }
    
    console.log('🎉 Produtos de exemplo inseridos com sucesso!')
    return { success: true, insertedCount: sampleProducts.length }
    
  } catch (error) {
    console.error('❌ Erro ao inserir produtos:', error)
    return { success: false, error }
  }
}

// Script para executar a inserção
if (require.main === module) {
  insertSampleProducts()
    .then((result) => {
      if (result.success) {
        console.log(`✅ ${result.insertedCount} produtos inseridos com sucesso!`)
      } else {
        console.error('❌ Falha ao inserir produtos:', result.error)
      }
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error('❌ Erro inesperado:', error)
      process.exit(1)
    })
}
