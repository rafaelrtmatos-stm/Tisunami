export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'cervejas' | 'destilados' | 'sem-alcool' | 'petiscos' | 'gelo-carvao';
  imagePlaceholderColor: string; // Dynamic rich premium gradients to represent drinks
  imageEmoji: string; // High quality visuals/emoji icons
  imageUrl?: string; // High-quality image URL from Unsplash
  volume?: string;
  badge?: string;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageEmoji: string;
  imageUrl?: string; // High-quality image URL from Unsplash
  badge: string;
  price: number;
  originalPrice: number;
  gradient: string;
}

export interface CheckoutDetails {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
  changeFor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  details: CheckoutDetails;
  status: 'preparando' | 'saiu_para_entrega' | 'entregue';
  createdAt: string;
}
