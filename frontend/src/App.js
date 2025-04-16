import React, { useState } from "react";
import { FrappeProvider, useFrappeGetDocList } from "frappe-react-sdk";

// Main App component that wraps everything with FrappeProvider
function App() {
	return (
		<FrappeProvider>
			<DocTypeList />
		</FrappeProvider>
	);
}

// Simple component that displays a list of DocTypes using the SDK
function DocTypeList() {
	const { data, error, isValidating } = useFrappeGetDocList("DocType", {
		fields: ["name", "module", "modified"],
		limit: 10,
		orderBy: {
			field: "modified",
			order: "desc",
		},
	});

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-white shadow-md rounded-lg overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h1 className="text-2xl font-bold text-gray-800">Frappe DocTypes</h1>
						<p className="text-gray-600 mt-1">
							Using Frappe React SDK with Tailwind CSS
						</p>
					</div>

					<div className="p-6">
						{isValidating && (
							<div className="text-center py-4">
								<p className="text-gray-600">Loading DocTypes...</p>
							</div>
						)}

						{error && (
							<div className="bg-red-100 text-red-700 p-4 rounded-md">
								<p>Error: {JSON.stringify(error)}</p>
							</div>
						)}

						{data && (
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Module
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Last Modified
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{data.map((doctype) => (
											<tr key={doctype.name} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
													{doctype.name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{doctype.module}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(doctype.modified).toLocaleString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
