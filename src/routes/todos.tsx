import { createFileRoute } from "@tanstack/react-router";
import { Todo } from "../features/todos";

export const Route = createFileRoute("/todos")({
	component: Todo,
});
