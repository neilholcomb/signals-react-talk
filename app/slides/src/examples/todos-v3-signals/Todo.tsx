import { Status } from "./Status";
import { Form } from "./Form";
import { List } from "./List";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import { WebsiteWrapper } from "../../components/WebsiteWrapper/WebsiteWrapper-signal";
import { todos, completedTodos, incompleteTodos, completionPercentage, addTodo, toggleTodo, deleteTodo } from "./state";

import "./todos.css";
import { useSignals } from "@preact/signals-react/runtime";

interface TodoProps {
	showRenders?: boolean;
}

export function Todo({ showRenders = false }: TodoProps) {
	useSignals();
	const todoHighlight = useHighlightOnRender({ enabled: showRenders, color: "#8b5cf6" });

	return (
		<WebsiteWrapper
			showRenders={showRenders}
			todos={todos}
			incompleteTodos={incompleteTodos}
			completedTodos={completedTodos}
			completionPercentage={completionPercentage}
			showStats={true}
		>
			<div className="todo-container">
				<div ref={todoHighlight.ref} className="todo-card" style={{ position: "relative" }}>
					<Status
						todos={todos}
						completedTodos={completedTodos}
						completionPercentage={completionPercentage}
						showRenders={showRenders}
					/>

					<Form onAddTodo={addTodo} showRenders={showRenders} />

					<List
						todos={todos}
						completedTodos={completedTodos}
						incompleteTodos={incompleteTodos}
						onToggleTodo={toggleTodo}
						onDeleteTodo={deleteTodo}
						showRenders={showRenders}
					/>
				</div>
			</div>
		</WebsiteWrapper>
	);
}
