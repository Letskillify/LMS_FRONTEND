import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseGetReceipt() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:5000/api/expenses/${id}`);
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleEdit = (id) => {
    alert(`Edit expense with ID: ${id}`);
    // Implement edit modal or navigation logic here
  };

  const handleView = (id) => {
    alert(`View expense with ID: ${id}`);
    // Implement view modal or navigation logic here
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Expense Voucher List</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Category or Description..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Description</th>
              <th>Total Amount</th>
              <th>Paid To</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .filter(
                (expense) =>
                  expense.category.toLowerCase().includes(search) ||
                  (expense.description &&
                    expense.description.toLowerCase().includes(search))
              )
              .map((expense, index) => (
                <tr key={expense._id}>
                  <td>{index + 1}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description || "N/A"}</td>
                  <td>₹{expense.totalAmount ? expense.totalAmount.toFixed(2) : "0.00"}</td>
                  <td>{expense.paidTo?.name || "N/A"}</td>
                  <td>{expense.paymentMethod || "N/A"}</td>
                  <td>
                    <span className={`badge bg-${getStatusBadge(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleView(expense._id)}>
                      View
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(expense._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Function to Add Status Badges
const getStatusBadge = (status) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
      return "danger";
    default:
      return "secondary";
  }
};

export default ExpenseGetReceipt;
