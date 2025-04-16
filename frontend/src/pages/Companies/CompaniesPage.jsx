"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Building2 } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card, CardContent } from "../../components/ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/Dialog"
import { Label } from "../../components/ui/Label"
import { Link } from "react-router-dom"

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
  // Add more companies as needed
]

function CompaniesPage() {
  const [companies, setCompanies] = useState(initialCompanies)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCompany = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newCompany = {
      id: companies.length + 1,
      name: formData.get("name"),
      licenseExpiry: formData.get("licenseExpiry"),
      matafiExpiry: formData.get("matafiExpiry"),
      laborExpiry: formData.get("laborExpiry"),
      immigrationExpiry: formData.get("immigrationExpiry"),
      eChannelExpiry: formData.get("eChannelExpiry"),
    }
    setCompanies([...companies, newCompany])
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:max-w-[520px]">
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#0047AB] text-black"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0047AB]" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#0047AB] hover:bg-[#0056D4] whitespace-nowrap">
                    <Building2 className="h-4 w-4 mr-2" />
                    Add Company
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddCompany} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="licenseExpiry">License Expiry</Label>
                        <Input id="licenseExpiry" name="licenseExpiry" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="matafiExpiry">Matafi Expiry</Label>
                        <Input id="matafiExpiry" name="matafiExpiry" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="laborExpiry">Labor Expiry</Label>
                        <Input id="laborExpiry" name="laborExpiry" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="immigrationExpiry">Immigration Expiry</Label>
                        <Input id="immigrationExpiry" name="immigrationExpiry" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eChannelExpiry">E Channel Expiry</Label>
                        <Input id="eChannelExpiry" name="eChannelExpiry" type="date" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Add Company
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div
              className={`${filteredCompanies.length > 10 ? "max-h-[calc(100vh-20rem)]" : ""} overflow-y-auto rounded-md border`}
            >
              <Table>
                <TableHeader className="bg-[#0047AB] text-white sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-white h-12">Company Name</TableHead>
                    <TableHead className="text-white h-12">License Expiry</TableHead>
                    <TableHead className="text-white h-12">Matafi Expiry</TableHead>
                    <TableHead className="text-white h-12">Labor Expiry</TableHead>
                    <TableHead className="text-white h-12">Immigration Expiry</TableHead>
                    <TableHead className="text-white h-12">E Channel Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No companies found. Try adjusting your search or add a new company.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCompanies.map((company, index) => (
                      <TableRow
                        key={company.id}
                        className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                        onClick={() => navigate(`/companies/${company.id}`)}
                      >
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.licenseExpiry}</TableCell>
                        <TableCell>{company.matafiExpiry}</TableCell>
                        <TableCell>{company.laborExpiry}</TableCell>
                        <TableCell>{company.immigrationExpiry}</TableCell>
                        <TableCell>{company.eChannelExpiry}</TableCell>
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

export default CompaniesPage
