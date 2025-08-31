import { Todo } from "./types";

interface StatusProps {
	todos: Todo[];
	completedCount: number;
	completionPercentage: number;
}

export function Status({ todos, completedCount, completionPercentage }: StatusProps) {
	return (
		<div className="mb-6">
			<h1 className="text-2xl font-bold text-gray-900 mb-2">My Todos</h1>
			<div className="flex items-center space-x-4 text-sm text-gray-600">
				<span>Total: {todos.length}</span>
				<span>Completed: {completedCount}</span>
				<span>Progress: {completionPercentage}%</span>
			</div>
			<div className="mt-2 bg-gray-200 rounded-full h-2">
				<div
					className="bg-blue-600 h-2 rounded-full transition-all duration-300"
					style={{ width: `${completionPercentage}%` }}
				/>
			</div>
		</div>
	);
}
