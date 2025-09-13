import React from "react";
import { CodeBlock } from "../components";

export function BasicExampleOfSignals() {
	return (
		<>
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataTrim={true} dataLineNumbers={true}>
					{`
					// create a signal
					const counter = new Signal(0);
					`}
				</CodeBlock>
			</section>
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataTrim={true} dataLineNumbers={true}>
					{`
					// create a signal
					const counter = new Signal(0);

					// update the signal
					counter.value++;
					`}
				</CodeBlock>
			</section>
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<CodeBlock dataId="code-animation" language="typescript" dataTrim={true} dataLineNumbers={true}>
					{`
					let circumferenceReducer = ( c, planet ) => {
					return c + planet.diameter * Math.PI;
					}

					let planets = [
					{ name: 'mars', diameter: 6779 },
					{ name: 'earth', diameter: 12742 },
					{ name: 'jupiter', diameter: 139820 }
					]

					let c = planets.reduce( circumferenceReducer, 0 )
					`}
				</CodeBlock>
			</section>
			{/* <section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<pre className="fragment" data-id="code-example" data-auto-animate>
					<code className="language-typescript" data-trim data-noescape data-line-numbers>
						{`
					const counter = new Signal(0);
					`}
					</code>
				</pre>
			</section>
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<pre data-id="code-example" data-auto-animate>
					<code className="language-typescript" data-trim data-noescape data-line-numbers="3">
						{`
					const counter = new Signal(0);

					const isEven = computed(() => (counter.value & 1) == 0);
					`}
					</code>
				</pre>
			</section>
			<section data-auto-animate>
				<h2 className="text-4xl mb-8 text-blue-400">Code Example</h2>
				<pre data-id="code-example" data-auto-animate>
					<code className="language-typescript" data-trim data-noescape data-line-numbers>
						{`
					const counter = new Signal(0);
					const isEven = computed(() => (counter.value & 1) == 0);
					const parity = new Signal.Computed(() => isEven.get() ? "even" : "odd");

					// A library or framework defines effects based on other Signal primitives
					declare function effect(cb: () => void): (() => void);

					effect(() => element.innerText = parity.get());

					// Simulate external updates to counter...
					setInterval(() => counter.set(counter.get() + 1), 1000);
					`}
					</code>
				</pre>
			</section> */}
		</>
	);
}
