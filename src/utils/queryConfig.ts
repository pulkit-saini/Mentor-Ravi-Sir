/**
 * Optimized query configuration for React Query
 * Provides caching and performance settings
 */
export const queryConfig = {
  // Data considered fresh for 5 minutes
  staleTime: 5 * 60 * 1000,
  
  // Garbage collection time: 10 minutes
  gcTime: 10 * 60 * 1000,
  
  // Don't refetch on window focus to reduce API calls
  refetchOnWindowFocus: false,
  
  // Retry failed requests once
  retry: 1,
  
  // Retry delay: 1 second
  retryDelay: 1000,
};

/**
 * Query keys for consistent caching
 */
export const queryKeys = {
  events: ['events'] as const,
  internships: ['internships'] as const,
  courses: ['courses'] as const,
  userProfile: (userId: string) => ['userProfile', userId] as const,
  studentEvents: (userId: string) => ['studentEvents', userId] as const,
  studentInternships: (userId: string) => ['studentInternships', userId] as const,
};
