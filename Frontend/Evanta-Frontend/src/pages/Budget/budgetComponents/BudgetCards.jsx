function BudgetCards() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center gap-3">
          <div className="content p-4 col-md-3 col-sm-12">
            <p>Total Budget</p>
            <h2>$0.00</h2>
          </div>

          <div className="content p-4 col-md-3 col-sm-12">
            <p>Spent</p>
            <h2>$0.00</h2>
          </div>

          <div className="content p-4 col-md-3 col-sm-12">
            <p>Remaining</p>
            <h2>$0.00</h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default BudgetCards;
