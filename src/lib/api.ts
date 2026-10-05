import { getToken } from "./token"

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

// NestJS returns `message` as a string or, for validation errors, an array of strings.
function extractMessage(body: unknown, fallback: string) {
  if (body && typeof body === "object") {
    const { message, description } = body as { message?: unknown; description?: unknown }
    if (Array.isArray(message)) return message.join(", ")
    if (typeof message === "string") return message
    if (typeof description === "string") return description
  }
  return fallback
}

export async function apiFetch<T>(path: string, init: RequestInit & { auth?: boolean } = {}): Promise<T> {
  const { auth, headers, ...rest } = init
  const token = auth ? getToken() : null

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 0)
  }

  const body = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(extractMessage(body, res.statusText || "Request failed"), res.status)
  return body as T
}
