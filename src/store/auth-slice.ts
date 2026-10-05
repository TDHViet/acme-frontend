import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiError, apiFetch } from "@/lib/api"
import { clearToken, getToken, saveToken } from "@/lib/token"

export type User = { id: number | string; email: string; name?: string | null }

export interface AuthState {
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  token: getToken(),
  user: null,
}

const toMessage = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong")

export const login = createAsyncThunk<{ accessToken: string }, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiFetch("/auth/login", { method: "POST", body: JSON.stringify(payload) })
    } catch (e) {
      return rejectWithValue(e instanceof ApiError && e.status === 401 ? "Invalid email or password." : toMessage(e))
    }
  }
)

export const signup = createAsyncThunk<User, { name: string; email: string; password: string }, { rejectValue: string }>(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      return await apiFetch("/auth/signup", { method: "POST", body: JSON.stringify(payload) })
    } catch (e) {
      return rejectWithValue(toMessage(e))
    }
  }
)

export const fetchMe = createAsyncThunk<User, void, { rejectValue: { message: string; unauthorized: boolean } }>(
  "auth/me",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await apiFetch("/me", { auth: true, signal })
    } catch (e) {
      return rejectWithValue({ message: toMessage(e), unauthorized: e instanceof ApiError && e.status === 401 })
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      clearToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        saveToken(action.payload.accessToken)
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchMe.rejected, (state, action) => {
        if (action.payload?.unauthorized) {
          state.token = null
          state.user = null
          clearToken()
        }
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
