"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Tabs } from "../../components/ui/Tabs"
import { Building2, Users, Truck, CreditCard, FileText, ArrowLeft, Edit, Trash } from "lucide-react"

function CompanyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate API fetch
    const fetchCompany = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockCompany = {
            id,
            name: `Company ${id}`,
            type: Number.parseInt(id) % 2 === 0 ? "Corporation" : "LLC",
            status: Number.parseInt(id) % 3 === 0 ? "Active" : Number.parseInt(id) % 3 === 1 ? "Pending" : "Inactive",
            employees: Math.floor(Math.random() * 100) + 1,
            address: "123 Business St, Suite 101",
            city: "New York",
            state: "NY",
            zip: "10001",
            phone: "(555) 123-4567",
            email: `info@company${id}.com`,
            website: `www.company${id}.com`,
            taxId: `12-345${id}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }
          setCompany(mockCompany)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching company:", error)
        setLoading(false)
      }
    }

    fetchCompany()
  }, [id])

  const tabs = [
    { id: "overview", label: "Overview", icon: <Building2 className="h-4 w-4" /> },
    { id: "staff", label: "Staff", icon: <Users className="h-4 w-4" /> },
    { id: "vehicles", label: "Vehicles", icon: <Truck className="h-4 w-4" /> },
    { id: "partners", label: "Partners", icon: <Users className="h-4 w-4" /> },
    { id: "bank-accounts", label: "Bank Accounts", icon: <CreditCard className="h-4 w-4" /> },
    { id: "documents", label: "Documents", icon: <FileText className="h-4 w-4" /> },
  ]

  const renderTabContent = () => {
    if (loading || !company) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0047AB]"></div>
        </div>
      )
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Company Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Name:</p>
                  <p className="text-sm font-medium">{company.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Type:</p>
                  <p className="text-sm font-medium">{company.type}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Status:</p>
                  <p className="text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : company.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {company.status}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Employees:</p>
                  <p className="text-sm font-medium">{company.employees}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Tax ID:</p>
                  <p className="text-sm font-medium">{company.taxId}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Created:</p>
                  <p className="text-sm font-medium">{new Date(company.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm font-medium">{company.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">City:</p>
                  <p className="text-sm font-medium">{company.city}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">State:</p>
                  <p className="text-sm font-medium">{company.state}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">ZIP:</p>
                  <p className="text-sm font-medium">{company.zip}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Phone:</p>
                  <p className="text-sm font-medium">{company.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Email:</p>
                  <p className="text-sm font-medium">{company.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Website:</p>
                  <p className="text-sm font-medium">{company.website}</p>
                </div>
              </div>
            </Card>
          </div>
        )
      case "staff":
        return (
          <div className="text-center py-8">
            <p>Staff information will be displayed here.</p>
            <p className="text-sm text-gray-500 mt-2">Navigate to the dedicated staff page for more details.</p>
            <Button className="mt-4" onClick={() => navigate(`/companies/${id}/staff`)}>
              View Staff
            </Button>
          </div>
        )
      case "vehicles":
        return (
          <div className="text-center py-8">
            <p>Vehicles information will be displayed here.</p>
            <p className="text-sm text-gray-500 mt-2">Navigate to the dedicated vehicles page for more details.</p>
            <Button className="mt-4" onClick={() => navigate(`/companies/${id}/vehicles`)}>
              View Vehicles
            </Button>
          </div>
        )
      case "partners":
        return (
          <div className="text-center py-8">
            <p>Partners information will be displayed here.</p>
            <p className="text-sm text-gray-500 mt-2">Navigate to the dedicated partners page for more details.</p>
            <Button className="mt-4" onClick={() => navigate(`/companies/${id}/partners`)}>
              View Partners
            </Button>
          </div>
        )
      case "bank-accounts":
        return (
          <div className="text-center py-8">
            <p>Bank accounts information will be displayed here.</p>
            <p className="text-sm text-gray-500 mt-2">Navigate to the dedicated bank accounts page for more details.</p>
            <Button className="mt-4" onClick={() => navigate(`/companies/${id}/bank-accounts`)}>
              View Bank Accounts
            </Button>
          </div>
        )
      case "documents":
        return (
          <div className="text-center py-8">
            <p>Documents will be displayed here.</p>
            <p className="text-sm text-gray-500 mt-2">Upload and manage company documents.</p>
            <Button className="mt-4">Upload Document</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/companies")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{loading ? "Loading..." : company?.name}</h1>
          {!loading && company?.status && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                company.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : company.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {company.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="w-full border-b">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-b-2 border-[#0047AB] text-[#0047AB]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={activeTab} className="pt-6">
          {renderTabContent()}
        </Tabs.Content>
      </Tabs>
    </div>
  )
}

export default CompanyDetails
