import boredGif from "./bored.gif";

export function WhatAreSignals() {
	return (
		<>
			<section className="center">
				<h2 className="text-4xl mb-8 text-blue-400">What Are Signals?</h2>

				<div className="grid grid-cols-1 gap-8 items-center h-full">
					<p className="fragment">
						Signals are a modern, efficient solution for reactive state and UI management in JavaScript
						frameworks, offering automatic dependency tracking and targeted updates.
					</p>

					<div className="fragment flex justify-center items-center flex-1 h-full">
						<img src={boredGif} alt="Bored meme" className="h-170 w-auto object-contain" />
					</div>
				</div>
			</section>
			<section className="center">
				<h2 className="text-4xl mb-8 text-blue-400">What Are Signals?</h2>

				<div className="grid grid-cols-1 gap-8 items-center h-full">
					<div className="text-center space-y-4">
						<div className="fragment">Signals are Pub Sub</div>
						<div className="fragment">Signals are an event system</div>
						<div className="fragment">Signals are a reactive primitive</div>
						<div className="fragment">
							Signals are not new, just reimagined ideas going back to knockout in 2010
						</div>
						<div className="fragment">
							Signals have a tc39 proposal (stage 0):{" "}
							<a
								href="https://github.com/tc39/proposal-signals"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "#90caf9", textDecoration: "underline" }}
							>
								github.com/tc39/proposal-signals
							</a>
						</div>
						<div className="fragment">
							Frameworks that have first class support for signals:
							<div className="text-center space-y-4">
								<div className="fragment">Angular</div>
								<div className="fragment">Solid</div>
								<div className="fragment">Qwik</div>
								<div className="fragment">Flutter</div>
								<div className="fragment">Svelte</div>
								<div className="fragment">Vue, not strictly signals, identical API</div>
								<div className="fragment">Preact</div>
								<div className="fragment">React, via Preact's library</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
