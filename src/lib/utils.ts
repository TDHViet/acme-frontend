import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function saveToken(token: string) {
  localStorage.setItem("auth_token", token)
}

export function getToken() {
  return localStorage.getItem("auth_token")
}

export function clearToken() {
  localStorage.removeItem("auth_token")
}
