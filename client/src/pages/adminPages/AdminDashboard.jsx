import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDashData } from '../../redux/features/admin/adminDash/adminDashAction';
import AdminNavbar from '../../components/adminCom/common/Navbar';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.adminDash);

  useEffect(() => {
    dispatch(getDashData());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

const {
  totalRevenue,
  totalOrders,
  todayOrders,
  todayRevenue, // ✅ Add this
  totalUsers,
  categoryOrders,
  genderSales,
  customerGrowth,
  bestSellingProducts,
} = data;

const chartData = genderSales?.map(item => ({
  name: item._id,
  value: item.value,
})) || [];


  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="p-4 md:p-6 lg:p-8 overflow-y-auto">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[
  { label: 'Total Revenue', value: `₹${totalRevenue?.toLocaleString()}`, bg: 'bg-green-100' },
  { label: 'Completed Orders', value: totalOrders, bg: 'bg-blue-100' },
  { label: 'Today Orders', value: todayOrders, bg: 'bg-yellow-100' },
  { label: 'Today Revenue', value: `₹${todayRevenue?.toLocaleString()}`, bg: 'bg-purple-100' }, // ✅ New
  { label: 'Total Users', value: totalUsers, bg: 'bg-red-100' },
]
.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200`}
              >
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard title="Customer Growth (Weekly)">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={customerGrowth?.map((w, i) => ({ name: `Week ${i + 1}`, users: w.users }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#F97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Top Categories by Orders">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={categoryOrders?.map(item => ({ name: item._id, orders: item.orders }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Sales by Gender">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
  data={chartData} // instead of genderSales
  cx="50%"
  cy="50%"
  outerRadius={80}
  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
  labelLine={false}
  dataKey="value"
>
  {chartData?.map((_, idx) => (
    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
  ))}
</Pie>

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Best Selling Products Table */}
          <div className="bg-white rounded-lg shadow-sm mt-6 p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Best Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-left">
                    {['Product ID','Image',  'Product Name','Category', 'Units Sold', 'Revenue'].map((head) => (
                      <th key={head} className="p-2 whitespace-nowrap">{head}</th>
                    ))}
                  </tr>
                </thead>
           <tbody>
  {bestSellingProducts?.map((product) => (
    <tr key={product.id} className="border-t text-gray-700">
      <td className="p-2">{product.id}</td>

      {/* Image column */}
      <td className="p-2">
        <img src={product?.images?.[0]} alt={product.name} className="w-12 h-12  rounded" />
      </td>

      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.category}</td>
      <td className="p-2">{product.unitsSold}</td>
      <td className="p-2">₹{product.revenue.toLocaleString()}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

// Reusable Chart Card Component
function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      {children}
    </div>
  );
}



