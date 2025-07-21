import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../../context/AuthProvider'
import { Photos } from '../Photos'

// Mock the Pexels service
vi.mock('../../../services/api/pexels', () => ({
  pexelsService: {
    searchPhotos: vi.fn(),
  },
}))

// Mock useAuth hook
const mockUseAuth = vi.fn()
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderPhotos = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Photos />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Photos Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', email: 'test@test.com', name: 'test' },
      logout: vi.fn(),
    })
    mockNavigate.mockReturnValue(vi.fn())
  })

  it('shows loading state initially', () => {
    renderPhotos()
    // Loading state shows a spinner
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the page structure', () => {
    renderPhotos()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders photos page with header when loaded', async () => {
    const mockPhotos = [
      {
        id: 1,
        width: 1000,
        height: 1000,
        url: 'https://example.com/photo1',
        photographer: 'John Doe',
        photographer_url: 'https://example.com/john',
        photographer_id: 1,
        avg_color: '#FF0000',
        src: {
          original: 'https://example.com/photo1.jpg',
          large2x: 'https://example.com/photo1-large.jpg',
          large: 'https://example.com/photo1-large.jpg',
          medium: 'https://example.com/photo1-medium.jpg',
          small: 'https://example.com/photo1-small.jpg',
          portrait: 'https://example.com/photo1-portrait.jpg',
          landscape: 'https://example.com/photo1-landscape.jpg',
          tiny: 'https://example.com/photo1-tiny.jpg',
        },
        liked: false,
        alt: 'Beautiful nature photo',
      },
    ]

    const { pexelsService } = await import('../../../services/api/pexels')
    vi.mocked(pexelsService.searchPhotos).mockResolvedValue({
      photos: mockPhotos,
      page: 1,
      per_page: 10,
      total_results: 100,
      next_page: 'https://api.pexels.com/v1/search?page=2',
    })

    renderPhotos()

    await waitFor(() => {
      expect(screen.getByText('All photos')).toBeInTheDocument()
    })
  })

  it('displays photos when loaded successfully', async () => {
    const mockPhotos = [
      {
        id: 1,
        width: 1000,
        height: 1000,
        url: 'https://example.com/photo1',
        photographer: 'John Doe',
        photographer_url: 'https://example.com/john',
        photographer_id: 1,
        avg_color: '#FF0000',
        src: {
          original: 'https://example.com/photo1.jpg',
          large2x: 'https://example.com/photo1-large.jpg',
          large: 'https://example.com/photo1-large.jpg',
          medium: 'https://example.com/photo1-medium.jpg',
          small: 'https://example.com/photo1-small.jpg',
          portrait: 'https://example.com/photo1-portrait.jpg',
          landscape: 'https://example.com/photo1-landscape.jpg',
          tiny: 'https://example.com/photo1-tiny.jpg',
        },
        liked: false,
        alt: 'Beautiful nature photo',
      },
    ]

    const { pexelsService } = await import('../../../services/api/pexels')
    vi.mocked(pexelsService.searchPhotos).mockResolvedValue({
      photos: mockPhotos,
      page: 1,
      per_page: 10,
      total_results: 100,
      next_page: 'https://api.pexels.com/v1/search?page=2',
    })

    renderPhotos()

    await waitFor(() => {
      expect(screen.getByText('All photos')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  it('shows error message when API fails', async () => {
    const { pexelsService } = await import('../../../services/api/pexels')
    vi.mocked(pexelsService.searchPhotos).mockRejectedValue(new Error('API Error'))

    renderPhotos()

    await waitFor(() => {
      expect(screen.getByText(/Failed to load photos/)).toBeInTheDocument()
    })
  })

  it('displays logo in header when loaded', async () => {
    const mockPhotos = [
      {
        id: 1,
        width: 1000,
        height: 1000,
        url: 'https://example.com/photo1',
        photographer: 'John Doe',
        photographer_url: 'https://example.com/john',
        photographer_id: 1,
        avg_color: '#FF0000',
        src: {
          original: 'https://example.com/photo1.jpg',
          large2x: 'https://example.com/photo1-large.jpg',
          large: 'https://example.com/photo1-large.jpg',
          medium: 'https://example.com/photo1-medium.jpg',
          small: 'https://example.com/photo1-small.jpg',
          portrait: 'https://example.com/photo1-portrait.jpg',
          landscape: 'https://example.com/photo1-landscape.jpg',
          tiny: 'https://example.com/photo1-tiny.jpg',
        },
        liked: false,
        alt: 'Beautiful nature photo',
      },
    ]

    const { pexelsService } = await import('../../../services/api/pexels')
    vi.mocked(pexelsService.searchPhotos).mockResolvedValue({
      photos: mockPhotos,
      page: 1,
      per_page: 10,
      total_results: 100,
      next_page: 'https://api.pexels.com/v1/search?page=2',
    })

    renderPhotos()

    await waitFor(() => {
      expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    })
  })

  it('shows photographer information', async () => {
    const mockPhotos = [
      {
        id: 1,
        width: 1000,
        height: 1000,
        url: 'https://example.com/photo1',
        photographer: 'Jane Smith',
        photographer_url: 'https://example.com/jane',
        photographer_id: 2,
        avg_color: '#00FF00',
        src: {
          original: 'https://example.com/photo1.jpg',
          large2x: 'https://example.com/photo1-large.jpg',
          large: 'https://example.com/photo1-large.jpg',
          medium: 'https://example.com/photo1-medium.jpg',
          small: 'https://example.com/photo1-small.jpg',
          portrait: 'https://example.com/photo1-portrait.jpg',
          landscape: 'https://example.com/photo1-landscape.jpg',
          tiny: 'https://example.com/photo1-tiny.jpg',
        },
        liked: false,
        alt: 'Another beautiful photo',
      },
    ]

    const { pexelsService } = await import('../../../services/api/pexels')
    vi.mocked(pexelsService.searchPhotos).mockResolvedValue({
      photos: mockPhotos,
      page: 1,
      per_page: 10,
      total_results: 100,
      next_page: 'https://api.pexels.com/v1/search?page=2',
    })

    renderPhotos()

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })
}) 