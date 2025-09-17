import { StrictMode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { ExampleWidget } from "./components/ExampleWidget";
import { CounterWidget, counter, parity } from "./examples/CounterWidget";
import { Todo } from "./examples/todos/Todo";
import { TodoAppFullSite } from "./examples/TodoAppFullSite";
import { Todo as TodoV2 } from "./examples/todos-v2/Todo";
import { Todo as TodoV3 } from "./examples/todos-v3-signals/Todo";

// Create signals for example state
const showExample = new Signal<string | undefined>(undefined);
const exampleContainer = new Signal<HTMLElement | null>(null);
const exampleWidth = new Signal<number | undefined>(undefined);
const exampleHeight = new Signal<number | undefined>(undefined);

export const App = () => {
	useSignals();

	useEffect(() => {
		console.log("useEvent in App.tsx");

		exampleContainer.value = document.getElementById("react-example");

		window.Reveal.on("slidechanged", () => {
			const currentSlide = window.Reveal.getCurrentSlide();
			const exampleValue = currentSlide.dataset.example;
			const widthValue = currentSlide.dataset.exampleWidth;
			const heightValue = currentSlide.dataset.exampleHeight;

			showExample.value = exampleValue;
			exampleWidth.value = widthValue ? parseInt(widthValue, 10) : undefined;
			exampleHeight.value = heightValue ? parseInt(heightValue, 10) : undefined;
		});
	}, []);

	if (showExample.value && exampleContainer.value) {
		return createPortal(
			<ExampleWidget
				title="React Example"
				onClose={() => (showExample.value = undefined)}
				width={exampleWidth.value}
				height={exampleHeight.value}
			>
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

				{showExample.value === "todo-app-react" && <Todo />}
				{showExample.value === "todo-app-react-fullsite" && <TodoAppFullSite showRenders={true} />}
				{showExample.value === "todo-app-react-fullsite-v2" && <TodoV2 showRenders={true} />}
				{showExample.value === "todo-app-react-fullsite-v3-signals" && <TodoV3 showRenders={true} />}
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
