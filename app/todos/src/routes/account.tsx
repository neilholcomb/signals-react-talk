import { createFileRoute } from "@tanstack/react-router";

function AccountComponent() {
	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-4">Account Settings</h1>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input
							type="text"
							value="John Doe"
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							value="john.doe@example.com"
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
						<input
							type="text"
							value="January 2024"
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
						/>
					</div>
					<div className="pt-4">
						<button disabled className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
							Save Changes (Demo Mode)
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/account")({
	component: AccountComponent,
});
