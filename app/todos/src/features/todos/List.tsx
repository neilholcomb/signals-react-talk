import { Todo } from "./types";

interface ListProps {
	todos: Todo[];
	completedTodos: Todo[];
	incompleteTodos: Todo[];
	onToggleTodo: (id: number) => void;
	onDeleteTodo: (id: number) => void;
}

export function List({ todos, completedTodos, incompleteTodos, onToggleTodo, onDeleteTodo }: ListProps) {
	return (
		<div className="space-y-2">
			{incompleteTodos.length > 0 && (
				<div>
					<h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
					{incompleteTodos.map((todo) => (
						<div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
							<button
								onClick={() => onToggleTodo(todo.id)}
								className="w-5 h-5 border-2 border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:border-blue-500"
							/>
							<span className="flex-1 text-gray-900">{todo.text}</span>
							<button
								onClick={() => onDeleteTodo(todo.id)}
								className="text-red-500 hover:text-red-700 text-sm"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			)}

			{completedTodos.length > 0 && (
				<div className="mt-6">
					<h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
					{completedTodos.map((todo) => (
						<div key={todo.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-md">
							<button
								onClick={() => onToggleTodo(todo.id)}
								className="w-5 h-5 bg-green-500 border-2 border-green-500 rounded flex items-center justify-center text-white text-xs"
							>
								✓
							</button>
							<span className="flex-1 text-gray-600 line-through">{todo.text}</span>
							<button
								onClick={() => onDeleteTodo(todo.id)}
								className="text-red-500 hover:text-red-700 text-sm"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			)}

			{todos.length === 0 && (
				<div className="text-center py-8 text-gray-500">
					<p>No todos yet. Add one above!</p>
				</div>
			)}
		</div>
	);
}
