import { AboutMe } from "./AboutMe";
import { Introduction } from "./Introduction/index";
import { WhatAreSignals } from "./WhatAreSignals/index";
import { BasicExampleOfSignals } from "./BasicExampleOfSignals/index";

export const SlideDeck = () => {
	return (
		<div className="slides">
			<Introduction />
			<AboutMe />
			<WhatAreSignals />
			<BasicExampleOfSignals />
		</div>
	);
};
