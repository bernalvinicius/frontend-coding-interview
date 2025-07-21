import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../../context/AuthProvider'
import { SignIn } from '../SignIn'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

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

const renderSignIn = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('SignIn Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders sign in form', () => {
    renderSignIn()
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('shows validation error for empty email field', async () => {
    renderSignIn()
    
    const submitButton = screen.getByRole('button', { name: 'Sign in' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for empty password field when email is valid', async () => {
    renderSignIn()
    
    const emailInput = screen.getByLabelText('Username')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    renderSignIn()
    
    const emailInput = screen.getByLabelText('Username')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('successfully logs in with valid credentials', async () => {
    renderSignIn()
    
    const emailInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/photos')
    })
  })

  it('shows loading state during submission', async () => {
    renderSignIn()
    
    const emailInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument()
  })

  it('shows forgot password link', () => {
    renderSignIn()
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
  })

  it('has correct form accessibility attributes', () => {
    renderSignIn()
    
    const emailInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toHaveAttribute('type', 'text')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(emailInput).toHaveAttribute('autocomplete', 'off')
    expect(passwordInput).toHaveAttribute('autocomplete', 'current-password')
  })
}) 