"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { Link } from "react-router-dom"
import { FileSpreadsheet, Plus, Search, Filter } from "lucide-react"

function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchInvoices = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockInvoices = Array.from({ length: 10 }, (_, i) => ({
            id: `INV-${1000 + i}`,
            client: `Client ${i + 1}`,
            amount: (Math.random() * 10000).toFixed(2),
            status: i % 4 === 0 ? "Paid" : i % 4 === 1 ? "Pending" : i % 4 === 2 ? "Overdue" : "Draft",
            dueDate: new Date(Date.now() + i * 86400000).toISOString(),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setInvoices(mockInvoices)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching invoices:", error)
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search invoices..."
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
                  <Table.Head>Invoice #</Table.Head>
                  <Table.Head>Client</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Due Date</Table.Head>
                  <Table.Head>Created</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredInvoices.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                      No invoices found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <Table.Row key={invoice.id}>
                      <Table.Cell>
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="flex items-center gap-2 text-[#0047AB] hover:underline"
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                          {invoice.id}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{invoice.client}</Table.Cell>
                      <Table.Cell>${invoice.amount}</Table.Cell>
                      <Table.Cell>
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
                      </Table.Cell>
                      <Table.Cell>{new Date(invoice.dueDate).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{new Date(invoice.createdAt).toLocaleDateString()}</Table.Cell>
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

export default InvoicesPage
