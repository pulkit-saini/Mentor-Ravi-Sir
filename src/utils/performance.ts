/**
 * Performance monitoring utilities
 */

/**
 * Measure Web Vitals (Core Web Vitals)
 */
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  });
  
  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', (entry as any).processingStart - entry.startTime);
    });
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    // FID not supported
  }

  // Cumulative Layout Shift (CLS)
  let clsScore = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsScore += (entry as any).value;
        console.log('CLS:', clsScore);
      }
    }
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    // CLS not supported
  }
};

/**
 * Log long tasks (tasks taking > 50ms)
 */
export const monitorLongTasks = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.warn('Long task detected:', entry.duration, 'ms');
    }
  });

  try {
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long tasks API not supported
  }
};

/**
 * Measure component render time
 */
export const measureRenderTime = (componentName: string, callback: () => void) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  console.log(`${componentName} render time:`, endTime - startTime, 'ms');
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get device performance tier (low/medium/high)
 */
export const getDevicePerformanceTier = (): 'low' | 'medium' | 'high' => {
  if (typeof navigator === 'undefined') return 'medium';

  // Check for hardwareConcurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check for deviceMemory (RAM in GB)
  const memory = (navigator as any).deviceMemory || 4;

  if (cores <= 2 || memory <= 2) {
    return 'low';
  } else if (cores <= 4 || memory <= 4) {
    return 'medium';
  } else {
    return 'high';
  }
};

/**
 * Detect slow connection
 */
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  const slowConnectionTypes = ['slow-2g', '2g', '3g'];
  
  return (
    connection?.saveData ||
    slowConnectionTypes.includes(connection?.effectiveType) ||
    connection?.downlink < 1
  );
};

/**
 * Lazy load component with retry logic
 */
export const lazyWithRetry = (
  componentImport: () => Promise<any>,
  componentName: string
) => {
  return new Promise((resolve, reject) => {
    componentImport()
      .then(resolve)
      .catch((error) => {
        console.error(`Failed to load ${componentName}:`, error);
        // Retry once after 1 second
        setTimeout(() => {
          componentImport().then(resolve).catch(reject);
        }, 1000);
      });
  });
};
