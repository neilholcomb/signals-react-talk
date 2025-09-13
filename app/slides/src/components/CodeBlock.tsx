import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";

// Register the languages we need
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);

interface CodeBlockProps {
	children: string;
	language?: string;
	className?: string;
	dataLineNumbers?: boolean | string;
	dataId?: string;
	dataAutoAnimate?: boolean;
}

export function CodeBlock({
	children,
	language = "typescript",
	className = "",
	dataLineNumbers = false,
	dataId,
	dataAutoAnimate = false,
	...props
}: CodeBlockProps) {
	const codeRef = useRef<HTMLElement>(null);
	const preRef = useRef<HTMLPreElement>(null);

	// Clean and prepare the code content
	const cleanCode = children.trim();

	useEffect(() => {
		if (codeRef.current && preRef.current) {
			// Clear any existing highlighting
			codeRef.current.innerHTML = cleanCode;

			// Apply syntax highlighting
			if (language && hljs.getLanguage(language)) {
				const result = hljs.highlight(cleanCode, { language });
				codeRef.current.innerHTML = result.value;
			} else {
				codeRef.current.innerHTML = hljs.highlightAuto(cleanCode).value;
			}

			// Add line numbers if requested
			if (dataLineNumbers) {
				codeRef.current.classList.add("hljs");
				preRef.current.classList.add("hljs");

				// Add line numbers data attribute
				if (typeof dataLineNumbers === "string") {
					codeRef.current.setAttribute("data-line-numbers", dataLineNumbers);
				} else {
					codeRef.current.setAttribute("data-line-numbers", "");
				}

				// Parse line ranges for highlighting
				const parseLineRanges = (lineNumbers: string): number[] => {
					const ranges: number[] = [];
					const parts = lineNumbers.split(",").map((p) => p.trim());

					for (const part of parts) {
						if (part.includes("-")) {
							const [start, end] = part.split("-").map((n) => parseInt(n.trim(), 10));
							if (!isNaN(start) && !isNaN(end)) {
								for (let i = start; i <= end; i++) {
									ranges.push(i);
								}
							}
						} else {
							const lineNum = parseInt(part, 10);
							if (!isNaN(lineNum)) {
								ranges.push(lineNum);
							}
						}
					}
					return ranges;
				};

				const highlightedLines = typeof dataLineNumbers === "string" ? parseLineRanges(dataLineNumbers) : [];

				// Create line numbers manually since we don't have Reveal.js plugin
				const lines = cleanCode.split("\n");
				const lineNumbersContainer = document.createElement("div");
				lineNumbersContainer.className = "hljs-ln-numbers";
				lineNumbersContainer.style.cssText = `
					position: absolute;
					top: 0;
					left: 0;
					width: 2em;
					padding: 1em 0.5em 0.5em 0;
					text-align: right;
					color: #666;
					background: transparent;
					font-family: monospace;
					font-size: inherit;
					user-select: none;
					pointer-events: none;
				`;

				// Split content into lines for proper highlighting
				const codeLines = codeRef.current.innerHTML.split("\n");
				const highlightedCodeLines = codeLines.map((line, index) => {
					const lineNumber = index + 1;
					const isHighlighted = highlightedLines.includes(lineNumber);

					// Use a span that doesn't affect line height but provides background
					if (isHighlighted) {
						return `<mark style="background-color: rgba(255, 255, 0, 0.15); padding: 0; margin: 0; color: inherit; display: inline;">${line}</mark>`;
					}
					return line;
				});

				// Update the code content with highlighted lines
				codeRef.current.innerHTML = highlightedCodeLines.join("\n");

				// Add line numbers with consistent height
				lines.forEach((_, index) => {
					const lineNumber = document.createElement("div");
					const lineNum = index + 1;
					const isHighlighted = highlightedLines.includes(lineNum);

					lineNumber.textContent = String(lineNum);
					lineNumber.style.cssText = `
						line-height: inherit; 
						margin: 0; 
						padding: 0;
						${isHighlighted ? "font-weight: bold;" : ""}
					`;
					lineNumbersContainer.appendChild(lineNumber);
				});

				// Style the pre element to accommodate line numbers
				preRef.current.style.position = "relative";
				preRef.current.style.paddingLeft = "3em";

				// Remove any existing line numbers
				const existingLineNumbers = preRef.current.querySelector(".hljs-ln-numbers");
				if (existingLineNumbers) {
					existingLineNumbers.remove();
				}

				// Add the line numbers
				preRef.current.insertBefore(lineNumbersContainer, codeRef.current);
			} else {
				// Remove line numbers styling if not needed
				preRef.current.style.paddingLeft = "";
				preRef.current.style.position = "";
				const existingLineNumbers = preRef.current.querySelector(".hljs-ln-numbers");
				if (existingLineNumbers) {
					existingLineNumbers.remove();
				}
			}
		}
	}, [cleanCode, language, dataLineNumbers]);

	const preProps: Record<string, unknown> = {
		className: className,
		...(dataId && { "data-id": dataId }),
		...(dataAutoAnimate && { "data-auto-animate": true }),
		...props,
	};

	const codeProps: Record<string, unknown> = {
		className: `language-${language}`,
		style: { padding: "1em 0.5em 0.5em 0" },
		...(dataLineNumbers && {
			"data-line-numbers": typeof dataLineNumbers === "string" ? dataLineNumbers : "",
		}),
	};

	return (
		<pre ref={preRef} {...preProps}>
			<code ref={codeRef} {...codeProps} />
		</pre>
	);
}
