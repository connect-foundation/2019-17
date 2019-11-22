import React, { useState, useEffect } from "react";
const useScrollEnd = () => {
  // state를 생성합니다.
  const [state, setState] = useState(false);

  const onScroll = () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    ) {
      console.log("scroll Y : ", window.scrollY);
      setState(true);
    } else {
      console.log("scroll Y! : ", window.scrollY);
      setState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); // <---- 집중 !!!
  }, []);
  return state;
};

export default useScrollEnd;
