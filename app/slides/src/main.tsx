import { StrictMode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { ExampleWidget } from "./components/ExampleWidget";
import { CounterWidget, counter, parity } from "./examples/CounterWidget";

// Create signals for example state
const showExample = new Signal<string | undefined>(undefined);
const exampleContainer = new Signal<HTMLElement | null>(null);

export const App = () => {
	useSignals();

	useEffect(() => {
		console.log("useEvent in App.tsx");

		exampleContainer.value = document.getElementById("react-example");

		window.Reveal.on("slidechanged", () => {
			const currentSlide = window.Reveal.getCurrentSlide();
			const exampleValue = currentSlide.dataset.example;

			showExample.value = exampleValue;
		});
	}, []);

	if (showExample.value && exampleContainer.value) {
		return createPortal(
			<ExampleWidget title="React Example" onClose={() => (showExample.value = undefined)}>
				{showExample.value === "counter-example-read" && <CounterWidget counterSignal={counter} />}
				{showExample.value === "counter-example-update" && (
					<CounterWidget counterSignal={counter} showControls />
				)}
				{showExample.value === "counter-example-computed" && (
					<CounterWidget counterSignal={counter} showControls paritySignal={parity} />
				)}
				{showExample.value === "counter-example-no-negative" && (
					<CounterWidget counterSignal={counter} showControls paritySignal={parity} allowNegative={false} />
				)}
			</ExampleWidget>,
			exampleContainer.value
		);
	}
};

const container = document.getElementById("react-app");
if (container) {
	createRoot(container).render(
		<StrictMode>
			<App />
			<div id="react-example"></div>
		</StrictMode>
	);
}
