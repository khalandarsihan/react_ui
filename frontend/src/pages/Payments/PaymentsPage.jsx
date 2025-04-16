"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { CreditCard, Plus, Search, Filter, FileText, ArrowDown, ArrowUp } from "lucide-react"

function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchPayments = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockPayments = Array.from({ length: 10 }, (_, i) => ({
            id: `PMT-${5000 + i}`,
            invoiceId: `INV-${1000 + i}`,
            client: `Client ${i + 1}`,
            amount: (Math.random() * 5000).toFixed(2),
            method: i % 4 === 0 ? "Credit Card" : i % 4 === 1 ? "Bank Transfer" : i % 4 === 2 ? "Check" : "Cash",
            status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Failed",
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setPayments(mockPayments)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching payments:", error)
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Received</p>
              <h3 className="text-2xl font-bold mt-1">$24,850.00</h3>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                12% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <ArrowDown className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <h3 className="text-2xl font-bold mt-1">$5,240.00</h3>
              <p className="text-sm text-yellow-600 mt-1 flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                3% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Failed</p>
              <h3 className="text-2xl font-bold mt-1">$1,120.00</h3>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                5% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
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
                  <Table.Head>Payment ID</Table.Head>
                  <Table.Head>Invoice</Table.Head>
                  <Table.Head>Client</Table.Head>
                  <Table.Head>Amount</Table.Head>
                  <Table.Head>Method</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head>Date</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredPayments.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={7} className="text-center py-8 text-gray-500">
                      No payments found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredPayments.map((payment) => (
                    <Table.Row key={payment.id}>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          {payment.id}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <a href={`/invoices/${payment.invoiceId}`} className="text-[#0047AB] hover:underline">
                          {payment.invoiceId}
                        </a>
                      </Table.Cell>
                      <Table.Cell>{payment.client}</Table.Cell>
                      <Table.Cell>${payment.amount}</Table.Cell>
                      <Table.Cell>{payment.method}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{new Date(payment.date).toLocaleDateString()}</Table.Cell>
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

export default PaymentsPage
