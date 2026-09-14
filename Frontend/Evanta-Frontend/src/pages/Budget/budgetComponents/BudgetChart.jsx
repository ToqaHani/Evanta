import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
function BudgetChart() {
  const data = {
    labels: [
      "Venue",
      "Food",
      "Decoration",
      "Photography",
      "Invitation",
      "Other",
    ],

    datasets: [
      {
        data: [35, 30, 15, 10, 5, 5],
        backgroundColor: [
          "#884a39",
          "#c38154",
          "#ffc26f",
          "#22c55e",
          "#8b5cf6",
          "#64748b",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "65%",

    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default BudgetChart;
