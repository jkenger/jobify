import { useEffect, useRef } from "react";

export function useHandleClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLElement>();

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return function () {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing]
  );
  return ref;
}
