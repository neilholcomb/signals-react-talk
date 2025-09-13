import background from "./background.jpg";

export function Introduction() {
	return (
		<section className="center" data-background-image={background}>
			<h1 className="slide-title">Send Me a Signal</h1>
			<p className="slide-subtitle">Fine grained reactivity for UI development</p>
		</section>
	);
}
