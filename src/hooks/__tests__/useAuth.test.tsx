import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { AuthProvider } from '../../context/AuthProvider'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
global.localStorage = localStorageMock

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )

  it('returns initial authentication state', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(typeof result.current.login).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })

  it('loads user from localStorage on mount', () => {
    const mockUser = { id: '1', email: 'test@test.com', name: 'test' }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual(mockUser)
  })

  it('handles invalid localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json')
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
  })

  it('successfully logs in with valid credentials', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      const success = await result.current.login('test@test.com', 'password')
      expect(success).toBe(true)
    })
    
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@test.com',
      name: 'test',
    })
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('fails login with empty credentials', async () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      const success = await result.current.login('', '')
      expect(success).toBe(false)
    })
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
  })

  it('successfully logs out', () => {
    const mockUser = { id: '1', email: 'test@test.com', name: 'test' }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser))
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    act(() => {
      result.current.logout()
    })
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
  })
}) 