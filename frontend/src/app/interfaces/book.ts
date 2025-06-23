export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  created_at: string;  
  genre: string;
  cover_url?: string;
  description?: string;
}