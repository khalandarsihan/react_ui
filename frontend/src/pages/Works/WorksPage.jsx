"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Link } from "react-router-dom"
import { Wrench, Plus, Search, Filter } from "lucide-react"

function WorksPage() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchWorks = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockWorks = Array.from({ length: 10 }, (_, i) => ({
            id: `WRK-${3000 + i}`,
            client: `Client ${i + 1}`,
            description: `Work order for service ${i + 1}`,
            status: i % 4 === 0 ? "Completed" : i % 4 === 1 ? "In Progress" : i % 4 === 2 ? "Scheduled" : "On Hold",
            assignedTo: `Technician ${(i % 5) + 1}`,
            dueDate: new Date(Date.now() + i * 86400000).toISOString(),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setWorks(mockWorks)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching works:", error)
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const filteredWorks = works.filter(
    (work) =>
      work.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Work Orders</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Work Order
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search work orders..."
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
                  <Table.Head>Work Order #</Table.Head>
                  <Table.Head>Client</Table.Head>
                  <Table.Head>Description</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Assigned To</Table.Head>
                  <Table.Head>Due Date</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredWorks.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                      No work orders found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredWorks.map((work) => (
                    <Table.Row key={work.id}>
                      <Table.Cell>
                        <Link
                          to={`/works/${work.id}`}
                          className="flex items-center gap-2 text-[#0047AB] hover:underline"
                        >
                          <Wrench className="h-4 w-4" />
                          {work.id}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{work.client}</Table.Cell>
                      <Table.Cell>{work.description}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            work.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : work.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : work.status === "Scheduled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {work.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{work.assignedTo}</Table.Cell>
                      <Table.Cell>{new Date(work.dueDate).toLocaleDateString()}</Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default WorksPage
