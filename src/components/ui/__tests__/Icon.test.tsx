import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from '../Icon'

describe('Icon Component', () => {
  it('renders logo icon', () => {
    render(<Icon name="logo" size={75} />)
    const icon = screen.getByTestId('logo-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders links icon', () => {
    render(<Icon name="links" size={12} />)
    const icon = screen.getByTestId('links-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders star-filled icon', () => {
    render(<Icon name="star-filled" size={20} />)
    const icon = screen.getByTestId('star-filled-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders star-outline icon', () => {
    render(<Icon name="star-outline" size={20} />)
    const icon = screen.getByTestId('star-outline-icon')
    expect(icon).toBeInTheDocument()
  })

  it('applies custom size', () => {
    render(<Icon name="logo" size={100} />)
    const icon = screen.getByTestId('logo-icon')
    expect(icon).toHaveStyle({ width: '100px', height: '100px' })
  })

  it('applies custom className', () => {
    render(<Icon name="logo" className="custom-class" />)
    const icon = screen.getByTestId('logo-icon')
    expect(icon).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Icon name="logo" data-testid="logo-icon" />)
    const icon = screen.getByTestId('logo-icon')
    expect(icon).toBeInTheDocument()
  })
}) 