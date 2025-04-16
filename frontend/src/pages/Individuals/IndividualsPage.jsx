"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/Dialog"
import { Label } from "../../components/ui/Label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table"
import { Plus, Search, User, Calendar, FileText } from "lucide-react"
import { Link } from "react-router-dom"

function IndividualsPage() {
  const navigate = useNavigate()
  const initialIndividuals = [
    {
      id: 1,
      firstName: "Hashim",
      lastName: "Amla",
      email: "Hashim@amla.com",
      phone: "9252979517",
      type: "Employee",
      passportExpiry: "11-04-2025",
      visaExpiry: "11-04-2025",
      visaType: "Employee Visa",
      status: "Active",
    },
    {
      id: 2,
      firstName: "Muhammed",
      lastName: "Kaif",
      email: "kaif@amla.com",
      phone: "9252979517",
      type: "Employee",
      passportExpiry: "11-04-2025",
      visaExpiry: "11-04-2025",
      visaType: "Visitor",
      status: "Pending",
    },
    {
      id: 3,
      firstName: "Ahmed",
      lastName: "Siraj",
      email: "siraj@amla.com",
      phone: "9252979517",
      type: "Employee",
      passportExpiry: "11-04-2025",
      visaExpiry: "11-04-2025",
      visaType: "Golden Visa",
      status: "Active",
    },
  ]

  const [individuals, setIndividuals] = useState(initialIndividuals)
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

  const handleAddIndividual = (event) => {
    if (event) {
      event.preventDefault()
    }

    const newId = individuals.length > 0 ? Math.max(...individuals.map((ind) => ind.id)) + 1 : 1
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
      individual.id.toString().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:max-w-[520px]">
                <Input
                  placeholder="Search individuals..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 border-[#0047AB] text-black"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0047AB]" />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0047AB] hover:bg-[#0056D4] whitespace-nowrap">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Individual
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Individual</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddIndividual} className="space-y-4">
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
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newIndividual.email}
                        onChange={handleInputChange}
                      />
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
                        <option value="Employee Visa">Employee Visa</option>
                        <option value="Visitor">Visitor</option>
                        <option value="Golden Visa">Golden Visa</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full">
                      Add Individual
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div
              className={`${filteredIndividuals.length > 10 ? "max-h-[calc(100vh-20rem)]" : ""} overflow-y-auto rounded-md border`}
            >
              <Table>
                <TableHeader className="bg-[#0047AB] text-white sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-white h-12">Name</TableHead>
                    <TableHead className="text-white h-12">Type</TableHead>
                    <TableHead className="text-white h-12">Passport Expiry</TableHead>
                    <TableHead className="text-white h-12">VISA Expiry</TableHead>
                    <TableHead className="text-white h-12">VISA Type</TableHead>
                    <TableHead className="text-white h-12">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIndividuals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No individuals found. Try adjusting your search or add a new individual.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredIndividuals.map((individual, index) => (
                      <TableRow
                        key={individual.id}
                        className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                        onClick={() => navigate(`/individuals/${individual.id}`)}
                      >
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{individual.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span>{individual.passportExpiry}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span>{individual.visaExpiry}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-gray-500" />
                            <span>{individual.visaType}</span>
                          </div>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-white border-t py-6 px-4 sm:px-6 md:px-8 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} FixDocs. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-[#047758]">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#047758]">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-[#047758]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default IndividualsPage
