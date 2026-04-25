'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MarketIndex {
  id: number;
  symbol: string;
  date: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  change: number | null;
  changePct: number | null;
  ref: number | null;
}

const SYMBOLS = ['VNINDEX', 'VN30', 'HNXINDEX', 'UPCOMINDEX'];

export default function MarketIndexDashboard() {
  const [data, setData] = useState<Record<string, MarketIndex[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      SYMBOLS.map((symbol) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:5000'}/api/market-index?symbol=${symbol}`
        )
          .then((res) => res.json())
          .then((arr) => ({ symbol, arr }))
      )
    )
      .then((results) => {
        const obj: Record<string, MarketIndex[]> = {};
        results.forEach(({ symbol, arr }) => {
          obj[symbol] = arr;
        });
        setData(obj);
        setLoading(false);
      })
      .catch((e) => {
        setError('Lỗi tải dữ liệu');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Chỉ Số Thị Trường</h1>
      {SYMBOLS.map((symbol) => (
        <div key={symbol} className="mb-10">
          <h2 className="text-xl font-semibold mb-2">{symbol}</h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Ngày</th>
                  <th className="px-2 py-1 border">Open</th>
                  <th className="px-2 py-1 border">High</th>
                  <th className="px-2 py-1 border">Low</th>
                  <th className="px-2 py-1 border">Close</th>
                  <th className="px-2 py-1 border">Volume</th>
                </tr>
              </thead>
              <tbody>
                {data[symbol]?.map((row) => (
                  <tr key={row.id}>
                    <td className="px-2 py-1 border">{row.date.slice(0, 10)}</td>
                    <td className="px-2 py-1 border">{row.open}</td>
                    <td className="px-2 py-1 border">{row.high}</td>
                    <td className="px-2 py-1 border">{row.low}</td>
                    <td className="px-2 py-1 border">{row.close}</td>
                    <td className="px-2 py-1 border">{row.volume?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <Line
              data={{
                labels: data[symbol]?.map((row) => row.date.slice(0, 10)),
                datasets: [
                  {
                    label: `${symbol} Close`,
                    data: data[symbol]?.map((row) => row.close ?? 0),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37,99,235,0.1)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: { display: true, text: `Biểu đồ giá đóng cửa ${symbol}` },
                },
                scales: {
                  x: { title: { display: true, text: 'Ngày' } },
                  y: { title: { display: true, text: 'Close' } },
                },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
