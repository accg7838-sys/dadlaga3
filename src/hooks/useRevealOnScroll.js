import { useEffect, useRef } from "react";

export default function useRevealOnScroll(
  visibleClass,
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px"
) {
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return undefined;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      node.classList.add(visibleClass);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [visibleClass, threshold, rootMargin]);

  return elementRef;
}
