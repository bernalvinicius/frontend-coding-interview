/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  var localStorage: {
    getItem: (key: string) => string | null
    setItem: (key: string, value: string) => void
    removeItem: (key: string) => void
    clear: () => void
  }
  
  var fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

export {} 