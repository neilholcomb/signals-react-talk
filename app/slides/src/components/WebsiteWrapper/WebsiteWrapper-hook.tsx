import { ReactNode } from "react";
import { useHighlightOnRender } from "../../hooks/useHighlightOnRender";
import "./WebsiteWrapper.css";
import { Todo } from "../../examples/todos/types";

interface WebsiteWrapperPropsWithoutStats {
	children: ReactNode;
	showRenders?: boolean;
	todos?: Todo[];
	completedTodos?: Todo[];
	incompleteTodos?: Todo[];
	completionPercentage?: number;
	showStats: false;
}
interface WebsiteWrapperPropsWithStats {
	children: ReactNode;
	showRenders?: boolean;
	todos: Todo[];
	completedTodos: Todo[];
	incompleteTodos: Todo[];
	completionPercentage: number;
	showStats: true;
}
type WebsiteWrapperProps = WebsiteWrapperPropsWithoutStats | WebsiteWrapperPropsWithStats;

interface HeaderProps {
	todos?: Todo[];
	completedTodos?: Todo[];
	completionPercentage?: number;
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
	todos: Todo[];
	completedTodos: Todo[];
	completionPercentage: number;
	showRenders?: boolean;
}

function Stats({ todos, completedTodos, completionPercentage, showRenders = false }: StatsProps) {
	const headerHighlight = useHighlightOnRender({ enabled: showRenders, color: "#FBA300" });

	return (
		<div ref={headerHighlight.ref} className="website-header__stats">
			<span>Total: {todos?.length}</span>
			<span>Completed: {completedTodos?.length}</span>
			<span>Progress: {completionPercentage}%</span>
		</div>
	);
}

function Header({ showRenders = false, todos, completedTodos, completionPercentage, showStats }: HeaderProps) {
	const headerHighlight = useHighlightOnRender({ enabled: showRenders, color: "#3b82f6" });

	return (
		<header ref={headerHighlight.ref} className="website-header">
			<div className="website-header__logo">✓</div>
			<h1 className="website-header__title">Todo App</h1>
			{showStats && todos && completedTodos && completionPercentage && (
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
	if (showStats) {
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
	} else {
		return (
			<div ref={wrapperHighlight.ref} className="website-wrapper">
				<Header showRenders={showRenders} showStats={showStats} />

				<div className="website-content">
					<Sidebar showRenders={showRenders} />
					<Body showRenders={showRenders}>{children}</Body>
				</div>
			</div>
		);
	}
	if (showStats) {
	}
}
