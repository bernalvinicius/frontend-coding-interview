import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

const renderApp = () => {
  return render(<App />)
}

describe('App Component', () => {
  it('renders the application', () => {
    renderApp()
    
    // App should render without crashing
    expect(document.body).toBeInTheDocument()
  })

  it('shows sign in page by default', () => {
    renderApp()
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
  })

  it('renders with logo', () => {
    renderApp()
    
    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
  })
}) 