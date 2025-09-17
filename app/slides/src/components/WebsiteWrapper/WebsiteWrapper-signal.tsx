import { ReactNode } from "react";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./WebsiteWrapper.css";
import { Todo } from "../../examples/todos/types";
import { Signal } from "@preact/signals-core";
import { useSignals } from "@preact/signals-react/runtime";

interface WebsiteWrapperProps {
	children: ReactNode;
	showRenders?: boolean;
	todos: Signal<Todo[]>;
	completedTodos: Signal<Todo[]>;
	incompleteTodos: Signal<Todo[]>;
	completionPercentage: Signal<number>;
	showStats?: boolean;
}

interface HeaderProps {
	todos: Signal<Todo[]>;
	completedTodos: Signal<Todo[]>;
	completionPercentage: Signal<number>;
	showStats?: boolean;
	showRenders?: boolean;
}

interface SidebarProps {
	showRenders?: boolean;
}

interface BodyProps {
	children: ReactNode;
	showRenders?: boolean;
}

interface StatsProps {
	todos: Signal<Todo[]>;
	completedTodos: Signal<Todo[]>;
	completionPercentage: Signal<number>;
	showRenders?: boolean;
}

function Stats({ todos, completedTodos, completionPercentage, showRenders = false }: StatsProps) {
	useSignals();
	const headerHighlight = useHighlightOnRender({ enabled: showRenders, color: "#FBA300" });

	return (
		<div ref={headerHighlight.ref} className="website-header__stats">
			<span>Total: {todos?.value.length}</span>
			<span>Completed: {completedTodos?.value.length}</span>
			<span>Progress: {completionPercentage?.value}%</span>
		</div>
	);
}

function Header({ showRenders = false, todos, completedTodos, completionPercentage, showStats }: HeaderProps) {
	const headerHighlight = useHighlightOnRender({ enabled: showRenders, color: "#3b82f6" });

	return (
		<header ref={headerHighlight.ref} className="website-header">
			<div className="website-header__logo">✓</div>
			<h1 className="website-header__title">Todo App</h1>
			{showStats && (
				<Stats
					todos={todos}
					completedTodos={completedTodos}
					completionPercentage={completionPercentage}
					showRenders={showRenders}
				/>
			)}
		</header>
	);
}

function Sidebar({ showRenders = false }: SidebarProps) {
	const sidebarHighlight = useHighlightOnRender({ enabled: showRenders, color: "#f59e0b" });

	return (
		<aside ref={sidebarHighlight.ref} className="website-sidebar">
			<div className="website-sidebar__header">
				<h2 className="website-sidebar__title">Navigation</h2>
			</div>

			{[
				{ name: "Dashboard", icon: "📊" },
				{ name: "My Tasks", icon: "✅", active: true },
				{ name: "Projects", icon: "📁" },
				{ name: "Calendar", icon: "📅" },
				{ name: "Team", icon: "👥" },
				{ name: "Reports", icon: "📈" },
				{ name: "Settings", icon: "⚙️" },
			].map((item, index) => (
				<a
					key={index}
					href="#"
					className={`website-sidebar__nav-item ${item.active ? "website-sidebar__nav-item--active" : ""}`}
				>
					<span className="website-sidebar__nav-icon">{item.icon}</span>
					{item.name}
				</a>
			))}
		</aside>
	);
}

function Body({ children, showRenders = false }: BodyProps) {
	const mainHighlight = useHighlightOnRender({ enabled: showRenders, color: "#ef4444" });

	return (
		<main ref={mainHighlight.ref} className="website-main">
			{children}
		</main>
	);
}

export function WebsiteWrapper({
	children,
	showRenders = false,
	todos,
	completedTodos,
	completionPercentage,
	showStats,
}: WebsiteWrapperProps) {
	const wrapperHighlight = useHighlightOnRender({ enabled: showRenders, color: "#10b981" });

	return (
		<div ref={wrapperHighlight.ref} className="website-wrapper">
			<Header
				showRenders={showRenders}
				todos={todos}
				completedTodos={completedTodos}
				completionPercentage={completionPercentage}
				showStats={showStats}
			/>

			<div className="website-content">
				<Sidebar showRenders={showRenders} />
				<Body showRenders={showRenders}>{children}</Body>
			</div>
		</div>
	);
}
