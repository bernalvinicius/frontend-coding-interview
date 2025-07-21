import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pexelsService } from '../pexels'
import { PEXELS_API_KEY } from '../../../constants/api'

// Mock fetch globally
global.fetch = vi.fn()

describe('Pexels API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches photos successfully', async () => {
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

    const mockResponse = {
      page: 1,
      per_page: 10,
      photos: mockPhotos,
      total_results: 100,
      next_page: 'https://api.pexels.com/v1/search?page=2',
    }

    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await pexelsService.searchPhotos()

    expect(fetch).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/search?query=nature&per_page=10',
      {
        headers: {
          Authorization: PEXELS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )
    expect(result).toEqual(mockResponse)
  })

  it('handles API errors gracefully', async () => {
    ;(fetch as any).mockRejectedValueOnce(new Error('Network error'))

    await expect(pexelsService.searchPhotos()).rejects.toThrow('Network error')
  })

  it('handles non-ok responses', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    })

    await expect(pexelsService.searchPhotos()).rejects.toThrow('API request failed: 401')
  })

  it('uses correct API endpoint and parameters', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ photos: [], page: 1, per_page: 10, total_results: 0 }),
    })

    await pexelsService.searchPhotos()

    expect(fetch).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/search?query=nature&per_page=10',
      expect.objectContaining({
        headers: {
          Authorization: PEXELS_API_KEY,
          'Content-Type': 'application/json',
        },
      })
    )
  })
}) 