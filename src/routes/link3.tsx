import { createFileRoute } from "@tanstack/react-router";

function Link3Component() {
	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">Link 3 Page</h1>
				<p className="text-gray-600 mb-4">
					The third dummy page in our demo application. This demonstrates the sidebar navigation
					functionality.
				</p>
				<div className="bg-purple-50 border border-purple-200 rounded-md p-4">
					<h3 className="text-lg font-medium text-purple-900 mb-2">State Management</h3>
					<p className="text-purple-800 mb-2">
						This app demonstrates React's built-in state management capabilities:
					</p>
					<ul className="list-disc list-inside text-purple-800 space-y-1">
						<li>
							<code className="bg-purple-100 px-1 rounded">useState</code> for component state
						</li>
						<li>
							<code className="bg-purple-100 px-1 rounded">useMemo</code> for computed values
						</li>
						<li>
							<code className="bg-purple-100 px-1 rounded">useCallback</code> for function memoization
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/link3")({
	component: Link3Component,
});
