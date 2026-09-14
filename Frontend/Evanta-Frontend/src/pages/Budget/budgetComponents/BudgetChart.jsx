import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEvent } from "../../../context/EventContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetChart({ expenses }) {
  const { currentEvent } = useEvent();

  const smartPlan = currentEvent?.smartPlan;

  const categoryInfo = [
    {
      key: "venue",
      label: "Venue",
      value: smartPlan?.venue,
    },
    {
      key: "decoration",
      label: "Decoration",
      value: smartPlan?.decoration,
    },
    {
      key: "catering",
      label: "Food & Drinks",
      value: smartPlan?.catering,
    },
    {
      key: "photography",
      label: "Photography",
      value: smartPlan?.photography,
    },
    {
      key: "entertainment",
      label: "Entertainment",
      value: smartPlan?.entertainment,
    },
    {
      key: "invitations",
      label: "Invitations",
      value: smartPlan?.invitations,
    },
    {
      key: "cake",
      label: "Cake & Desserts",
      value: smartPlan?.cake,
    },
    {
      key: "flowers",
      label: "Flowers",
      value: smartPlan?.flowers,
    },
  ];

  const selectedCategories = categoryInfo.filter(({ value }) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value;
  });

  const labels = selectedCategories.map((category) => category.label);

  const amounts = selectedCategories.map((category) => {
    return expenses
      .filter((expense) => expense.category === category.key)
      .reduce((total, expense) => total + Number(expense.amount || 0), 0);
  });

  const data = {
    labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: [
          "#884a39",
          "#c38154",
          "#ffc26f",
          "#22c55e",
          "#8b5cf6",
          "#64748b",
          "#ef4444",
          "#f59e0b",
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