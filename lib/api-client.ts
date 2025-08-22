/**
 * Centralized API Client
 *
 * This module provides a unified interface for all API calls with:
 * - Error handling
 * - Request/response interceptors
 * - Retry logic
 * - Loading states
 * - Type safety
 */

import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS, DEFAULT_HEADERS } from "./api-config"
import type { ApiResponse, ApiError } from "./types"

class ApiClient {
  private baseURL: string
  private timeout: number
  private retryAttempts: number
  private retryDelay: number

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS
    this.retryDelay = API_CONFIG.RETRY_DELAY
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR)
      }
      throw error
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}, attempt = 1): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    }

    try {
      const response = await this.fetchWithTimeout(url, requestOptions)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        const apiError: ApiError = {
          message: this.getErrorMessage(response.status, errorData.message),
          code: response.status.toString(),
          details: errorData,
        }

        throw apiError
      }

      const data = await response.json()

      return {
        data,
        success: true,
        message: data.message,
      }
    } catch (error) {
      // Retry logic for network errors
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        await this.delay(this.retryDelay * attempt)
        return this.makeRequest<T>(endpoint, options, attempt + 1)
      }

      // Re-throw API errors as-is
      if (this.isApiError(error)) {
        throw error
      }

      // Handle network and other errors
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
        code: "NETWORK_ERROR",
        details: error,
      }

      throw apiError
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (this.isApiError(error)) {
      const status = Number.parseInt(error.code || "0")
      return status >= 500 || status === 0 // Retry on server errors or network issues
    }
    return true // Retry on network errors
  }

  private isApiError(error: unknown): error is ApiError {
    return typeof error === "object" && error !== null && "message" in error
  }

  private getErrorMessage(status: number, serverMessage?: string): string {
    if (serverMessage) return serverMessage

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return ERROR_MESSAGES.VALIDATION_ERROR
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_MESSAGES.UNAUTHORIZED
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_MESSAGES.NOT_FOUND
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return ERROR_MESSAGES.SERVER_ERROR
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return ERROR_MESSAGES.SERVER_ERROR
      default:
        return ERROR_MESSAGES.UNKNOWN_ERROR
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.makeRequest<T>(url, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: "DELETE" })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
