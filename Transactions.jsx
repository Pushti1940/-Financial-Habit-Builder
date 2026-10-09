import { useState, useEffect } from "react";
import "./Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "Food",
    date: "",
    notes: "",
  });

  useEffect(() => {
    const savedTransactions = localStorage.getItem(
      "financialTransactions"
    );

    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch {
        setTransactions([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "financialTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function addTransaction(event) {
    event.preventDefault();

    if (formData.title.trim() === "") {
      alert("Please enter a transaction name.");
      return;
    }

    if (
      formData.amount === "" ||
      Number(formData.amount) <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    if (formData.date === "") {
      alert("Please select a date.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      notes: formData.notes.trim(),
    };

    setTransactions([
      newTransaction,
      ...transactions,
    ]);

    setFormData({
      title: "",
      amount: "",
      type: "Expense",
      category: "Food",
      date: "",
      notes: "",
    });

    setShowForm(false);
  }

  function deleteTransaction(id) {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  }

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="transactions-page">

      <div className="transactions-header">

        <div>
          <p className="page-label">
            FINANCIAL MANAGEMENT
          </p>

          <h1>Transactions</h1>

          <p className="page-description">
            Track your income and expenses in one place.
          </p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm
            ? "Close"
            : "+ Add Transaction"}
        </button>

      </div>

      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon income-icon">
            ↑
          </div>

          <div>
            <span>Total Income</span>
            <h2>{formatAmount(totalIncome)}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon expense-icon">
            ↓
          </div>

          <div>
            <span>Total Expenses</span>
            <h2>{formatAmount(totalExpenses)}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon balance-icon">
            ₹
          </div>

          <div>
            <span>Current Balance</span>

            <h2
              className={
                balance >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {formatAmount(balance)}
            </h2>
          </div>
        </div>

      </div>

      {showForm && (
        <div className="transaction-form-card">

          <h2>Add New Transaction</h2>

          <p className="form-description">
            Enter your income or expense details.
          </p>

          <form onSubmit={addTransaction}>

            <div className="form-grid">

              <div className="input-group">
                <label>Transaction Name</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Example: Grocery Shopping"
                />
              </div>

              <div className="input-group">
                <label>Amount (₹)</label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              <div className="input-group">
                <label>Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="Expense">
                    Expense
                  </option>

                  <option value="Income">
                    Income
                  </option>
                </select>
              </div>

              <div className="input-group">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Food">Food</option>
                  <option value="Shopping">
                    Shopping
                  </option>
                  <option value="Education">
                    Education
                  </option>
                  <option value="Transport">
                    Transport
                  </option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Entertainment">
                    Entertainment
                  </option>
                  <option value="Investment">
                    Investment
                  </option>
                  <option value="Salary">Salary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label>Notes</label>

                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>

            </div>

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Transaction
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="transactions-card">

        <div className="transactions-card-header">

          <div>
            <h2>Transaction History</h2>

            <p>
              {transactions.length} transaction
              {transactions.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

        </div>

        {transactions.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              ₹
            </div>

            <h3>No transactions yet</h3>

            <p>
              Add your first income or expense
              using the button above.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {transactions.map((transaction) => (

                  <tr key={transaction.id}>

                    <td>
                      <div className="transaction-title">

                        <div
                          className={
                            transaction.type === "Income"
                              ? "transaction-icon income"
                              : "transaction-icon expense"
                          }
                        >
                          {transaction.type === "Income"
                            ? "+"
                            : "-"}
                        </div>

                        <div>
                          <strong>
                            {transaction.title}
                          </strong>

                          {transaction.notes && (
                            <small>
                              {transaction.notes}
                            </small>
                          )}
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="category">
                        {transaction.category}
                      </span>
                    </td>

                    <td>
                      {formatDate(transaction.date)}
                    </td>

                    <td>
                      <span
                        className={
                          transaction.type === "Income"
                            ? "income-badge"
                            : "expense-badge"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td
                      className={
                        transaction.type === "Income"
                          ? "income-text"
                          : "expense-text"
                      }
                    >
                      {transaction.type === "Income"
                        ? "+"
                        : "-"}

                      {formatAmount(
                        transaction.amount
                      )}
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Transactions;
