"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { ArrowLeft, Download, Send, Edit, Trash, Printer, CheckCircle } from "lucide-react"

function EstimateDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [estimate, setEstimate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchEstimate = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const estimateNumber = id
          const mockEstimate = {
            id: estimateNumber,
            client: `Client ${(Number.parseInt(estimateNumber.replace("EST-", "")) % 10) + 1}`,
            clientAddress: "123 Client St, Suite 101, New York, NY 10001",
            clientEmail: `client${(Number.parseInt(estimateNumber.replace("EST-", "")) % 10) + 1}@example.com`,
            amount: (Math.random() * 10000).toFixed(2),
            status:
              Number.parseInt(estimateNumber.replace("EST-", "")) % 3 === 0
                ? "Approved"
                : Number.parseInt(estimateNumber.replace("EST-", "")) % 3 === 1
                  ? "Pending"
                  : "Rejected",
            expiryDate: new Date(
              Date.now() + Number.parseInt(estimateNumber.replace("EST-", "")) * 86400000,
            ).toISOString(),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            items: [
              {
                id: 1,
                description: "Service 1",
                quantity: 2,
                unitPrice: 150.0,
                total: 300.0,
              },
              {
                id: 2,
                description: "Service 2",
                quantity: 1,
                unitPrice: 250.0,
                total: 250.0,
              },
              {
                id: 3,
                description: "Materials",
                quantity: 5,
                unitPrice: 45.0,
                total: 225.0,
              },
            ],
            subtotal: 775.0,
            tax: 77.5,
            total: 852.5,
            notes: "This estimate is valid for 30 days from the date of issue.",
          }
          setEstimate(mockEstimate)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching estimate:", error)
        setLoading(false)
      }
    }

    fetchEstimate()
  }, [id])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/estimates")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{loading ? "Loading..." : `Estimate ${estimate?.id}`}</h1>
            {!loading && estimate?.status && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  estimate.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : estimate.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {estimate.status}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Send className="h-4 w-4" />
              Send
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Convert to Invoice
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

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0047AB]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Estimate Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Estimate Number:</p>
                      <p className="text-sm font-medium">{estimate.id}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Date Created:</p>
                      <p className="text-sm font-medium">{new Date(estimate.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Expiry Date:</p>
                      <p className="text-sm font-medium">{new Date(estimate.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Status:</p>
                      <p className="text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            estimate.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : estimate.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {estimate.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Client Information</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Client:</p>
                      <p className="text-sm font-medium">{estimate.client}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Address:</p>
                      <p className="text-sm font-medium">{estimate.clientAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Email:</p>
                      <p className="text-sm font-medium">{estimate.clientEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Estimate Items</h3>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>Description</Table.Head>
                      <Table.Head className="text-right">Quantity</Table.Head>
                      <Table.Head className="text-right">Unit Price</Table.Head>
                      <Table.Head className="text-right">Total</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {estimate.items.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell className="text-right">{item.quantity}</Table.Cell>
                        <Table.Cell className="text-right">${item.unitPrice.toFixed(2)}</Table.Cell>
                        <Table.Cell className="text-right">${item.total.toFixed(2)}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Subtotal:</p>
                  <p className="text-sm font-medium">${estimate.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Tax (10%):</p>
                  <p className="text-sm font-medium">${estimate.tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="text-base font-medium">Total:</p>
                  <p className="text-base font-bold">${estimate.total.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Notes</h3>
              <p className="text-sm text-gray-600">{estimate.notes}</p>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default EstimateDetails
