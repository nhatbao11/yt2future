'use client';

import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Decimation,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Decimation,
  Filler,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: ChartData<'line'>;
  options: ChartOptions<'line' | 'bar'>;
};

export default function MarketIndexChartBlock({ data, options }: Props) {
  return <Chart type="line" data={data} options={options} />;
}
