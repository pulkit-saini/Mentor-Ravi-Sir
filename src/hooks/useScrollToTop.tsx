import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scroll to top on route change
 * More efficient than ScrollToTop component
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    });
  }, [pathname]);
};
