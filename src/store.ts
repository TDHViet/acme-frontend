import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { API_BASE_URL, clearToken, getToken, saveToken } from "./lib/utils"

export interface AuthState {
  token: string | null
  user: { id?: string; name?: string; email?: string } | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
}

const initialState: AuthState = {
  token: getToken(),
  user: null,
  status: "idle",
}

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data?.message || "Login failed")
      return data as { accessToken: string }
    } catch (e) {
      return rejectWithValue("Network error")
    }
  }
)

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data?.message || "Signup failed")
      return data as { accessToken: string }
    } catch (e) {
      return rejectWithValue("Network error")
    }
  }
)

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState }
      const token = state.auth.token || getToken()
      const res = await fetch(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) return rejectWithValue(data?.message || "Unauthorized")
      return data as { id: string; name: string; email: string }
    } catch (e) {
      return rejectWithValue("Network error")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      console.log("Logout action called") // Debug log
      state.token = null
      state.user = null
      clearToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading"
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.token = action.payload.accessToken
        saveToken(action.payload.accessToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) || "Login failed"
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading"
        state.error = undefined
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "succeeded"
        // Signup success does not log the user in automatically
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) || "Signup failed"
      })
      .addCase(fetchMe.fulfilled, (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
        state.user = action.payload
      })
  },
})

export const { logout } = authSlice.actions

export const store = configureStore({
  reducer: { auth: authSlice.reducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


