import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import AdminNavbar from "../../components/adminCom/common/Navbar";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
];

const metrics = [
  { title: "Total Orders", value: 1289 },
  { title: "Total Users", value: 578 },
  { title: "Revenue", value: "$42,000" },
  { title: "Coupons Used", value: 132 },
];

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="bg-white shadow rounded-2xl p-4">
              <CardContent>
                <div className="text-gray-600 text-sm">{metric.title}</div>
                <div className="text-xl font-bold text-gray-800">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sales Chart */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#2874F0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
