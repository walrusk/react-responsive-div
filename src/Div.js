import React, {useRef, useEffect} from 'react';

// Default breakpoints that should apply to all observed
// elements that don't define their own custom breakpoints.
const defaultBreakpoints = {
  SM: 384,
  MD: 576,
  LG: 768,
  XL: 960,
};

export default function Div({ breakpoints: customBreakpoints, ...props }) {
  const breakpoints = customBreakpoints || defaultBreakpoints;
  const containerRef = useRef(null);
  useResizeObserver(breakpoints, containerRef);
  return (
    <div ref={containerRef} {...props} />
  );
}

export function useResizeObserver(breakpoints, containerRef) {
    useEffect(() => {
      if (window.ResizeObserver) {
        const ro = new window.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            // Update the matching breakpoints on the observed element.
            Object.keys(breakpoints).forEach(breakpoint => {
              const minWidth = breakpoints[breakpoint];
              if (entry.contentRect.width >= minWidth) {
                entry.target.classList.add(breakpoint);
              } else {
                entry.target.classList.remove(breakpoint);
              }
            });
          });
        });
        ro.observe(containerRef.current);
        return () => ro.disconnect();
      } else if (process && process.env.NODE_ENV === 'development') {
        console.warn('Resize observer not supported');
      }
    }, []);
}
