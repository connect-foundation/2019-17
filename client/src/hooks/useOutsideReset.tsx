import { useRef, useEffect } from 'react';

export function useOutsideReset(action: () => void) {
  const ref: any = useRef(null);

  function handleClickOutside(event: any) {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      action();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return ref;
}
