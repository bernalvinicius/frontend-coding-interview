import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { useAuth } from '../../hooks/useAuth';
import { pexelsService } from '../../services/api/pexels';
import type { Photo } from '../../types';

// localStorage key for liked photos
const LIKED_PHOTOS_KEY = 'liked_photos';

// Helper functions for localStorage operations
const loadLikedPhotosFromStorage = (): Set<number> => {
  try {
    const stored = localStorage.getItem(LIKED_PHOTOS_KEY);
    if (stored) {
      const photoIds = JSON.parse(stored) as number[];
      return new Set(photoIds);
    }
  } catch (error) {
    console.error('Error loading liked photos from localStorage:', error);
  }
  return new Set();
};

const saveLikedPhotosToStorage = (likedPhotos: Set<number>): void => {
  try {
    const photoIds = Array.from(likedPhotos);
    localStorage.setItem(LIKED_PHOTOS_KEY, JSON.stringify(photoIds));
  } catch (error) {
    console.error('Error saving liked photos to localStorage:', error);
  }
};

export const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  // Refs to prevent duplicate API calls caused by React Strict Mode
  // hasFetchedRef: indicates if data has been successfully fetched
  // isFetchingRef: indicates if a call is in progress (prevents race conditions)
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Load liked photos from localStorage on component mount
  useEffect(() => {
    const storedLikedPhotos = loadLikedPhotosFromStorage();
    setLikedPhotos(storedLikedPhotos);
  }, []);

  const toggleLike = (photoId: number) => {
    setLikedPhotos((prev: Set<number>) => {
      const newLiked = new Set(prev);
      if (newLiked.has(photoId)) {
        newLiked.delete(photoId);
      } else {
        newLiked.add(photoId);
      }
      
      // Save to localStorage immediately after state update
      saveLikedPhotosToStorage(newLiked);
      
      return newLiked;
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Prevents duplicate calls: if already fetched or fetching, don't make a new call
    // This solves the React Strict Mode issue that executes useEffect twice in development
    if (hasFetchedRef.current || isFetchingRef.current) {
      return;
    }

    const fetchPhotos = async () => {
      // Mark as "fetching" immediately to prevent race conditions
      isFetchingRef.current = true;
      try {
        setIsLoading(true);
        const response = await pexelsService.searchPhotos();
        setPhotos(response.photos);
        // Mark as "already fetched" after success
        hasFetchedRef.current = true;
      } catch (err) {
        setError(`Failed to load photos. Please try again. Error: ${err}`);
      } finally {
        setIsLoading(false);
        // Reset "fetching" flag regardless of result
        isFetchingRef.current = false;
      }
    };

    fetchPhotos();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Main Content */}
      <main className="max-w-[500px] mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-start mb-6">
              <Icon name="logo" size={75} />
            </div>
            <h2 className="mb-6 font-helvetica font-bold text-[20px] leading-[100%] tracking-[0%] text-neutral-darkest">
              All photos
            </h2>

            <div className="space-y-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-start space-x-4 bg-white rounded-lg relative"
                >
                  {/* Star Icon */}
                  <button
                    className="flex-shrink-0 mt-0 relative group"
                    onClick={() => toggleLike(photo.id)}
                  >
                    <Icon
                      name={
                        photo.liked || likedPhotos.has(photo.id)
                          ? 'star-filled'
                          : 'star-outline'
                      }
                      size={20}
                    />

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      {photo.liked || likedPhotos.has(photo.id)
                        ? 'Liked'
                        : 'Not Liked'}
                    </div>
                  </button>

                  {/* Photo Thumbnail */}
                  <div className="w-[75px] h-[75px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={photo.src.medium}
                      alt={photo.alt || `Photo by ${photo.photographer}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Photo Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-gray-900 leading-[100%] tracking-[0%]">
                      {photo.photographer || 'Unknown Photographer'}
                    </p>
                    <p className="text-[14px] font-normal text-neutral-darkest leading-[100%] tracking-[0%] mt-[6px]">
                      {photo.alt || 'Untitled'}
                    </p>
                    <div className="flex items-center space-x-2 mt-[6px]">
                      <p className="text-[14px] font-normal text-gray-600 leading-[100%] tracking-[0%]">
                        #{photo.id}
                      </p>
                      {/* Average Color */}
                      <div
                        className={`w-3 h-3 border border-gray-300 flex-shrink-0 ${
                          photo.avg_color ? '' : 'bg-neutral-light'
                        }`}
                        style={{
                          backgroundColor: photo.avg_color || undefined,
                        }}
                      />
                    </div>
                  </div>

                  {/* Portfolio Link */}
                  <a
                    href={photo.photographer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-right flex items-center space-x-1 font-helvetica font-normal text-[12px] leading-[100%] tracking-[0%] text-primary-blue"
                  >
                    <Icon name="links" size={12} />
                    <span>
                      {photo.photographer_url
                        ? 'Portfolio'
                        : photo.photographer_url}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
