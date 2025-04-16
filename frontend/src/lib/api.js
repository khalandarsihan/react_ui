// Update environment variable access for webpack
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}

// Companies API
export async function getCompanies() {
  // For development, return mock data if API is not available
  try {
    return await fetchApi("/companies")
  } catch (error) {
    console.warn("API not available, using mock data")
    return initialCompanies
  }
}

export async function getCompany(id) {
  try {
    return await fetchApi(`/companies/${id}`)
  } catch (error) {
    console.warn("API not available, using mock data")
    return initialCompanies.find((company) => company.id.toString() === id.toString()) || null
  }
}

export async function createCompany(data) {
  return fetchApi("/companies", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Individuals API
export async function getIndividuals() {
  try {
    return await fetchApi("/individuals")
  } catch (error) {
    console.warn("API not available, using mock data")
    return initialIndividuals
  }
}

export async function getIndividual(id) {
  try {
    return await fetchApi(`/individuals/${id}`)
  } catch (error) {
    console.warn("API not available, using mock data")
    return initialIndividuals.find((individual) => individual.id.toString() === id.toString()) || null
  }
}

export async function createIndividual(data) {
  return fetchApi("/individuals", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// Mock data for development
const initialCompanies = [
  {
    id: 1,
    name: "MEEM TYPING AND STAMPS",
    licenseExpiry: "11-04-2025",
    matafiExpiry: "28-02-2025",
    laborExpiry: "28-02-2025",
    immigrationExpiry: "21-03-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 2,
    name: "WSM LTD",
    licenseExpiry: "11-04-2025",
    matafiExpiry: "28-02-2025",
    laborExpiry: "28-02-2025",
    immigrationExpiry: "21-03-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 3,
    name: "Sahil Travels",
    licenseExpiry: "17-10-2025",
    matafiExpiry: "17-10-2025",
    laborExpiry: "17-10-2026",
    immigrationExpiry: "17-10-2026",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 4,
    name: "SMS",
    licenseExpiry: "17-10-2025",
    matafiExpiry: "17-10-2025",
    laborExpiry: "17-10-2025",
    immigrationExpiry: "17-10-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 5,
    name: "Unzila",
    licenseExpiry: "17-10-2025",
    matafiExpiry: "17-10-2025",
    laborExpiry: "17-10-2025",
    immigrationExpiry: "17-10-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 6,
    name: "RBuy Solutions",
    licenseExpiry: "17-10-2025",
    matafiExpiry: "17-10-2025",
    laborExpiry: "17-10-2025",
    immigrationExpiry: "17-10-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 7,
    name: "YAZDEE PRO EXPORTS",
    licenseExpiry: "22-11-2024",
    matafiExpiry: "01-02-2025",
    laborExpiry: "01-02-2024",
    immigrationExpiry: "29-03-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 8,
    name: "Manaf Exports Ltd",
    licenseExpiry: "12-02-2025",
    matafiExpiry: "28-02-2025",
    laborExpiry: "28-02-2025",
    immigrationExpiry: "22-02-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 9,
    name: "Hampton Solutions",
    licenseExpiry: "13-02-2025",
    matafiExpiry: "21-02-2025",
    laborExpiry: "20-02-2025",
    immigrationExpiry: "28-02-2025",
    eChannelExpiry: "28-02-2025",
  },
  {
    id: 10,
    name: "Matafi Express",
    licenseExpiry: "17-10-2025",
    matafiExpiry: "17-10-2025",
    laborExpiry: "17-10-2025",
    immigrationExpiry: "17-10-2025",
    eChannelExpiry: "28-02-2025",
  },
]

const initialIndividuals = [
  {
    id: 1,
    name: "Ramshad Ali",
    type: "Business Staff",
    passportExpiry: "",
    visaExpiry: "",
    visaType: "Employee VISA",
  },
  {
    id: 2,
    name: "Nizam Khazi",
    type: "Business Staff",
    passportExpiry: "17-10-2025",
    visaExpiry: "17-10-2025",
    visaType: "Employee VISA",
  },
  {
    id: 3,
    name: "Sajeer Ahmed",
    type: "Business Staff",
    passportExpiry: "17-10-2025",
    visaExpiry: "17-10-2025",
    visaType: "Employee VISA",
  },
  {
    id: 4,
    name: "Sahil Kareem",
    type: "Business Staff",
    passportExpiry: "17-10-2025",
    visaExpiry: "17-10-2025",
    visaType: "Employee VISA",
  },
  {
    id: 5,
    name: "Fatimah Zuhra",
    type: "Dependent",
    passportExpiry: "17-10-2027",
    visaExpiry: "17-10-2027",
    visaType: "Family VISA",
  },
  {
    id: 6,
    name: "Haris Aboobaker",
    type: "Business Staff",
    passportExpiry: "17-10-2025",
    visaExpiry: "17-10-2025",
    visaType: "Employee VISA",
  },
  {
    id: 7,
    name: "Kabeer Kunnummel",
    type: "Business Staff",
    passportExpiry: "01-02-2025",
    visaExpiry: "01-02-2025",
    visaType: "Employee VISA",
  },
  {
    id: 8,
    name: "Shahana Kabeer",
    type: "Dependent",
    passportExpiry: "23-02-2024",
    visaExpiry: "23-02-2024",
    visaType: "Family VISA",
  },
  {
    id: 9,
    name: "Shabeer Ahamed",
    type: "Individual",
    passportExpiry: "28-08-2025",
    visaExpiry: "28-08-2025",
    visaType: "Golden VISA",
  },
  {
    id: 10,
    name: "Haleema Abu",
    type: "Dependent",
    passportExpiry: "26-08-2024",
    visaExpiry: "26-08-2024",
    visaType: "Family VISA",
  },
]
