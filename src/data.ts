import { Product, Promotion } from './types';

export const CATEGORIES = [
  { id: 'todas', label: 'Todas', emoji: '✨' },
  { id: 'cervejas', label: 'Cervejas', emoji: '🍺' },
  { id: 'destilados', label: 'Destilados', emoji: '🥃' },
  { id: 'sem-alcool', label: 'Sem Álcool', emoji: '🥤' },
  { id: 'petiscos', label: 'Petiscos', emoji: '🥜' },
  { id: 'gelo-carvao', label: 'Gelo & Carvão', emoji: '🧊' }
] as const;

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-gin',
    title: 'Combo Gin Tsunami',
    description: '1 Gin Tanqueray (750ml) + 4 Águas Tônicas (350ml) + Saco de Gelo Cubo 5kg.',
    imageEmoji: '🍸',
    imageUrl: 'https://images.unsplash.com/photo-1524156868115-e696b44a833f?auto=format&fit=crop&w=600&q=80',
    badge: 'CAMPEÃO DE VENDAS 🔥',
    price: 139.90,
    originalPrice: 165.70,
    gradient: 'from-blue-600 via-indigo-900 to-slate-900'
  },
  {
    id: 'promo-heineken',
    title: 'Pack Heineken Trincando',
    description: '12 Long Necks Heineken (330ml) geladas no ponto para o seu churrasco.',
    imageEmoji: '🍻',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
    badge: 'SUPER DESCONTO ⚡',
    price: 84.90,
    originalPrice: 95.88,
    gradient: 'from-emerald-700 via-teal-900 to-slate-900'
  },
  {
    id: 'promo-churras',
    title: 'Kit Salva Churrasco',
    description: '1 Saco de Gelo 5kg + 1 Saco de Carvão Premium 3kg + 2 Batatas Pringles.',
    imageEmoji: '🔥',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    badge: 'ESSENCIAL DO FDS 🚀',
    price: 49.90,
    originalPrice: 58.60,
    gradient: 'from-rose-700 via-amber-950 to-slate-900'
  }
];

