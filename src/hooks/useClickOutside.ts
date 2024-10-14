import { useEffect, useRef } from "react";

/**
 * 바깥 영역을 클릭 시 trigger되는 함수
 * @param callback 드롭다운을 닫는 콜백함수
 * @returns 참조 DOM
 */
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
