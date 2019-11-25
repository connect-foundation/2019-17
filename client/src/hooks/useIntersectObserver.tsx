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
      // console.log('im in');
      // observer.unobserve(entry[0].target);
      interSectAction();
      // observer.observe(entry[0].target);
    }
  };

  useEffect(() => {
    // console.log('aaaaaaaaa', ref);
    let observer: any;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, baseOption);
      // console.log('----------------', ref);
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useIntersect;
