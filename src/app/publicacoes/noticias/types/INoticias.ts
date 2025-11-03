export interface INoticias {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }
}