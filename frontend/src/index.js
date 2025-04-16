import React from "react";
import ReactDOM from "react-dom/client";
// import "@/styles/globals.css";
// import "./globals.css";

import { injectGlobalStyles } from "./injectGlobalStyles";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
	const rootElement = document.getElementById("react-root");

	if (rootElement) {
		const root = ReactDOM.createRoot(rootElement);
		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		);
	}
});
