"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Dialog } from "../../components/ui/Dialog"
import { Label } from "../../components/ui/Label"
import { Plus, Search, User, Calendar, FileText } from "lucide-react"

function IndividualsPage() {
  const navigate = useNavigate()
  const [individuals, setIndividuals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newIndividual, setNewIndividual] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "Employee",
    passportExpiry: "",
    visaExpiry: "",
    visaType: "",
  })

  useEffect(() => {
    // Simulate API fetch
    const fetchIndividuals = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockIndividuals = Array.from({ length: 20 }, (_, i) => ({
            id: `IND-${1000 + i}`,
            firstName: `John${i}`,
            lastName: `Doe${i}`,
            email: `john.doe${i}@example.com`,
            phone: `(555) 123-${4567 + i}`,
            type: i % 3 === 0 ? "Employee" : i % 3 === 1 ? "Dependent" : "Contractor",
            passportExpiry: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            visaExpiry: new Date(Date.now() + (i + 2) * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            visaType: i % 4 === 0 ? "Work" : i % 4 === 1 ? "Tourist" : i % 4 === 2 ? "Student" : "Business",
            status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Inactive",
          }))
          setIndividuals(mockIndividuals)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching individuals:", error)
        setLoading(false)
      }
    }

    fetchIndividuals()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewIndividual((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddIndividual = () => {
    // In a real app, this would be an API call
    const newId = `IND-${1000 + individuals.length}`
    const individualToAdd = {
      id: newId,
      ...newIndividual,
      status: "Active",
    }
    setIndividuals((prev) => [individualToAdd, ...prev])
    setIsAddDialogOpen(false)
    setNewIndividual({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      type: "Employee",
      passportExpiry: "",
      visaExpiry: "",
      visaType: "",
    })
  }

  const filteredIndividuals = individuals.filter(
    (individual) =>
      individual.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Individuals</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search individuals..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-1" /> Add Individual
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passport Expiry
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VISA Expiry
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    VISA Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#0047AB]"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredIndividuals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No individuals found
                    </td>
                  </tr>
                ) : (
                  filteredIndividuals.map((individual) => (
                    <tr
                      key={individual.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/individuals/${individual.id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {individual.firstName} {individual.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{individual.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{individual.type}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span>{individual.passportExpiry}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span>{individual.visaExpiry}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-gray-500" />
                          <span>{individual.visaType}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            individual.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : individual.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {individual.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Add Individual</Dialog.Title>
            <Dialog.Description>Enter the details of the new individual.</Dialog.Description>
          </Dialog.Header>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newIndividual.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newIndividual.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={newIndividual.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={newIndividual.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                className="w-full rounded-md border border-gray-300 p-2"
                value={newIndividual.type}
                onChange={handleInputChange}
              >
                <option value="Employee">Employee</option>
                <option value="Dependent">Dependent</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Passport Expiry</Label>
                <Input
                  id="passportExpiry"
                  name="passportExpiry"
                  type="date"
                  value={newIndividual.passportExpiry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visaExpiry">VISA Expiry</Label>
                <Input
                  id="visaExpiry"
                  name="visaExpiry"
                  type="date"
                  value={newIndividual.visaExpiry}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaType">VISA Type</Label>
              <select
                id="visaType"
                name="visaType"
                className="w-full rounded-md border border-gray-300 p-2"
                value={newIndividual.visaType}
                onChange={handleInputChange}
              >
                <option value="Work">Work</option>
                <option value="Tourist">Tourist</option>
                <option value="Student">Student</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIndividual}>Add Individual</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </Layout>
  )
}

export default IndividualsPage
