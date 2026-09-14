import BudgetChart from "./BudgetChart";

function BudgetDistribution({ expenses }) {
  return (
    <>
      <div className="content p-4">
        <h5 className="mb-3">Budget Distribution</h5>
        <BudgetChart expenses={expenses} />
      </div>
    </>
  );
}

export default BudgetDistribution;