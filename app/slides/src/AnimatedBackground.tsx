import seedrandom from "seedrandom";
import { effect, ReadonlySignal, Signal, signal } from "@preact/signals-react";
import { useEffect, useRef } from "react";
/**
 * A new glow effect system powered by blurred polygons
 *
 * Credits to @pi0 @Atinux
 *
 * Properties:
 * - glow: 'left' | 'right' | 'top' | 'bottom' | 'full' -  Distribution of the polygons points
 * - glowOpacity: number - Opacity of the polygons (4)
 * - glowHue: number - Hue shift for the polygons (default: 0)
 * - glowSeed: string | false - Seed for the stable random distribution (default: 'default')
 */

export type Range = [number, number];

export type Distribution =
	| "full"
	| "top"
	| "bottom"
	| "left"
	| "right"
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "center"
	| "topmost";

interface CurrentSlideRouteProps {
	currentSlideRoute: Signal<number>;
}

class Polygon {
	private points = signal<Range[]>([]);
	public signal = signal<string>("");
	private currentSlideRoute: ReadonlySignal<number>;
	private number: number;
	private distribution: ReadonlySignal<Distribution>;
	private seed: ReadonlySignal<string>;
	private overflow = 0.3;
	private disturb = 0.3;
	private disturbChance = 0.3;

	constructor(
		number: number,
		currentSlideRoute: Signal<number>,
		distribution: ReadonlySignal<Distribution>,
		seed: ReadonlySignal<string>
	) {
		this.number = number;
		this.currentSlideRoute = currentSlideRoute;
		this.distribution = distribution;
		this.seed = seed;

		// Initialize points
		this.points.value = this.getPoints();
		this.updateSignal();

		console.log("Polygon constructor", this.currentSlideRoute.value);
		effect(() => {
			console.log("Polygon effect", this.currentSlideRoute.value);
			void this.currentSlideRoute.value;
			this.jumpPoints();
		});
	}

	private distributionToLimits(distribution: Distribution) {
		const min = -0.2;
		const max = 1.2;
		let x: Range = [min, max];
		let y: Range = [min, max];

		function intersection(a: Range, b: Range): Range {
			return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
		}

		const limits = distribution.split("-");

		for (const limit of limits) {
			switch (limit) {
				case "topmost":
					y = intersection(y, [-0.5, 0]);
					break;
				case "top":
					y = intersection(y, [min, 0.6]);
					break;
				case "bottom":
					y = intersection(y, [0.4, max]);
					break;
				case "left":
					x = intersection(x, [min, 0.6]);
					break;
				case "right":
					x = intersection(x, [0.4, max]);
					break;
				case "xcenter":
					x = intersection(x, [0.25, 0.75]);
					break;
				case "ycenter":
					y = intersection(y, [0.25, 0.75]);
					break;
				case "center":
					x = intersection(x, [0.25, 0.75]);
					y = intersection(y, [0.25, 0.75]);
					break;
				case "full":
					x = intersection(x, [0, 1]);
					y = intersection(y, [0, 1]);
					break;
				default:
					break;
			}
		}

		return { x, y };
	}

	private distance2([x1, y1]: Range, [x2, y2]: Range) {
		return (x2 - x1) ** 2 + (y2 - y1) ** 2;
	}

	private getPoints(): Range[] {
		const limits = this.distributionToLimits(this.distribution.value);
		const rng = seedrandom(`${this.seed.value}-${this.currentSlideRoute.value}`);
		function randomBetween([a, b]: Range) {
			return rng() * (b - a) + a;
		}
		const applyOverflow = (random: number, overflow: number) => {
			random = random * (1 + overflow * 2) - overflow;
			return rng() < this.disturbChance ? random + (rng() - 0.5) * this.disturb : random;
		};
		return Array.from({ length: this.number })
			.fill(0)
			.map(() => [
				applyOverflow(randomBetween(limits.x), this.overflow),
				applyOverflow(randomBetween(limits.y), this.overflow),
			]);
	}

	private updateSignal() {
		this.signal.value = this.points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(", ");
	}

	private jumpPoints() {
		const newPoints = new Set(this.getPoints());
		this.points.value = this.points.value.map((o: Range) => {
			let minDistance = Number.POSITIVE_INFINITY;
			let closest: Range | undefined;
			for (const n of newPoints) {
				const d = this.distance2(o, n);
				if (d < minDistance) {
					minDistance = d;
					closest = n;
				}
			}
			if (closest) {
				newPoints.delete(closest);
				return closest;
			}
			return o; // fallback to original point if no closest found
		});
		this.updateSignal();
	}
}

export function AnimatedBackground({ currentSlideRoute }: CurrentSlideRouteProps) {
	const distribution = signal<Distribution>("full");
	const opacity = signal<number>(0.4);
	const hue = signal<number>(0);
	const seed = signal<string>("default");

	// Create stable polygon instances using useRef
	const poly1 = useRef(new Polygon(10, currentSlideRoute, distribution, seed));
	const poly2 = useRef(new Polygon(6, currentSlideRoute, distribution, seed));
	const poly3 = useRef(new Polygon(3, currentSlideRoute, distribution, seed));

	// Setup effects for slide changes
	// useSignalEffect(() => {
	// 	void currentSlideRoute.value;
	// 	poly1.current.jumpToNewSlide();
	// 	poly2.current.jumpToNewSlide();
	// 	poly3.current.jumpToNewSlide();
	// });

	console.log({ poly1: poly1.current.signal.value });
	console.log({ poly2: poly2.current.signal.value });
	console.log({ poly3: poly3.current.signal.value });

	useEffect(() => {
		let counter = currentSlideRoute.value;
		const timer = setTimeout(() => {
			counter++;
			currentSlideRoute.value = counter;
		}, 1000);
		return () => clearTimeout(timer);
	}, [currentSlideRoute.value]);

	return (
		<div className="fixed inset-0 -z-10 pointer-events-none">
			<div
				className="bg transform-gpu overflow-hidden pointer-events-none"
				style={{ filter: `blur(70px) hue-rotate(${hue.value}deg)` }}
				aria-hidden="true"
			>
				<div
					className="clip bg-gradient-to-r from-[#18549a] to-[#12238b]"
					style={{ clipPath: `polygon(${poly1.current.signal.value})`, opacity: opacity.value }}
				/>
				<div
					className="clip bg-gradient-to-l from-[#18549a] to-[#12238b]"
					style={{ clipPath: `polygon(${poly2.current.signal.value})`, opacity: opacity.value }}
				/>
				<div
					className="clip bg-gradient-to-t from-[#01b6d1] to-[#696e6f]"
					style={{ clipPath: `polygon(${poly3.current.signal.value})`, opacity: 0.2 }}
				/>
			</div>
		</div>
	);
}