export const PRODUCTS: Product[] = [
  // Cervejas
  {
    id: 'beer-heineken',
    name: 'Heineken Long Neck',
    description: 'Cerveja premium lager importada. Sabor marcante e refrescante.',
    price: 7.99,
    category: 'cervejas',
    imagePlaceholderColor: 'from-emerald-600 to-teal-800',
    imageEmoji: '🟢',
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
    volume: '330ml',
    rating: 4.9,
    badge: 'Gelada'
  },
  {
    id: 'beer-stella',
    name: 'Stella Artois Long Neck',
    description: 'Cerveja premium lager belga de amargor suave e aroma floral.',
    price: 6.49,
    category: 'cervejas',
    imagePlaceholderColor: 'from-amber-600 to-yellow-800',
    imageEmoji: '⚪',
    imageUrl: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=600&q=80',
    volume: '275ml',
    rating: 4.8,
    badge: 'Gelada'
  },
  {
    id: 'beer-corona',
    name: 'Corona Extra Garrafa',
    description: 'A clássica cerveja mexicana com toque de limão (opcional). Ultra leve.',
    price: 8.29,
    originalPrice: 8.99,
    category: 'cervejas',
    imagePlaceholderColor: 'from-sky-500 to-blue-700',
    imageEmoji: '🟡',
    imageUrl: 'https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?auto=format&fit=crop&w=600&q=80',
    volume: '355ml',
    rating: 4.7
  },
  {
    id: 'beer-brahma',
    name: 'Brahma Duplo Malte Lata',
    description: 'Puro malte com o sabor e tradição da Brahma. Muito cremosa.',
    price: 4.39,
    category: 'cervejas',
    imagePlaceholderColor: 'from-red-600 to-orange-800',
    imageEmoji: '🔴',
    imageUrl: 'https://images.unsplash.com/photo-1618885472911-2e7ec844a42c?auto=format&fit=crop&w=600&q=80',
    volume: '350ml',
    rating: 4.6,
    badge: 'Campeã'
  },

  // Destilados
  {
    id: 'dist-tanqueray',
    name: 'Gin Tanqueray London Dry',
    description: 'Um dos gins mais premiados do mundo. Destilação quadruplicada.',
    price: 119.90,
    originalPrice: 139.90,
    category: 'destilados',
    imagePlaceholderColor: 'from-emerald-800 to-stone-900',
    imageEmoji: '🧪',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    volume: '750ml',
    rating: 4.9,
    badge: 'Destaque'
  },
  {
    id: 'dist-absolut',
    name: 'Vodka Absolut Regular',
    description: 'Vodka sueca premium elaborada exclusivamente com ingredientes naturais.',
    price: 89.90,
    category: 'destilados',
    imagePlaceholderColor: 'from-blue-800 to-indigo-950',
    imageEmoji: '🍶',
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
    volume: '1L',
    rating: 4.8
  },
  {
    id: 'dist-redlabel',
    name: 'Whisky Red Label Johnnie Walker',
    description: 'Sabor defumado e vibrante, ideal para drinks refinados ou on-the-rocks.',
    price: 94.90,
    originalPrice: 99.90,
    category: 'destilados',
    imagePlaceholderColor: 'from-amber-800 to-red-950',
    imageEmoji: '🥃',
    imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
    volume: '1L',
    rating: 4.8,
    badge: 'Popular'
  },
  {
    id: 'dist-amarula',
    name: 'Licor Amarula Cream',
    description: 'Licor cremoso importado da África do Sul, derivado da fruta marula.',
    price: 109.90,
    category: 'destilados',
    imagePlaceholderColor: 'from-yellow-700 to-amber-950',
    imageEmoji: '🐘',
    imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&w=600&q=80',
    volume: '750ml',
    rating: 4.9
  },

  // Sem Álcool
  {
    id: 'soft-coca',
    name: 'Coca-Cola Original Lata',
    description: 'O sabor inconfundível da Coca-Cola super gelada.',
    price: 4.50,
    category: 'sem-alcool',
    imagePlaceholderColor: 'from-red-700 to-neutral-900',
    imageEmoji: '🥤',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    volume: '350ml',
    rating: 4.9,
    badge: 'Gelada'
  },
  {
    id: 'soft-redbull',
    name: 'Red Bull Energy Drink',
    description: 'Te dá asas. O energético mais vendido do planeta.',
    price: 8.99,
    category: 'sem-alcool',
    imagePlaceholderColor: 'from-blue-600 to-amber-700',
    imageEmoji: '⚡',
    imageUrl: 'https://images.unsplash.com/photo-1622543953490-0b7003954f24?auto=format&fit=crop&w=600&q=80',
    volume: '250ml',
    rating: 4.8
  },
  {
    id: 'soft-tonica',
    name: 'Água Tônica Antarctica Lata',
    description: 'Ideal para fazer bonito no seu gin tônica ou beber bem gelado.',
    price: 3.90,
    category: 'sem-alcool',
    imagePlaceholderColor: 'from-yellow-500 to-emerald-800',
    imageEmoji: '🥤',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    volume: '350ml',
    rating: 4.5
  },
  {
    id: 'soft-suco',
    name: 'Suco de Uva Integral Aurora',
    description: 'Suco 100% natural, sem adição de açúcares, vindo direto da serra gaúcha.',
    price: 14.90,
    category: 'sem-alcool',
    imagePlaceholderColor: 'from-purple-800 to-violet-950',
    imageEmoji: '🍇',
    imageUrl: 'https://images.unsplash.com/photo-1534432128713-3330e797e597?auto=format&fit=crop&w=600&q=80',
    volume: '1L',
    rating: 4.7
  },

  // Petiscos
  {
    id: 'snack-doritos',
    name: 'Salgadinho Doritos Queijo Nacho',
    description: 'Tortilha crocante de milho com o clássico queijo nacho.',
    price: 11.90,
    category: 'petiscos',
    imagePlaceholderColor: 'from-orange-600 to-red-800',
    imageEmoji: '📐',
    imageUrl: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?auto=format&fit=crop&w=600&q=80',
    volume: '140g',
    rating: 4.8,
    badge: 'Churrasco'
  },
  {
    id: 'snack-pringles',
    name: 'Batata Pringles Original',
    description: 'A icônica batata de batata empilhada sabor original.',
    price: 12.90,
    category: 'petiscos',
    imagePlaceholderColor: 'from-red-500 to-red-700',
    imageEmoji: '🍟',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    volume: '114g',
    rating: 4.7
  },
  {
    id: 'snack-amendoim',
    name: 'Amendoim Japonês Pettiz',
    description: 'Amendoim crocante super salgadinho e saboroso de verdade.',
    price: 5.90,
    category: 'petiscos',
    imagePlaceholderColor: 'from-yellow-600 to-orange-700',
    imageEmoji: '🥜',
    imageUrl: 'https://images.unsplash.com/photo-1524316887556-9ba820dbd1ee?auto=format&fit=crop&w=600&q=80',
    volume: '120g',
    rating: 4.6
  },

  // Gelo & Carvão
  {
    id: 'ice-gelo',
    name: 'Saco de Gelo Moído em Cubo',
    description: 'Gelo fabricado com água filtrada especial de alta durabilidade.',
    price: 14.90,
    category: 'gelo-carvao',
    imagePlaceholderColor: 'from-cyan-400 to-sky-700',
    imageEmoji: '🧊',
    imageUrl: 'https://images.unsplash.com/photo-1551782450-405373877af7?auto=format&fit=crop&w=600&q=80',
    volume: '5kg',
    rating: 4.9,
    badge: 'Urgente'
  },
  {
    id: 'coal-carvao',
    name: 'Carvão Vegetal Premium Brasa',
    description: 'Rendimento excelente, brasa forte e duradoura para o churrasco.',
    price: 17.90,
    category: 'gelo-carvao',
    imagePlaceholderColor: 'from-neutral-700 to-stone-900',
    imageEmoji: '🪵',
    imageUrl: 'https://images.unsplash.com/photo-1535443274268-542139a04fdf?auto=format&fit=crop&w=600&q=80',
    volume: '3kg',
    rating: 4.8
  }
];
