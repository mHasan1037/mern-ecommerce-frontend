export interface ChatAction {
  type: "open_auth_form";
  form: AuthFormType;
  retryIntent?: string;
  retryArgs?: any;
}

export interface OrderItemData {
  name: string,
  price: number | null;
  image?: string | null;
  quantity: number;
}

export interface OrderCard{
  type: "order";
  status: string;
  total: number;
  placedAt: string;
  items: OrderItemData[];
}

export interface ProductCardItem {
  name: string;
  price: number;
  image?: string | null;
  link?: string;
}

export interface ProductListCard {
  type: "product_list";
  products: ProductCardItem[];
}

export interface ComparisonProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string | null;
  stock: number;
  inStock: boolean;
  rating: number;
  totalReviews: number;
  image?: string | null;
  link?: string;
}

export interface ComparisonCard{
  type: "comparison";
  products: ComparisonProduct[];
}

export type ChatCard = OrderCard | ProductListCard | ComparisonCard;

export interface ChatMessage{
    id: string;
    role: "user" | "assistant";
    content: string;
    link?: string;
    action?: ChatAction;
    card?: ChatCard;
}

export interface StagedProduct {
  id: string;
  name: string;
  image?: string | null;
}

export interface ComparisonStaging {
  first: StagedProduct | null;
  second: StagedProduct | null;
}

export interface chatState {
    messages: ChatMessage[]
    loading: boolean,
    error: string | null;
    comparisonStaging: ComparisonStaging;
}

export interface ChatResponse {
  message?: string;
  link?: string;
  action?: ChatAction;
  card?: ChatCard;
}

export interface PendingRetry {
  intent: string;
  args: any;
}

export type AuthFormType = null | "login" | "signup" | "verifyEmail" | "resetPasswordLink";

export interface UIState {
  openForm: AuthFormType;
  returnTo: string | null;
  pendingRetry: PendingRetry | null;
  aiChatOpen: boolean;
}
