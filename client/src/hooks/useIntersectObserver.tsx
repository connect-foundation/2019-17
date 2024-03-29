import { useState, useEffect } from 'react';
import { useCallback } from 'react';

const baseOption = {
  root: null,
  threshold: 0,
  rootMargin: '0px'
};

const useIntersect = (
  interSectAction: any,
  outerSectAction: any,
  option: any = baseOption
) => {
  const [ref, setRef] = useState(null);

  const checkIntersect = useCallback(
    (entry: IntersectionObserverEntry[], observer) => {
      if (entry[0].isIntersecting) {
        interSectAction(entry[0], observer);
      } else {
        outerSectAction();
      }
    },
    [interSectAction, outerSectAction]
  );

  useEffect(() => {
    let observer: any;

    if (ref) {
      observer = new IntersectionObserver(checkIntersect, option);
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useIntersect;
