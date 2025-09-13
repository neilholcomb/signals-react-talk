import { useLayoutEffect, useRef } from "react";
import Reveal from "reveal.js";
import type { Api } from "reveal.js";
import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css"; // Or your chosen theme
import { SlideDeck } from "./slides";
import "highlight.js/styles/night-owl.css";

export const App = () => {
	const deckRef = useRef<Api | null>(null);
	const revealRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		// Wait for the next tick to ensure React has rendered the slides
		const initializeReveal = () => {
			if (revealRef.current && !deckRef.current) {
				// Initialize Reveal.js after slides are rendered
				deckRef.current = new Reveal(revealRef.current, {
					transition: "slide",
					hash: true,
					respondToHashChanges: true,
					history: true,
					plugins: [],
				});
				deckRef.current.initialize();
			}
		};

		// Use setTimeout to ensure DOM is fully updated
		const timeoutId = setTimeout(initializeReveal, 0);

		// Clean up Reveal.js on component unmount
		return () => {
			clearTimeout(timeoutId);
			if (deckRef.current) {
				deckRef.current.destroy();
				deckRef.current = null;
			}
		};
	}, []); // Empty dependency array ensures this runs once after mount

	return (
		<>
			<div className="reveal" ref={revealRef}>
				<SlideDeck />
			</div>
		</>
	);
};
