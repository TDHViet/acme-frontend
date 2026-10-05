const TOKEN_KEY = "auth_token"

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/** Reads the `exp` claim without verifying the signature — the server still verifies it. */
export function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

export function hasValidToken() {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}
