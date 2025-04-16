"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Bell, Search, Filter, CheckCircle, X } from "lucide-react"

function AlertsPage() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchAlerts = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockAlerts = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            title: `Alert ${i + 1}`,
            description: `This is a description for alert ${i + 1}`,
            type: i % 3 === 0 ? "Warning" : i % 3 === 1 ? "Info" : "Critical",
            status: i % 2 === 0 ? "Active" : "Resolved",
            entity: i % 4 === 0 ? "Invoice" : i % 4 === 1 ? "Estimate" : i % 4 === 2 ? "Work Order" : "Client",
            entityId: `${i % 4 === 0 ? "INV" : i % 4 === 1 ? "EST" : i % 4 === 2 ? "WRK" : "CLT"}-${1000 + i}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setAlerts(mockAlerts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching alerts:", error)
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.entityId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleResolveAlert = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "Resolved" } : alert)))
  }

  const handleDismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Configure Alerts
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search alerts..."
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
                  <Table.Head>Alert</Table.Head>
                  <Table.Head>Type</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Entity</Table.Head>
                  <Table.Head>Created</Table.Head>
                  <Table.Head>Actions</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredAlerts.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                      No alerts found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredAlerts.map((alert) => (
                    <Table.Row key={alert.id}>
                      <Table.Cell>
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-gray-500">{alert.description}</p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.type === "Warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : alert.type === "Info"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {alert.type}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.status === "Active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-1">
                          <span>{alert.entity}</span>
                          <span className="text-[#0047AB]">{alert.entityId}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{new Date(alert.createdAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          {alert.status === "Active" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDismissAlert(alert.id)}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </Table.Cell>
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

export default AlertsPage
