export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  
  // SEO Fields
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  
  // Content categorization
  category: string;
  tags: string[];
  readingTime: number;
}

export interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}
