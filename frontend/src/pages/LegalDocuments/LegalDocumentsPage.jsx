"use client"

import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Table } from "../../components/ui/Table"
import { FileText, Plus, Search, Filter, Download, Eye } from "lucide-react"

function LegalDocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API fetch
    const fetchDocuments = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const mockDocuments = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            title: `Legal Document ${i + 1}`,
            type: i % 4 === 0 ? "Contract" : i % 4 === 1 ? "Agreement" : i % 4 === 2 ? "Policy" : "Certificate",
            entity: i % 3 === 0 ? `Company ${(i % 5) + 1}` : i % 3 === 1 ? `Individual ${(i % 5) + 1}` : "Internal",
            entityType: i % 3 === 0 ? "Company" : i % 3 === 1 ? "Individual" : "Internal",
            status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Expired",
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
            expiryDate:
              i % 3 === 2
                ? new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
                : new Date(Date.now() + Math.floor(Math.random() * 10000000000)).toISOString(),
          }))
          setDocuments(mockDocuments)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching documents:", error)
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const filteredDocuments = documents.filter(
    (document) =>
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Legal Documents</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
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
                    <Table.Head>Document</Table.Head>
                    <Table.Head>Type</Table.Head>
                    <Table.Head>Related To</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Created</Table.Head>
                    <Table.Head>Expiry Date</Table.Head>
                    <Table.Head>Actions</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredDocuments.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={7} className="text-center py-8 text-gray-500">
                        No documents found
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    filteredDocuments.map((document) => (
                      <Table.Row key={document.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{document.title}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{document.type}</Table.Cell>
                        <Table.Cell>
                          <div>
                            <p>{document.entity}</p>
                            <p className="text-xs text-gray-500">{document.entityType}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              document.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : document.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {document.status}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{new Date(document.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                          {document.status === "Expired" ? (
                            <span className="text-red-600">{new Date(document.expiryDate).toLocaleDateString()}</span>
                          ) : (
                            new Date(document.expiryDate).toLocaleDateString()
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4 text-gray-600" />
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
    </Layout>
  )
}

export default LegalDocumentsPage
