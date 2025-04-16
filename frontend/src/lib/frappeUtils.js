import { useFrappeGetDocList, useFrappeGetDoc, useFrappePostCall } from "frappe-react-sdk";

// Wrapper function for fetching company data
export function useCompanies() {
	return useFrappeGetDocList("Company", {
		fields: [
			"name",
			"company_name",
			"abbr",
			"country",
			"default_currency",
			"creation",
			"modified",
		],
		orderBy: {
			field: "modified",
			order: "desc",
		},
		limit: 50,
	});
}

// Wrapper function for fetching a single company
export function useCompany(name) {
	return useFrappeGetDoc("Company", name);
}

// Wrapper function for fetching individuals (contacts)
export function useIndividuals() {
	return useFrappeGetDocList("Contact", {
		fields: [
			"name",
			"first_name",
			"last_name",
			"email_id",
			"phone",
			"status",
			"creation",
			"modified",
		],
		orderBy: {
			field: "modified",
			order: "desc",
		},
		limit: 50,
	});
}

// Wrapper function for fetching a single individual
export function useIndividual(name) {
	return useFrappeGetDoc("Contact", name);
}

// Wrapper function for fetching invoices
export function useInvoices() {
	return useFrappeGetDocList("Sales Invoice", {
		fields: [
			"name",
			"customer",
			"status",
			"grand_total",
			"posting_date",
			"due_date",
			"creation",
		],
		orderBy: {
			field: "creation",
			order: "desc",
		},
		limit: 50,
	});
}

// Adapt the response from Frappe to match our application's data structure
export function adaptFrappeCompanyData(frappeCompany) {
	return {
		id: frappeCompany.name,
		name: frappeCompany.company_name,
		licenseExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 3))),
		matafiExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 2))),
		laborExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 4))),
		immigrationExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 5))),
		eChannelExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 6))),
	};
}

// Adapt the response from Frappe to match our application's data structure
export function adaptFrappeIndividualData(frappeContact) {
	return {
		id: frappeContact.name,
		firstName: frappeContact.first_name || "",
		lastName: frappeContact.last_name || "",
		email: frappeContact.email_id || "",
		phone: frappeContact.phone || "",
		type: "Employee", // Default value
		passportExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 8))),
		visaExpiry: formatDate(new Date(new Date().setMonth(new Date().getMonth() + 10))),
		visaType: "Work Visa",
		status: frappeContact.status || "Active",
	};
}

// Helper function to format dates in DD-MM-YYYY format
function formatDate(date) {
	if (!date) return "";
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}
