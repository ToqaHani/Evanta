import BudgetDistribution from "./BudgetDistribution";
import Categories from "./Categories";
function BudgetOverview() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center gap-3 gap-lg-1">
          <div className="col-lg-5 col-12">
            <BudgetDistribution />
          </div>
          <div className="col-lg-5 col-12">
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
}
export default BudgetOverview;
