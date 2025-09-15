import type { Api } from "reveal.js";

declare global {
	interface Window {
		Reveal: Api;
	}
}

export {};
