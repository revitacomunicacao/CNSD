export interface IDestaque {
  category: {
    id: number;
    name: string;
    slug: string;
  };
  post: {
    id: number;
    title: string;
    slug:string;
    featured: {
      url: string;
      alt: string;
    }
    date: string;
    time: string;
    datetime: string;
  }
  
}

