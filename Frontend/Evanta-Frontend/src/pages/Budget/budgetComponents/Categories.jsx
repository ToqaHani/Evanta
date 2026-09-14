function Categories() {
  return (
    <div className="content p-4">
      <h5 className="mb-3">Categories</h5>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Spent</th>
              <th>Actual</th>
              <th>Remaining</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Venue</td>
              <td>$500</td>
              <td>$600</td>
              <td>$100</td>
            </tr>

            <tr>
              <td>Food</td>
              <td>$300</td>
              <td>$400</td>
              <td>$100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
