import React, {useRef, useEffect, useMemo, useCallback} from 'react';

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

export function useResizeObserver(breakpointObj, containerRef) {
  // Sort breakpoints
  const breakpoints = useMemo(() => Object.keys(breakpointObj).sort((a,b) => {
    if (breakpointObj[a] < breakpointObj[b]) return -1;
    if (breakpointObj[a] > breakpointObj[b]) return 1;
    return 0;
  }), [breakpointObj]);
  const getBreakpoint = useCallback((width) => {
    return breakpoints.find((bp, i) => {
      const min = breakpointObj[bp];
      const max = breakpointObj[breakpoints[i+1]];
      if ((i === 0 || width >= min) && (!max || width < max)) {
        return true;
      }
    });
  }, [breakpoints, breakpointObj]);
  useEffect(() => {
    if (window.ResizeObserver) {
      const ro = new window.ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const breakpoint = getBreakpoint(entry.contentRect.width);
          if (breakpoint && !entry.target.classList.contains(breakpoint)) {
            entry.target.classList.remove(...breakpoints);
            entry.target.classList.add(breakpoint);
          }
        });
      });
      ro.observe(containerRef.current);
      return () => ro.disconnect();
    } else if (process && process.env.NODE_ENV === 'development') {
      console.warn('Resize observer not supported');
    }
  }, [breakpoints]);
}
