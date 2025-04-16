"use client"

import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Truck, Plus, Search, Filter } from "lucide-react"

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchVehicles = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockVehicles = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            make: ["Toyota", "Ford", "Honda", "Chevrolet", "Nissan"][i % 5],
            model: `Model ${i + 1}`,
            year: 2015 + (i % 8),
            licensePlate: `ABC-${1234 + i}`,
            vin: `VIN${100000 + i}`,
            owner: i % 2 === 0 ? `Company ${(i % 5) + 1}` : `Individual ${(i % 5) + 1}`,
            ownerType: i % 2 === 0 ? "Company" : "Individual",
            status: i % 4 === 0 ? "Maintenance" : i % 4 === 1 ? "In Use" : i % 4 === 2 ? "Available" : "Out of Service",
            lastService: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setVehicles(mockVehicles)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching vehicles:", error)
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.year.toString().includes(searchTerm),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Vehicles</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vehicles..."
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
                    <Table.Head>Vehicle</Table.Head>
                    <Table.Head>License Plate</Table.Head>
                    <Table.Head>VIN</Table.Head>
                    <Table.Head>Owner</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Last Service</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredVehicles.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                        No vehicles found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredVehicles.map((vehicle) => (
                      <Table.Row key={vehicle.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <Truck className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {vehicle.make} {vehicle.model}
                              </p>
                              <p className="text-sm text-gray-500">{vehicle.year}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{vehicle.licensePlate}</Table.Cell>
                        <Table.Cell>{vehicle.vin}</Table.Cell>
                        <Table.Cell>
                          <div>
                            <p>{vehicle.owner}</p>
                            <p className="text-xs text-gray-500">{vehicle.ownerType}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              vehicle.status === "Available"
                                ? "bg-green-100 text-green-800"
                                : vehicle.status === "In Use"
                                  ? "bg-blue-100 text-blue-800"
                                  : vehicle.status === "Maintenance"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vehicle.status}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{new Date(vehicle.lastService).toLocaleDateString()}</Table.Cell>
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

export default VehiclesPage
