import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../Input'

describe('Input Component', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  }

  it('renders with label', () => {
    render(<Input {...defaultProps} label="Username" />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    render(<Input {...defaultProps} placeholder="Enter username" />)
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('calls onChange when input changes', () => {
    const onChange = vi.fn()
    render(<Input {...defaultProps} onChange={onChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(onChange).toHaveBeenCalledWith('test')
  })

  it('displays error message', () => {
    render(<Input {...defaultProps} error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('shows required indicator when required', () => {
    render(<Input {...defaultProps} label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows forgot password link when enabled', () => {
    render(<Input {...defaultProps} label="Password" showForgotPassword />)
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input {...defaultProps} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('has correct autocomplete attribute for email type', () => {
    render(<Input {...defaultProps} type="email" />)
    const emailInput = screen.getByDisplayValue('')
    expect(emailInput).toHaveAttribute('autocomplete', 'email')
  })

  it('has correct autocomplete attribute for password type', () => {
    render(<Input {...defaultProps} type="password" />)
    const passwordInput = screen.getByDisplayValue('')
    expect(passwordInput).toHaveAttribute('autocomplete', 'current-password')
  })

  it('generates id from label when not provided', () => {
    render(<Input {...defaultProps} label="User Name" />)
    const input = screen.getByLabelText('User Name')
    expect(input).toHaveAttribute('id', 'user-name')
  })

  it('uses provided id when available', () => {
    render(<Input {...defaultProps} label="Email" id="custom-id" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('id', 'custom-id')
  })
}) 