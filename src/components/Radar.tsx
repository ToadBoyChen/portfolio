import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const PRIMARY_COLOR_RGB = '163, 119, 100';
const FOREGROUND_COLOR_RGB = '86, 69, 63';

const data = {
  labels: ['Frontend', 'Backend', 'DevOps', 'Databases', 'UI/UX', 'Testing'],
  datasets: [
    {
      label: 'Proficiency',
      data: [90, 85, 70, 80, 75, 85],
      backgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 0.2)`,
      borderColor: `rgba(${PRIMARY_COLOR_RGB}, 1)`,
      borderWidth: 2,
      pointBackgroundColor: `rgba(${PRIMARY_COLOR_RGB}, 1)`,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: `rgba(${PRIMARY_COLOR_RGB}, 1)`,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: { display: false },
      grid: { color: `rgba(${FOREGROUND_COLOR_RGB}, 0.2)` },
      angleLines: { color: `rgba(${FOREGROUND_COLOR_RGB}, 0.2)` },
      pointLabels: {
        font: { size: 14, family: "'Inter', sans-serif" },
        color: `rgba(${FOREGROUND_COLOR_RGB}, 0.8)`,
      },
    },
  },
};

function RadarChart() {
  return (
    <div style={{ position: 'relative', height: '350px' }}>
      <Radar data={data} options={options} />
    </div>
  );
}

export default RadarChart;