import { ChatResponse, chatState } from "@/types/chat";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: chatState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendChatMessage = createAsyncThunk<
  ChatResponse,
  string,
  { rejectValue: string }
>("chat/sendChatMessage", async (message, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/api/chat", { message });

    if (typeof data === "string") {
      return { message: data };
    }
    return {
      message: data.message ?? data.reply,
      link: data.link,
      action: data.action, 
      card: data.card
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message ?? "Something went wrong, please try again",
    );
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: crypto.randomUUID(),
        role: "user",
        content: action.payload,
      });
    },
    clearChat: (state) => {
      ((state.messages = []), (state.error = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        state.messages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message ?? "Please log in to continue.",
          link: action.payload.link,
          action: action.payload.action,
          card: data.card
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
