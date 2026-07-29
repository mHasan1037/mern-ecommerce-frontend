export interface ChatAction {
  type: "open_auth_form";
  form: AuthFormType;
  retryIntent?: string;
  retryArgs?: any;
}

export interface ChatMessage{
    id: string;
    role: "user" | "assistant";
    content: string;
    link?: string;
    action?: ChatAction;
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
