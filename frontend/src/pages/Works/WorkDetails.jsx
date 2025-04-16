"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Tabs } from "../../components/ui/Tabs"
import {
  ArrowLeft,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  PenToolIcon as Tool,
} from "lucide-react"

function WorkDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [work, setWork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    // Simulate API fetch
    const fetchWork = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const workNumber = id
          const mockWork = {
            id: workNumber,
            client: `Client ${(Number.parseInt(workNumber.replace("WRK-", "")) % 10) + 1}`,
            clientAddress: "123 Client St, Suite 101, New York, NY 10001",
            clientEmail: `client${(Number.parseInt(workNumber.replace("WRK-", "")) % 10) + 1}@example.com`,
            clientPhone: `(555) 123-${4567 + (Number.parseInt(workNumber.replace("WRK-", "")) % 10)}`,
            description: `Work order for service ${(Number.parseInt(workNumber.replace("WRK-", "")) % 10) + 1}`,
            status:
              Number.parseInt(workNumber.replace("WRK-", "")) % 4 === 0
                ? "Completed"
                : Number.parseInt(workNumber.replace("WRK-", "")) % 4 === 1
                  ? "In Progress"
                  : Number.parseInt(workNumber.replace("WRK-", "")) % 4 === 2
                    ? "Scheduled"
                    : "On Hold",
            assignedTo: `Technician ${(Number.parseInt(workNumber.replace("WRK-", "")) % 5) + 1}`,
            priority:
              Number.parseInt(workNumber.replace("WRK-", "")) % 3 === 0
                ? "High"
                : Number.parseInt(workNumber.replace("WRK-", "")) % 3 === 1
                  ? "Medium"
                  : "Low",
            startDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
            dueDate: new Date(Date.now() + Number.parseInt(workNumber.replace("WRK-", "")) * 86400000).toISOString(),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            notes: "Customer requested service to be performed during business hours only.",
            tasks: [
              { id: 1, description: "Initial inspection", completed: true },
              {
                id: 2,
                description: "Replace faulty parts",
                completed: Number.parseInt(workNumber.replace("WRK-", "")) % 2 === 0,
              },
              { id: 3, description: "Test functionality", completed: false },
              { id: 4, description: "Final inspection", completed: false },
            ],
            materials: [
              { id: 1, name: "Replacement part A", quantity: 2, cost: 45.0 },
              { id: 2, name: "Replacement part B", quantity: 1, cost: 75.0 },
              { id: 3, name: "Consumables", quantity: 1, cost: 25.0 },
            ],
            timeEntries: [
              {
                id: 1,
                technician: `Technician ${(Number.parseInt(workNumber.replace("WRK-", "")) % 5) + 1}`,
                date: new Date(Date.now() - 86400000).toISOString(),
                hours: 2.5,
                description: "Initial inspection and diagnosis",
              },
              {
                id: 2,
                technician: `Technician ${(Number.parseInt(workNumber.replace("WRK-", "")) % 5) + 1}`,
                date: new Date().toISOString(),
                hours: 3.0,
                description: "Repair work",
              },
            ],
          }
          setWork(mockWork)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching work:", error)
        setLoading(false)
      }
    }

    fetchWork()
  }, [id])

  const tabs = [
    { id: "details", label: "Details", icon: <FileText className="h-4 w-4" /> },
    { id: "tasks", label: "Tasks", icon: <CheckCircle className="h-4 w-4" /> },
    { id: "materials", label: "Materials", icon: <Tool className="h-4 w-4" /> },
    { id: "time", label: "Time Entries", icon: <Clock className="h-4 w-4" /> },
    { id: "notes", label: "Notes", icon: <MessageSquare className="h-4 w-4" /> },
  ]

  const renderTabContent = () => {
    if (loading || !work) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0047AB]"></div>
        </div>
      )
    }

    switch (activeTab) {
      case "details":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Work Order Details</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Work Order Number:</p>
                  <p className="text-sm font-medium">{work.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Description:</p>
                  <p className="text-sm font-medium">{work.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Status:</p>
                  <p className="text-sm">
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
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Assigned To:</p>
                  <p className="text-sm font-medium">{work.assignedTo}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Priority:</p>
                  <p className="text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        work.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : work.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {work.priority}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Start Date:</p>
                  <p className="text-sm font-medium">{new Date(work.startDate).toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Due Date:</p>
                  <p className="text-sm font-medium">{new Date(work.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Created:</p>
                  <p className="text-sm font-medium">{new Date(work.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Client Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Client:</p>
                  <p className="text-sm font-medium">{work.client}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Address:</p>
                  <p className="text-sm font-medium">{work.clientAddress}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Email:</p>
                  <p className="text-sm font-medium">{work.clientEmail}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-500">Phone:</p>
                  <p className="text-sm font-medium">{work.clientPhone}</p>
                </div>
              </div>
            </Card>
          </div>
        )
      case "tasks":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Tasks</h3>
            <div className="space-y-4">
              {work.tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div
                    className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center ${
                      task.completed ? "bg-green-100 border-green-500" : "bg-white border-gray-300"
                    }`}
                  >
                    {task.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                  <div>
                    <p className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
              <Button className="mt-2">Add Task</Button>
            </div>
          </Card>
        )
      case "materials":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Materials</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-sm">Item</th>
                    <th className="text-right py-2 font-medium text-sm">Quantity</th>
                    <th className="text-right py-2 font-medium text-sm">Cost</th>
                    <th className="text-right py-2 font-medium text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {work.materials.map((material) => (
                    <tr key={material.id} className="border-b">
                      <td className="py-3 text-sm">{material.name}</td>
                      <td className="py-3 text-sm text-right">{material.quantity}</td>
                      <td className="py-3 text-sm text-right">${material.cost.toFixed(2)}</td>
                      <td className="py-3 text-sm text-right">${(material.quantity * material.cost).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="py-3 text-right font-medium">
                      Total:
                    </td>
                    <td className="py-3 text-right font-bold">
                      $
                      {work.materials
                        .reduce((total, material) => total + material.quantity * material.cost, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <Button className="mt-4">Add Material</Button>
          </Card>
        )
      case "time":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Time Entries</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-sm">Technician</th>
                    <th className="text-left py-2 font-medium text-sm">Date</th>
                    <th className="text-right py-2 font-medium text-sm">Hours</th>
                    <th className="text-left py-2 font-medium text-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {work.timeEntries.map((entry) => (
                    <tr key={entry.id} className="border-b">
                      <td className="py-3 text-sm">{entry.technician}</td>
                      <td className="py-3 text-sm">{new Date(entry.date).toLocaleDateString()}</td>
                      <td className="py-3 text-sm text-right">{entry.hours.toFixed(1)}</td>
                      <td className="py-3 text-sm">{entry.description}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} className="py-3 text-right font-medium">
                      Total Hours:
                    </td>
                    <td className="py-3 text-right font-bold">
                      {work.timeEntries.reduce((total, entry) => total + entry.hours, 0).toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <Button className="mt-4">Add Time Entry</Button>
          </Card>
        )
      case "notes":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Notes</h3>
            <p className="text-sm text-gray-600 mb-4">{work.notes}</p>
            <Button>Add Note</Button>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/works")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{loading ? "Loading..." : `Work Order ${work?.id}`}</h1>
            {!loading && work?.status && (
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
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
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
    </Layout>
  )
}

export default WorkDetails
