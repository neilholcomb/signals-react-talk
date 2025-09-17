import { Todo } from "./types";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./todos.css";

interface StatusProps {
	todos: Todo[];
	completedCount: number;
	completionPercentage: number;
	showRenders?: boolean;
}

export function Status({ todos, completedCount, completionPercentage, showRenders = false }: StatusProps) {
	const statusHighlight = useHighlightOnRender({ enabled: showRenders, color: "#f97316" });
	return (
		<div ref={statusHighlight.ref} className="status-section" style={{ position: "relative" }}>
			<h1 className="status-title">My Todos</h1>
			<div className="status-stats">
				<span>Total: {todos.length}</span>
				<span>Completed: {completedCount}</span>
				<span>Progress: {completionPercentage}%</span>
			</div>
			<div className="progress-bar-container">
				<div className="progress-bar" style={{ width: `${completionPercentage}%` }} />
			</div>
		</div>
	);
}
