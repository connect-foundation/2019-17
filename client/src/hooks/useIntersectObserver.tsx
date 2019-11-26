import { useState, useEffect, useCallback } from 'react';

const baseOption = {
  root: null,
  threshold: 0,
  rootMargin: '0px'
};

const useIntersect = (interSectAction: any, option: any) => {
  const [ref, setRef] = useState(null);

  const checkIntersect = (
    entry: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    if (entry[0].isIntersecting) {
      interSectAction();
    }
  };

  useEffect(() => {
    let observer: any;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, baseOption);
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useIntersect;
