export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Subsidiary {
  id: string;
  name: string;
  description: string | null;
  icon_name: string;
  color_theme: string;
  display_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}
