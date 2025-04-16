"\"use client"

import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { CreditCard, Plus, Search, Filter, Building2, User } from "lucide-react"

function BankAccountsPage() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchAccounts = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockAccounts = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            accountName: `Account ${i + 1}`,
            accountNumber: `****${1000 + i}`,
            bankName: ["Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One"][i % 5],
            accountType: i % 3 === 0 ? "Checking" : i % 3 === 1 ? "Savings" : "Business",
            owner: i % 2 === 0 ? `Company ${(i % 5) + 1}` : `Individual ${(i % 5) + 1}`,
            ownerType: i % 2 === 0 ? "Company" : "Individual",
            status: i % 4 === 0 ? "Primary" : i % 4 === 1 ? "Secondary" : i % 4 === 2 ? "Inactive" : "Pending",
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setAccounts(mockAccounts)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching accounts:", error)
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm) ||
      account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Bank Accounts</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Bank Account
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bank accounts..."
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
                    <Table.Head>Account</Table.Head>
                    <Table.Head>Bank</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Owner</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Created</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredAccounts.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                        No bank accounts found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredAccounts.map((account) => (
                      <Table.Row key={account.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{account.accountName}</p>
                              <p className="text-sm text-gray-500">{account.accountNumber}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{account.bankName}</Table.Cell>
                        <Table.Cell>{account.accountType}</Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            {account.ownerType === "Company" ? (
                              <Building2 className="h-4 w-4 text-gray-500" />
                            ) : (
                              <User className="h-4 w-4 text-gray-500" />
                            )}
                            <span>{account.owner}</span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              account.status === "Primary"
                                ? "bg-green-100 text-green-800"
                                : account.status === "Secondary"
                                  ? "bg-blue-100 text-blue-800"
                                  : account.status === "Inactive"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {account.status}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{new Date(account.createdAt).toLocaleDateString()}</Table.Cell>
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

export default BankAccountsPage
