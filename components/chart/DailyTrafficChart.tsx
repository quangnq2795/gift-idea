import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

const generateLast30DaysData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'MM/dd'),
      shopee: Math.floor(Math.random() * 5000 + 1000),
      facebook: Math.floor(Math.random() * 5000 + 1000),
    });
  }
  return data;
};

const dailyData = generateLast30DaysData();

export const DailyTrafficChart = () => {
  return (
    <div className="w-full p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">Lượt truy cập theo ngày (30 ngày gần nhất)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} />
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
