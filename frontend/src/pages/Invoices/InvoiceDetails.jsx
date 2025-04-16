"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { ArrowLeft, Download, Send, Edit, Trash, Printer } from "lucide-react"

function InvoiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchInvoice = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const invoiceNumber = id
          const mockInvoice = {
            id: invoiceNumber,
            client: `Client ${(Number.parseInt(invoiceNumber.replace("INV-", "")) % 10) + 1}`,
            clientAddress: "123 Client St, Suite 101, New York, NY 10001",
            clientEmail: `client${(Number.parseInt(invoiceNumber.replace("INV-", "")) % 10) + 1}@example.com`,
            amount: (Math.random() * 10000).toFixed(2),
            status:
              Number.parseInt(invoiceNumber.replace("INV-", "")) % 4 === 0
                ? "Paid"
                : Number.parseInt(invoiceNumber.replace("INV-", "")) % 4 === 1
                  ? "Pending"
                  : Number.parseInt(invoiceNumber.replace("INV-", "")) % 4 === 2
                    ? "Overdue"
                    : "Draft",
            dueDate: new Date(Date.now() + Number.parseInt(invoiceNumber.replace("INV-", "")) * 86400000).toISOString(),
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
            notes: "Payment due within 30 days. Please make checks payable to Your Company Name.",
          }
          setInvoice(mockInvoice)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching invoice:", error)
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [id])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/invoices")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{loading ? "Loading..." : `Invoice ${invoice?.id}`}</h1>
            {!loading && invoice?.status && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  invoice.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : invoice.status === "Overdue"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {invoice.status}
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
                  <h3 className="text-lg font-medium mb-4">Invoice Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Invoice Number:</p>
                      <p className="text-sm font-medium">{invoice.id}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Date Created:</p>
                      <p className="text-sm font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Due Date:</p>
                      <p className="text-sm font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Status:</p>
                      <p className="text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : invoice.status === "Overdue"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {invoice.status}
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
                      <p className="text-sm font-medium">{invoice.client}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Address:</p>
                      <p className="text-sm font-medium">{invoice.clientAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-500">Email:</p>
                      <p className="text-sm font-medium">{invoice.clientEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Invoice Items</h3>
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
                    {invoice.items.map((item) => (
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
                  <p className="text-sm font-medium">${invoice.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Tax (10%):</p>
                  <p className="text-sm font-medium">${invoice.tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <p className="text-base font-medium">Total:</p>
                  <p className="text-base font-bold">${invoice.total.toFixed(2)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Notes</h3>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default InvoiceDetails
