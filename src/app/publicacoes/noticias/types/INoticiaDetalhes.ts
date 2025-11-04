export interface INoticiaDetalhe {
  id: number;
  title: string;
  slug: string;
  permalink: string;
  date: string;
  modified: string;
  author: {
    id: number;
    name: string;
  };
  excerpt: string;
  content: string;
  featured: {
    url: string;
    alt: string;
  };
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  comment_count: number;
}