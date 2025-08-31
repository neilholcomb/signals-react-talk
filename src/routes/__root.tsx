import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootComponent() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-bold text-gray-900">Todo App</h1>
						</div>
						<nav className="flex space-x-8">
							<Link
								to="/todos"
								className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
								activeProps={{
									className: "text-blue-600 bg-blue-50",
								}}
							>
								Todos
							</Link>
							<Link
								to="/account"
								className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
								activeProps={{
									className: "text-blue-600 bg-blue-50",
								}}
							>
								Account
							</Link>
						</nav>
					</div>
				</div>
			</header>

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 bg-white shadow-sm">
					<nav className="mt-8 px-4">
						<div className="space-y-2">
							<Link
								to="/link1"
								className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
								activeProps={{
									className: "text-blue-600 bg-blue-50",
								}}
							>
								Link 1
							</Link>
							<Link
								to="/link2"
								className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
								activeProps={{
									className: "text-blue-600 bg-blue-50",
								}}
							>
								Link 2
							</Link>
							<Link
								to="/link3"
								className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
								activeProps={{
									className: "text-blue-600 bg-blue-50",
								}}
							>
								Link 3
							</Link>
						</div>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-8">
					<Outlet />
				</main>
			</div>

			<TanStackRouterDevtools />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
