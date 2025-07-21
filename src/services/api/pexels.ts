import type { PexelsResponse } from '../../types';
import {
  PEXELS_API_KEY,
  PEXELS_BASE_URL,
  PEXELS_SEARCH_ENDPOINT,
  PHOTOS_PER_PAGE,
} from '../../constants/api';

class PexelsService {
  private baseURL = PEXELS_BASE_URL;
  private apiKey = PEXELS_API_KEY;

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        Authorization: this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  async searchPhotos(
    query: string = 'nature',
    perPage: number = PHOTOS_PER_PAGE
  ): Promise<PexelsResponse> {
    const endpoint = `${PEXELS_SEARCH_ENDPOINT}?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}`;
    return this.makeRequest<PexelsResponse>(endpoint);
  }
}

export const pexelsService = new PexelsService();
