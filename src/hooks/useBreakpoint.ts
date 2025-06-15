import { useState, useEffect } from 'react';

const BREAKPOINTS = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const useBreakpoint = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = dimensions;

  let currentBreakpoint = undefined;
  if (width >= BREAKPOINTS.xl) {
    currentBreakpoint = 'xl';
  } else if (width >= BREAKPOINTS.lg) {
    currentBreakpoint = 'lg';
  } else if (width >= BREAKPOINTS.md) {
    currentBreakpoint = 'md';
  } else if (width >= BREAKPOINTS.sm) {
    currentBreakpoint = 'sm';
  }

  const isMobile = width < BREAKPOINTS.md;
  const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
  const isDesktop = width >= BREAKPOINTS.lg;


  return {
    width,
    height,
    breakpoint: currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useBreakpoint;
