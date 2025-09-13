import { computed, Signal } from "@preact/signals-react";
import "./counterWidget.css";
import { useSignals } from "@preact/signals-react/runtime";
import { HTMLAttributes } from "react";

export const counter = new Signal(0);
export const isEven = computed(() => counter.value % 2 === 0);
export const parity = computed(() => (isEven.value ? "even" : "odd"));

// Counter Widget Component
interface CounterWidgetProps extends HTMLAttributes<HTMLDivElement> {
	counterSignal: Signal<number>;
	paritySignal?: Signal<string>;
	showControls?: boolean;
}

export function CounterWidget({ counterSignal, paritySignal, showControls = false, ...props }: CounterWidgetProps) {
	useSignals();

	return (
		<div className="counter-widget" {...props}>
			{/* Parity Header */}
			{paritySignal && <div className="counter-widget__parity">{paritySignal.value}</div>}

			{/* Counter Display */}
			<div className="counter-widget__counter">{counterSignal.value}</div>

			{/* Controls Footer */}
			{showControls && (
				<div className="counter-widget__controls">
					<button
						onClick={() => counterSignal.value--}
						className="counter-widget__button counter-widget__button--decrement"
					>
						-
					</button>
					<button
						onClick={() => counterSignal.value++}
						className="counter-widget__button counter-widget__button--increment"
					>
						+
					</button>
				</div>
			)}
		</div>
	);
}
