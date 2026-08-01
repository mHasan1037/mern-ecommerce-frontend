import { AuthFormType, PendingRetry, UIState } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
  openForm: null,
  returnTo: null,
  pendingRetry: null,
  aiChatOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthForm(state, action: PayloadAction<{ form: AuthFormType; returnTo?: string; retry?: PendingRetry }>) {
      state.openForm = action.payload.form;
      state.returnTo = action.payload.returnTo ?? null;
      state.pendingRetry = action.payload.retry ?? null;
    },
    closeAuthForm(state) {
      state.openForm = null;
      state.returnTo = null;
      state.pendingRetry = null;
    },
    openAiChat(state) {
      state.aiChatOpen = true;
    },
    closeAiChat(state) {
      state.aiChatOpen = false;
    },
    toggleAiChat(state) {
      state.aiChatOpen = !state.aiChatOpen;
    }
  },
});

export const { openAuthForm, closeAuthForm, openAiChat, closeAiChat, toggleAiChat } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;