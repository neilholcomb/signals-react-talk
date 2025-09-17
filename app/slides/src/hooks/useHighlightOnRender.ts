import { useRef, useEffect } from "react";

interface UseHighlightOnRenderOptions {
	enabled?: boolean;
	color?: string;
	duration?: number;
}

export const useHighlightOnRender = (options: UseHighlightOnRenderOptions = {}) => {
	const { enabled = true, color = "#3b82f6", duration = 1000 } = options;
	const ref = useRef<any>(null);
	const isHighlightingRef = useRef(false);
	const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const originalStylesRef = useRef<{ border: string; boxShadow: string } | null>(null);
	const isShowingRef = useRef(false);
	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		if (!enabled) return;

		// Set start time on first render
		if (startTimeRef.current === null) {
			startTimeRef.current = Date.now();
			return;
		}

		// Skip highlighting for the first 1 second after component mount
		const timeSinceMount = Date.now() - startTimeRef.current;
		if (timeSinceMount < 1000) {
			return;
		}

		// Set flag to prevent counting highlight-induced renders
		isHighlightingRef.current = true;

		if (ref.current) {
			const element = ref.current;

			// Store original styles only if not already stored
			if (!originalStylesRef.current) {
				originalStylesRef.current = {
					border: element.style.border || "",
					boxShadow: element.style.boxShadow || "",
				};
			}

			// Clear any existing fade timeout since we have a new render
			if (fadeTimeoutRef.current) {
				clearTimeout(fadeTimeoutRef.current);
				fadeTimeoutRef.current = null;
			}

			// Apply highlight effect using border (will cause reflow but prevents overlap)
			element.style.border = `2px solid ${color}`;
			element.style.boxShadow = `0 0 8px ${color}40`;
			isShowingRef.current = true;

			// Set timer for 2 seconds after this render to fade the highlight
			fadeTimeoutRef.current = setTimeout(() => {
				if (element && originalStylesRef.current) {
					element.style.border = originalStylesRef.current.border;
					element.style.boxShadow = originalStylesRef.current.boxShadow;
					originalStylesRef.current = null;
					isShowingRef.current = false;
				}
				fadeTimeoutRef.current = null;
			}, 2000);

			// Clear highlighting flag after initial highlight duration
			const highlightTimer = setTimeout(() => {
				isHighlightingRef.current = false;
			}, duration);

			return () => {
				clearTimeout(highlightTimer);
				if (fadeTimeoutRef.current) {
					clearTimeout(fadeTimeoutRef.current);
					fadeTimeoutRef.current = null;
				}
				isHighlightingRef.current = false;
			};
		} else {
			// Clear the flag if no element to highlight
			isHighlightingRef.current = false;
		}
	});

	return {
		ref,
		isShowing: isShowingRef.current,
	};
};
