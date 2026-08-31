export type CategoryType = 'kucukbas' | 'buyukbas' | 'yemek';

export type SacrificeType =
  | 'keci'
  | 'koyun'
  | 'koc'
  | 'buyukbas'
  | 'buyukbas-hisse'
  | 'yemek';

export type NiyetType = 'Adak' | 'Akika' | 'Şükür' | 'Sadaka';

export type DeliveryOption = 'kendim' | 'ihtiyac-sahipleri';

export type LocationType = 'yurt-ici' | 'yurt-disi';

export interface CountryPrice {
  country: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  type: SacrificeType;
  typeLabel: string;
  category: CategoryType;
  location: LocationType;
  locationLabel: string;
  countries: CountryPrice[];
  description: string;
  shortDescription: string;
  stock: number;
  slaughterDate: string;
  videoAvailable: boolean;
  featured: boolean;
  image?: string;
  weight?: string;
  shareCount?: number;
  tags: string[];
}

export interface CartItemProxyInfo {
  name: string;
  phone: string;
  purpose: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  proxy: CartItemProxyInfo;
  wantsVideo: boolean;
  delivery: DeliveryOption;
  country: string;
  niyet: string;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  billingName: string;
  billingAddress?: string;
  taxNumber?: string;
  paymentMethod: 'credit-card' | 'bank-transfer' | 'eft';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardHolder?: string;
  acceptTerms: boolean;
  acceptKvkk: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Order {
  id: string;
  status: 'beklemede' | 'onaylandi' | 'kesim-surecinde' | 'tamamlandi' | 'iptal';
  statusLabel: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  slaughterDate: string;
  videoUrl?: string;
  trackingCode: string;
}
