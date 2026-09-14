import BudgetDistribution from "./BudgetDistribution";
import Categories from "./Categories";

function BudgetOverview({ expenses }) {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center gap-3 gap-lg-1">
          <div className="col-lg-5 col-12">
            <BudgetDistribution expenses={expenses} />
          </div>

          <div className="col-lg-5 col-12">
            <Categories expenses={expenses} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetOverview;