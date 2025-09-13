export function AboutMe() {
	return (
		<section className="center">
			<h1 className="slide-title">A little about me</h1>
			<ul className="text-3xl leading-relaxed">
				<li className="fragment">Currently a developer at ThinkAlpha</li>
				<li className="fragment">Former AutoFi, Oportun, Costco</li>
				<li className="fragment" style={{ fontSize: "1.2rem", color: "#888", marginTop: "1rem" }}>
					<span role="img" aria-label="yea">
						🫡
					</span>{" "}
					yea Costco, 15 years did virtually every job there was there
				</li>
				<li className="fragment">Recent empty nester, highly recommend it</li>
				<li className="fragment">React developer, I enjoy working on UI problems</li>
				<li className="fragment">Until you trip over "the React way"</li>
			</ul>
		</section>
	);
}
