import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "../components/Layout"

// Lazy load pages for better performance
const Home = React.lazy(() => import("../pages/Home"))
const CompaniesPage = React.lazy(() => import("../pages/Companies/CompaniesPage"))
const CompanyDetails = React.lazy(() => import("../pages/Companies/CompanyDetails"))
const IndividualsPage = React.lazy(() => import("../pages/Individuals/IndividualsPage"))
const IndividualDetails = React.lazy(() => import("../pages/Individuals/IndividualDetails"))
const InvoicesPage = React.lazy(() => import("../pages/Invoices/InvoicesPage"))
const InvoiceDetails = React.lazy(() => import("../pages/Invoices/InvoiceDetails"))
const EstimatesPage = React.lazy(() => import("../pages/Estimates/EstimatesPage"))
const EstimateDetails = React.lazy(() => import("../pages/Estimates/EstimateDetails"))
const WorksPage = React.lazy(() => import("../pages/Works/WorksPage"))
const WorkDetails = React.lazy(() => import("../pages/Works/WorkDetails"))
const AlertsPage = React.lazy(() => import("../pages/Alerts/AlertsPage"))
const StaffPage = React.lazy(() => import("../pages/Staff/StaffPage"))
const VehiclesPage = React.lazy(() => import("../pages/Vehicles/VehiclesPage"))
const PaymentsPage = React.lazy(() => import("../pages/Payments/PaymentsPage"))
const LegalDocumentsPage = React.lazy(() => import("../pages/LegalDocuments/LegalDocumentsPage"))
const PartnersContactsPage = React.lazy(() => import("../pages/PartnersContacts/PartnersContactsPage"))
const BankAccountsPage = React.lazy(() => import("../pages/BankAccounts/BankAccountsPage"))

function AppRoutes() {
  return (
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
        path="/dashboard"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      {/* Companies routes */}
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
        path="/companies/:id/staff"
        element={
          <Layout>
            <StaffPage />
          </Layout>
        }
      />
      <Route
        path="/companies/:id/vehicles"
        element={
          <Layout>
            <VehiclesPage />
          </Layout>
        }
      />
      <Route
        path="/companies/:id/partners"
        element={
          <Layout>
            <PartnersContactsPage />
          </Layout>
        }
      />
      <Route
        path="/companies/:id/bank-accounts"
        element={
          <Layout>
            <BankAccountsPage />
          </Layout>
        }
      />

      {/* Individuals routes */}
      <Route
        path="/individuals"
        element={
          <Layout>
            <IndividualsPage />
          </Layout>
        }
      />
      <Route
        path="/individuals/:id"
        element={
          <Layout>
            <IndividualDetails />
          </Layout>
        }
      />
      <Route
        path="/individuals/:id/dependents"
        element={
          <Layout>
            <IndividualDetails />
          </Layout>
        }
      />
      <Route
        path="/individuals/:id/vehicles"
        element={
          <Layout>
            <VehiclesPage />
          </Layout>
        }
      />

      {/* Other routes */}
      <Route
        path="/invoices"
        element={
          <Layout>
            <InvoicesPage />
          </Layout>
        }
      />
      <Route
        path="/invoices/:id"
        element={
          <Layout>
            <InvoiceDetails />
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
        path="/estimates/:id"
        element={
          <Layout>
            <EstimateDetails />
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
        path="/works/:id"
        element={
          <Layout>
            <WorkDetails />
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
        path="/staff"
        element={
          <Layout>
            <StaffPage />
          </Layout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <Layout>
            <VehiclesPage />
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
      <Route
        path="/legal-documents"
        element={
          <Layout>
            <LegalDocumentsPage />
          </Layout>
        }
      />
      <Route
        path="/partners-contacts"
        element={
          <Layout>
            <PartnersContactsPage />
          </Layout>
        }
      />
      <Route
        path="/bank-accounts"
        element={
          <Layout>
            <BankAccountsPage />
          </Layout>
        }
      />

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
