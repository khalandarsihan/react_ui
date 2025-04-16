"use client"

import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Plus, Search, Filter, Mail, Phone, Building2, User } from "lucide-react"

function PartnersContactsPage() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchPartners = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockPartners = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: i % 2 === 0 ? `Partner Company ${i + 1}` : `Partner Contact ${i + 1}`,
            type: i % 2 === 0 ? "Company" : "Individual",
            role: i % 4 === 0 ? "Supplier" : i % 4 === 1 ? "Contractor" : i % 4 === 2 ? "Consultant" : "Partner",
            email: `partner${i + 1}@example.com`,
            phone: `(555) 123-${4567 + i}`,
            status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive",
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setPartners(mockPartners)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching partners:", error)
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Partners & Contacts</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search partners and contacts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0047AB]"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Role</Table.Head>
                    <Table.Head>Contact</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Created</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredPartners.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                        No partners or contacts found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredPartners.map((partner) => (
                      <Table.Row key={partner.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#0047AB] text-white flex items-center justify-center">
                              {partner.type === "Company" ? (
                                <Building2 className="h-5 w-5" />
                              ) : (
                                <User className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{partner.name}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{partner.type}</Table.Cell>
                        <Table.Cell>{partner.role}</Table.Cell>
                        <Table.Cell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-gray-500" />
                              <span>{partner.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-gray-500" />
                              <span>{partner.phone}</span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              partner.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : partner.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {partner.status}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{new Date(partner.createdAt).toLocaleDateString()}</Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  )
}

export default PartnersContactsPage
