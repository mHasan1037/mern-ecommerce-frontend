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

export type ChatCard = OrderCard | ProductListCard;

export interface ChatMessage{
    id: string;
    role: "user" | "assistant";
    content: string;
    link?: string;
    action?: ChatAction;
    card?: ChatCard;
}

export interface chatState {
    messages: ChatMessage[]
    loading: boolean,
    error: string | null;
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
}
