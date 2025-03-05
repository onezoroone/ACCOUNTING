import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
import PropTypes from "prop-types";

export default function Chart() {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Test',
          },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}

export function Chart2({data}){
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
            display: true,
            text: 'Thu chi hàng tháng trong năm',
            },
        },
        scales: {
            y: {
            type: 'linear',
            display: true,
            position: 'left',
            },
            y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
            },
        },
    };
    const labels = data.map(item => item.month);
    const dataChart = {
        labels,
        datasets: [
            {
              label: 'Tiền chi',
              data: data.map(item => item.expense),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              yAxisID: 'y',
            },
            {
              label: 'Tiền thu',
              data: data.map(item => item.income),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              yAxisID: 'y1',
            },
        ],
    };

    return (
        <Line options={options} data={dataChart} />
    )
}
Chart2.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    expense: PropTypes.string.isRequired,
    income: PropTypes.string.isRequired,
  })).isRequired,
};

export function Chart3({data}){
    const dataChart = {
        labels: data.map(item => item.year),
        datasets: [
          {
            label: '# VNĐ',
            data: data.map(item => item.totalRevenue),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    return <Pie data={dataChart} />;
}
Chart3.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number.isRequired,
    totalRevenue: PropTypes.number.isRequired,
  })).isRequired,
};