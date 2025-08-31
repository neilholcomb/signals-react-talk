import { createFileRoute } from "@tanstack/react-router";

function Link2Component() {
	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">Link 2 Page</h1>
				<p className="text-gray-600 mb-4">
					Another dummy page for the routing demonstration. This shows how easy it is to add new pages with
					Tanstack Router.
				</p>
				<div className="bg-green-50 border border-green-200 rounded-md p-4">
					<h3 className="text-lg font-medium text-green-900 mb-2">Features</h3>
					<ul className="list-disc list-inside text-green-800 space-y-1">
						<li>Type-safe routing</li>
						<li>Automatic code splitting</li>
						<li>File-based routing</li>
						<li>Built-in devtools</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/link2")({
	component: Link2Component,
});
