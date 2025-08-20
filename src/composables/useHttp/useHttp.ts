import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { ref, computed } from 'vue'
import type { RequestConfig } from '@/types/http'

class HttpService {
  private instance: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.BFF || ''

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        const requestConfig = config as { withToken?: boolean }
        if (requestConfig.withToken !== false) {
          const token = localStorage.getItem('ACCESS_TOKEN')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN')
          window.dispatchEvent(new CustomEvent('auth:unauthorized'))
        }

        if (error.response?.status === 403) {
          window.dispatchEvent(new CustomEvent('auth:forbidden'))
        }

        return Promise.reject(error)
      }
    )
  }

  private getFullURL(url: string): string {
    if (url.startsWith('/')) {
      return `${this.baseURL}${url}`
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `${this.baseURL}/${url}`
  }

  async get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    const fullURL = this.getFullURL(url)
    const response = await this.instance.get(fullURL, config)
    return response.data
  }

  async post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const fullURL = this.getFullURL(url)
    const response = await this.instance.post(fullURL, data, config)
    return response.data
  }

  async put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const fullURL = this.getFullURL(url)
    const response = await this.instance.put(fullURL, data, config)
    return response.data
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const fullURL = this.getFullURL(url)
    const response = await this.instance.patch(fullURL, data, config)
    return response.data
  }

  async delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    const fullURL = this.getFullURL(url)
    const response = await this.instance.delete(fullURL, config)
    return response.data
  }

  setBaseURL(url: string): void {
    this.baseURL = url
    this.instance.defaults.baseURL = url
  }

  getBaseURL(): string {
    return this.baseURL
  }
}

const httpService = new HttpService()

export function useHttp() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  const clearError = () => {
    error.value = null
  }

  const setError = (message: string) => {
    error.value = message
  }

  const request = async <T = unknown>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T | null> => {
    try {
      loading.value = true
      error.value = null

      let response: T

      switch (method) {
        case 'get':
          response = await httpService.get<T>(url, config)
          break
        case 'post':
          response = await httpService.post<T>(url, data, config)
          break
        case 'put':
          response = await httpService.put<T>(url, data, config)
          break
        case 'patch':
          response = await httpService.patch<T>(url, config)
          break
        case 'delete':
          response = await httpService.delete<T>(url, config)
          break
        default:
          throw new Error(`Unsupported HTTP method: ${method}`)
      }

      return response
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } }, message?: string })?.response?.data?.message || (err as { message?: string })?.message || 'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      loading.value = false
    }
  }

  const get = <T = unknown>(url: string, config?: RequestConfig) => request<T>('get', url, undefined, config)
  const post = <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('post', url, data, config)
  const put = <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('put', url, data, config)
  const patch = <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('patch', url, data, config)
  const del = <T = unknown>(url: string, config?: RequestConfig) => request<T>('delete', url, undefined, config)

  return {
    loading: isLoading,
    error: hasError,
    errorMessage: error,

    request,
    get,
    post,
    put,
    patch,
    delete: del,
    clearError,
    setError,

    setBaseURL: httpService.setBaseURL.bind(httpService),
    getBaseURL: httpService.getBaseURL.bind(httpService)
  }
}

export { httpService }
export default useHttp
