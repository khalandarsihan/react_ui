"use client"

import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Plus, Search, Filter, Mail, Phone } from "lucide-react"

function StaffPage() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchStaff = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockStaff = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `Employee ${i + 1}`,
            position:
              i % 4 === 0
                ? "Manager"
                : i % 4 === 1
                  ? "Technician"
                  : i % 4 === 2
                    ? "Administrator"
                    : "Sales Representative",
            department: i % 3 === 0 ? "Operations" : i % 3 === 1 ? "Sales" : "Administration",
            email: `employee${i + 1}@example.com`,
            phone: `(555) 123-${4567 + i}`,
            status: i % 5 === 0 ? "On Leave" : "Active",
            hireDate: new Date(Date.now() - Math.floor(Math.random() * 100000000000)).toISOString(),
          }))
          setStaff(mockStaff)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching staff:", error)
        setLoading(false)
      }
    }

    fetchStaff()
  }, [])

  const filteredStaff = staff.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Staff</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search staff..."
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
                    <Table.Head>Position</Table.Head>
                    <Table.Head>Department</Table.Head>
                    <Table.Head>Contact</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Hire Date</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredStaff.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                        No staff found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredStaff.map((employee) => (
                      <Table.Row key={employee.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#0047AB] text-white flex items-center justify-center">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{employee.position}</Table.Cell>
                        <Table.Cell>{employee.department}</Table.Cell>
                        <Table.Cell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-gray-500" />
                              <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-gray-500" />
                              <span>{employee.phone}</span>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              employee.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{new Date(employee.hireDate).toLocaleDateString()}</Table.Cell>
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

export default StaffPage
