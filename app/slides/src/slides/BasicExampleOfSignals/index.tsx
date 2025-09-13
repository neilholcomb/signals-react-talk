import { counter, CounterWidget, parity } from "../../examples/CounterWidget";
import { CodeBlock } from "../../components";

export function BasicExampleOfSignals() {
	return (
		<>
			{/* Create the signal */}
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" className="fragment" language="typescript" dataLineNumbers={true}>
					{`
// create a signal
const counter = new Signal(0);
					`}
				</CodeBlock>
			</section>
			{/* Read the signal */}
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataLineNumbers="4-5">
					{`
// create a signal
const counter = new Signal(0);

// read the signal
const currentCounter = counter.value;
					`}
				</CodeBlock>

				<CounterWidget counterSignal={counter} />
			</section>
			{/* Update the signal */}
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataLineNumbers="7-9">
					{`
// create a signal
const counter = new Signal(0);

// read the signal
const currentCounter = counter.value;

// update the signal
const increment = () => counter.value++;
const decrement = () => counter.value--;
					`}
				</CodeBlock>

				<CounterWidget counterSignal={counter} showControls />
			</section>
			{/* Reactivity Computed */}
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataLineNumbers="11-15">
					{`
// create a signal
const counter = new Signal(0);

// read the signal
const currentCounter = counter.value;

// update the signal
const increment = () => counter.value++;
const decrement = () => counter.value--;

// reactivity
const isEven = computed(() => (counter.value & 1) == 0);
const parity = computed(
	() => isEven.get() ? "even" : "odd"
);
					`}
				</CodeBlock>

				<CounterWidget counterSignal={counter} showControls paritySignal={parity} />
			</section>
			{/* Reactivity Effects */}
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataLineNumbers="17-19">
					{`
// create a signal
const counter = new Signal(0);

// read the signal
const currentCounter = counter.value;

// update the signal
const increment = () => counter.value++;
const decrement = () => counter.value--;

// reactivity
const isEven = computed(() => (counter.value & 1) == 0);
const parity = computed(
	() => isEven.get() ? "even" : "odd"
);

// effects
effect(() => {
	alert('Current Value is ' + counter.value);
});
					`}
				</CodeBlock>

				<CounterWidget counterSignal={counter} showControls paritySignal={parity} />
			</section>
		</>
	);
}
