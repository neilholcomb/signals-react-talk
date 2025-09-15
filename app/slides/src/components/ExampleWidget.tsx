import React, { useRef, useEffect, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

// Module-scope signals to preserve state across mounts
const isCollapsedSignal = signal(false);
const positionSignal = signal({ x: 20, y: 20 });

interface ExampleWidgetProps {
	children: ReactNode;
	title?: string;
	onClose?: () => void;
	width?: number;
	height?: number;
}

export const ExampleWidget = ({ children, title = "Example", onClose, width, height }: ExampleWidgetProps) => {
	useSignals();

	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const widgetRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (widgetRef.current) {
			const rect = widgetRef.current.getBoundingClientRect();
			setDragOffset({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
			setIsDragging(true);
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				positionSignal.value = {
					x: e.clientX - dragOffset.x,
					y: e.clientY - dragOffset.y,
				};
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragOffset]);

	const widgetStyle: React.CSSProperties = {
		position: "fixed",
		left: positionSignal.value.x,
		top: positionSignal.value.y,
		backgroundColor: "#1a1a1a",
		border: "2px solid #404040",
		borderRadius: "8px",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
		minWidth: "200px",
		maxWidth: width ? `${width}px` : "600px",
		width: width ? `${width}px` : "auto",
		height: isCollapsedSignal.value ? "auto" : height ? `${height}px` : "auto",
		overflow: "hidden",
		fontFamily: "system-ui, -apple-system, sans-serif",
		color: "#e0e0e0",
	};

	const headerStyle: React.CSSProperties = {
		backgroundColor: "#2a2a2a",
		borderBottom: isCollapsedSignal.value ? "none" : "1px solid #404040",
		padding: "8px 12px",
		cursor: "move",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		userSelect: "none",
	};

	const titleStyle: React.CSSProperties = {
		margin: 0,
		fontSize: "14px",
		fontWeight: "600",
		color: "#e0e0e0",
		flex: 1,
	};

	const buttonGroupStyle: React.CSSProperties = {
		display: "flex",
		gap: "8px",
		alignItems: "center",
	};

	const iconButtonStyle: React.CSSProperties = {
		background: "none",
		border: "none",
		cursor: "pointer",
		padding: "4px",
		borderRadius: "4px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#b0b0b0",
		transition: "all 0.2s ease",
	};

	const contentStyle: React.CSSProperties = {
		padding: isCollapsedSignal.value ? "0" : "16px",
		maxHeight: isCollapsedSignal.value ? "0" : height ? `${height - 60}px` : "none",
		overflow: isCollapsedSignal.value ? "hidden" : "auto",
		transition: "all 0.3s ease",
	};

	return (
		<div ref={widgetRef} style={widgetStyle}>
			<div style={headerStyle} onMouseDown={handleMouseDown}>
				<h3 style={titleStyle}>{title}</h3>
				<div style={buttonGroupStyle}>
					<button
						style={iconButtonStyle}
						onClick={() => (isCollapsedSignal.value = !isCollapsedSignal.value)}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = "#404040";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
						}}
						title={isCollapsedSignal.value ? "Expand" : "Collapse"}
					>
						<FontAwesomeIcon icon={isCollapsedSignal.value ? faChevronDown : faChevronUp} size="sm" />
					</button>
					{onClose && (
						<button
							style={iconButtonStyle}
							onClick={onClose}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#5a1a1a";
								e.currentTarget.style.color = "#ff6b6b";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "transparent";
								e.currentTarget.style.color = "#b0b0b0";
							}}
							title="Close"
						>
							<FontAwesomeIcon icon={faTimes} size="sm" />
						</button>
					)}
				</div>
			</div>
			<div style={contentStyle}>{children}</div>
		</div>
	);
};
