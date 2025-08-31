import { createFileRoute } from "@tanstack/react-router";

function Link1Component() {
	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">Link 1 Page</h1>
				<p className="text-gray-600 mb-4">
					This is a dummy page for demonstration purposes. In a real application, this could be any feature or
					section of your app.
				</p>
				<div className="bg-blue-50 border border-blue-200 rounded-md p-4">
					<h3 className="text-lg font-medium text-blue-900 mb-2">Demo Content</h3>
					<p className="text-blue-800">
						This page is part of the routing demonstration for the signals talk. You can navigate between
						different sections using the sidebar links.
					</p>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/link1")({
	component: Link1Component,
});
