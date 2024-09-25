import React, { useEffect, useRef } from "react";

const useDebounce = (callback, time) => {
  const timeOutIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeOutIdRef.current) {
        clearTimeout(timeOutIdRef.current);
      }
    };
  }, []);

  const debouncedCallBack = (...args) => {
    if (timeOutIdRef.current) {
      clearTimeout(timeOutIdRef.current);
    } else {
      timeOutIdRef.current = setTimeout(() => {
        callback(...args);
      }, time);
    }
  };
  return debouncedCallBack;
};

export default useDebounce;
