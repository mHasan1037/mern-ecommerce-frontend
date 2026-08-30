import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useUnsavedChanges(
  isDirty: boolean,
  onLeaveConfirmed: () => Promise<void>
) {
  const router = useRouter();
  const isDirtyRef = useRef(isDirty);
  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirtyRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isDirtyRef.current) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      e.preventDefault();
      const ok = window.confirm("Do you want to leave without saving? Your changes will be lost.");
      if (ok) {
        isDirtyRef.current = false;
        onLeaveConfirmed().finally(() => router.push(anchor.getAttribute("href")!));
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onLeaveConfirmed, router]);

  const guardedAction = useCallback(
    (action: () => void) => {
      if (!isDirtyRef.current) return action();
      const ok = window.confirm("Do you want to leave without saving? Your changes will be lost.");
      if (ok) {
        isDirtyRef.current = false;
        onLeaveConfirmed().finally(action);
      }
    },
    [onLeaveConfirmed]
  );

  return { guardedAction };
}