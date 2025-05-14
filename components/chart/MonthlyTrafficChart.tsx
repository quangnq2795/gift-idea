import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', shopee: 4000, facebook: 2400 },
  { month: 'Feb', shopee: 3000, facebook: 1398 },
  { month: 'Mar', shopee: 2000, facebook: 9800 },
  { month: 'Apr', shopee: 2780, facebook: 3908 },
  { month: 'May', shopee: 1890, facebook: 4800 },
  { month: 'Jun', shopee: 2390, facebook: 3800 },
  { month: 'Jul', shopee: 3490, facebook: 4300 },
  { month: 'Aug', shopee: 3000, facebook: 3200 },
  { month: 'Sep', shopee: 2500, facebook: 3600 },
  { month: 'Oct', shopee: 2100, facebook: 4100 },
  { month: 'Nov', shopee: 2400, facebook: 3000 },
  { month: 'Dec', shopee: 2600, facebook: 4000 },
];

export const MonthlyTrafficChart = () => {
  return (
    <div className="w-full p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Lượt truy cập theo tháng</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="shopee" fill="#F63" name="Shopee" />
          <Bar dataKey="facebook" fill="#3b5998" name="Facebook" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
