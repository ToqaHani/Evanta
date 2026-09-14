import { useEvent } from "../../../context/EventContext";

function Categories({ expenses }) {
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

  const categories = categoryInfo
    .filter(({ value }) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value;
    })
    .map(({ key, label, value }) => {
      const actual = Array.isArray(value)
        ? value.reduce((total, item) => total + Number(item.price || 0), 0)
        : Number(value?.price || 0);

      const spent = expenses
        .filter((expense) => expense.category === key)
        .reduce((total, expense) => total + Number(expense.amount || 0), 0);

      return {
        key,
        label,
        actual,
        spent,
        remaining: actual - spent,
      };
    });

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
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.key}>
                  <td>{category.label}</td>
                  <td>{category.spent.toFixed(2)} EGP</td>
                  <td>{category.actual.toFixed(2)} EGP</td>
                  <td>{category.remaining.toFixed(2)} EGP</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Smart Plan categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;