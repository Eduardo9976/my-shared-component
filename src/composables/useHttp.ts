import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { ref, computed } from 'vue'
import type { RequestConfig } from '@/types/http'

let baseURL =
  import.meta.env.DEV
    ? window.location.origin
    : (import.meta.env.VITE_MEWEB ?? window.location.origin)

let customToken: string | null = null

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(
  config => {
    const requestConfig = config as {
      withToken?: boolean
      withCredentials?: boolean
    }

    if (requestConfig.withToken !== false) {
      const token = customToken || localStorage.getItem('ACCESS_TOKEN')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    if (requestConfig.withCredentials !== undefined) {
      config.withCredentials = requestConfig.withCredentials
    }

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
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

function getFullURL(url: string): string {
  if (url.startsWith('/')) return `${baseURL}${url}`
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${baseURL}/${url}`
}

async function httpGet<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
  const response = await instance.get<T>(getFullURL(url), config)
  return response.data
}

async function httpPost<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
  const response = await instance.post<T>(getFullURL(url), data, config)
  return response.data
}

async function httpPut<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
  const response = await instance.put<T>(getFullURL(url), data, config)
  return response.data
}

async function httpPatch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
  const response = await instance.patch<T>(getFullURL(url), data, config)
  return response.data
}

async function httpDelete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
  const response = await instance.delete<T>(getFullURL(url), config)
  return response.data
}

function setBaseURL(url: string) {
  baseURL = url
  instance.defaults.baseURL = url
}

function getBaseURL() {
  return baseURL
}

function setCustomToken(token: string | null) {
  if (token !== null && typeof token !== 'string') {
    console.warn('Token deve ser uma string, recebido:', typeof token, token)
    return
  }
  customToken = token
}

function getCustomToken() {
  return customToken
}

function clearCustomToken() {
  customToken = null
}

const httpService = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
  setBaseURL,
  getBaseURL,
  setCustomToken,
  getCustomToken,
  clearCustomToken
}

export function useHttp() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  function clearError() {
    error.value = null
  }

  function setError(message: string) {
    error.value = message
  }

  async function request<T = unknown>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T | null> {
    try {
      loading.value = true
      error.value = null

      switch (method) {
        case 'get': return await httpService.get<T>(url, config)
        case 'post': return await httpService.post<T>(url, data, config)
        case 'put': return await httpService.put<T>(url, data, config)
        case 'patch': return await httpService.patch<T>(url, data, config)
        case 'delete': return await httpService.delete<T>(url, config)
        default: throw new Error(`Unsupported HTTP method: ${method}`)
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })
          ?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'An error occurred'
      setError(errorMessage)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading: isLoading,
    error: hasError,
    errorMessage: error,

    request,
    get: <T = unknown>(url: string, config?: RequestConfig) => request<T>('get', url, undefined, config),
    post: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('post', url, data, config),
    put: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('put', url, data, config),
    patch: <T = unknown>(url: string, data?: unknown, config?: RequestConfig) => request<T>('patch', url, data, config),
    delete: <T = unknown>(url: string, config?: RequestConfig) => request<T>('delete', url, undefined, config),

    clearError,
    setError,

    setBaseURL,
    getBaseURL,
    setCustomToken,
    getCustomToken,
    clearCustomToken
  }
}


