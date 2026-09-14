function BudgetCards({ totalBudget, spent }) {
  const remaining = totalBudget - spent;

  return (
    <>
      <div className="container">
        <div className="row justify-content-center gap-3">
          <div className="content p-4 col-md-3 col-sm-12">
            <p>Total Budget</p>
            <h2>{totalBudget.toFixed(2)} EGP</h2>
          </div>

          <div className="content p-4 col-md-3 col-sm-12">
            <p>Spent</p>
            <h2>{spent.toFixed(2)} EGP</h2>
          </div>

          <div className="content p-4 col-md-3 col-sm-12">
            <p>Remaining</p>
            <h2>{remaining.toFixed(2)} EGP</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetCards;
