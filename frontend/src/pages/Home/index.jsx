import { Card } from "../../components/ui/Card"
import { Building, Users, FileText, Wrench, FileSpreadsheet, Bell } from "lucide-react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Companies</h3>
              <p className="text-3xl font-bold mt-2">24</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/companies" className="text-sm text-blue-600 hover:underline">
              View all companies
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Individuals</h3>
              <p className="text-3xl font-bold mt-2">142</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/individuals" className="text-sm text-green-600 hover:underline">
              View all individuals
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Estimates</h3>
              <p className="text-3xl font-bold mt-2">38</p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/estimates" className="text-sm text-amber-600 hover:underline">
              View all estimates
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Work Orders</h3>
              <p className="text-3xl font-bold mt-2">17</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Wrench className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/works" className="text-sm text-purple-600 hover:underline">
              View all work orders
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Invoices</h3>
              <p className="text-3xl font-bold mt-2">53</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <FileSpreadsheet className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/invoices" className="text-sm text-red-600 hover:underline">
              View all invoices
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Alerts</h3>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Bell className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-6">
            <Link to="/alerts" className="text-sm text-orange-600 hover:underline">
              View all alerts
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {i % 3 === 0 ? (
                    <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                  ) : i % 3 === 1 ? (
                    <Users className="h-4 w-4 text-green-600" />
                  ) : (
                    <Wrench className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {i % 3 === 0
                      ? "Invoice INV-1001 was created"
                      : i % 3 === 1
                        ? "New individual John Doe was added"
                        : "Work order WRK-3001 was completed"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(Date.now() - i * 3600000).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    i % 3 === 0
                      ? "bg-red-100 text-red-600"
                      : i % 3 === 1
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {i}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {i % 3 === 0
                      ? "Follow up on overdue invoice INV-1001"
                      : i % 3 === 1
                        ? "Renew visa for John Doe"
                        : "Schedule maintenance for vehicle V-001"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home
