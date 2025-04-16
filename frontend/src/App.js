import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FrappeProvider } from "frappe-react-sdk";
import { ThemeProvider } from "./components/ThemeProvider";
import { SidebarProvider } from "./context/SidebarContext";
import { Layout } from "./components/Layout";

// Pages
import Home from "./pages/Home";
import CompaniesPage from "./pages/Companies/CompaniesPage";
import CompanyDetails from "./pages/Companies/CompanyDetails";
import IndividualsPage from "./pages/Individuals/IndividualsPage";
import EstimatesPage from "./pages/Estimates/EstimatesPage";
import InvoicesPage from "./pages/Invoices/InvoicesPage";
import WorksPage from "./pages/Works/WorksPage";
import AlertsPage from "./pages/Alerts/AlertsPage";
import PaymentsPage from "./pages/Payments/PaymentsPage";

// Create a loading component
const Loading = () => (
	<div className="flex items-center justify-center h-screen w-full">
		<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0047AB]"></div>
	</div>
);

function App() {
	return (
		<FrappeProvider>
			<BrowserRouter>
				<ThemeProvider>
					<SidebarProvider>
						<React.Suspense fallback={<Loading />}>
							<Routes>
								<Route
									path="/"
									element={
										<Layout>
											<Home />
										</Layout>
									}
								/>
								<Route
									path="/companies"
									element={
										<Layout>
											<CompaniesPage />
										</Layout>
									}
								/>
								<Route
									path="/companies/:id"
									element={
										<Layout>
											<CompanyDetails />
										</Layout>
									}
								/>
								<Route
									path="/individuals"
									element={
										<Layout>
											<IndividualsPage />
										</Layout>
									}
								/>
								<Route
									path="/estimates"
									element={
										<Layout>
											<EstimatesPage />
										</Layout>
									}
								/>
								<Route
									path="/invoices"
									element={
										<Layout>
											<InvoicesPage />
										</Layout>
									}
								/>
								<Route
									path="/works"
									element={
										<Layout>
											<WorksPage />
										</Layout>
									}
								/>
								<Route
									path="/alerts"
									element={
										<Layout>
											<AlertsPage />
										</Layout>
									}
								/>
								<Route
									path="/payments"
									element={
										<Layout>
											<PaymentsPage />
										</Layout>
									}
								/>
							</Routes>
						</React.Suspense>
					</SidebarProvider>
				</ThemeProvider>
			</BrowserRouter>
		</FrappeProvider>
	);
}

export default App;
