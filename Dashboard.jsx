import { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("dashboardTransactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "dashboardTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + Number(item.amount), 0);
  }, [transactions]);

  const totalSpending = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((total, item) => total + Number(item.amount), 0);
  }, [transactions]);

  const totalSavings = useMemo(() => {
    return transactions
      .filter((item) => item.type === "savings")
      .reduce((total, item) => total + Number(item.amount), 0);
  }, [transactions]);

  const totalInvestments = useMemo(() => {
    return transactions
      .filter((item) => item.type === "investment")
      .reduce((total, item) => total + Number(item.amount), 0);
  }, [transactions]);

  const availableBalance =
    totalIncome -
    totalSpending -
    totalSavings -
    totalInvestments;

  const formatAmount = (amountValue) => {
    return `Rs. ${Number(amountValue).toLocaleString("en-IN")}`;
  };

  const openModal = (selectedType) => {
    setType(selectedType);
    setAmount("");
    setDescription("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount("");
    setDescription("");
  };

  const addTransaction = (event) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      amount: numericAmount,
      description:
        description.trim() ||
        type.charAt(0).toUpperCase() + type.slice(1),
      date: new Date().toISOString(),
    };

    setTransactions((previous) => [
      newTransaction,
      ...previous,
    ]);

    closeModal();
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const getTypeLabel = (transactionType) => {
    switch (transactionType) {
      case "income":
        return "Income";

      case "expense":
        return "Expense";

      case "savings":
        return "Savings";

      case "investment":
        return "Investment";

      default:
        return "Transaction";
    }
  };

  const getTransactionSymbol = (transactionType) => {
    switch (transactionType) {
      case "income":
        return "+";

      case "expense":
        return "-";

      case "savings":
        return "S";

      case "investment":
        return "I";

      default:
        return "₹";
    }
  };

  const getAmountClass = (transactionType) => {
    if (transactionType === "income") {
      return "income-amount";
    }

    if (transactionType === "expense") {
      return "expense-amount";
    }

    return "other-amount";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            FINANCIAL OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p className="dashboard-subtitle">
            Welcome back! Manage your money from here.
          </p>
        </div>

        <button
          className="add-transaction-button"
          onClick={() => openModal("income")}
        >
          + Add Transaction
        </button>

      </div>

      {/* QUICK ACTIONS */}

      <section className="quick-actions-section">

        <div className="section-heading">
          <h2>Quick Actions</h2>

          <p>
            Add your financial activity quickly.
          </p>
        </div>

        <div className="quick-actions-grid">

          <button
            className="quick-action-card"
            onClick={() => openModal("income")}
          >
            <span className="quick-icon income-icon">
              +
            </span>

            <span className="quick-text">
              <strong>Add Income</strong>

              <small>
                Salary, allowance or other income
              </small>
            </span>
          </button>

          <button
            className="quick-action-card"
            onClick={() => openModal("expense")}
          >
            <span className="quick-icon expense-icon">
              -
            </span>

            <span className="quick-text">
              <strong>Add Expense</strong>

              <small>
                Food, shopping, bills and spending
              </small>
            </span>
          </button>

          <button
            className="quick-action-card"
            onClick={() => openModal("savings")}
          >
            <span className="quick-icon savings-icon">
              S
            </span>

            <span className="quick-text">
              <strong>Add Savings</strong>

              <small>
                Money you want to save
              </small>
            </span>
          </button>

          <button
            className="quick-action-card"
            onClick={() => openModal("investment")}
          >
            <span className="quick-icon investment-icon">
              I
            </span>

            <span className="quick-text">
              <strong>Add Investment</strong>

              <small>
                SIP, stocks or other investments
              </small>
            </span>
          </button>

        </div>

      </section>

      {/* SUMMARY CARDS */}

      <section className="summary-grid">

        <div className="summary-card">

          <span className="summary-title">
            Available Balance
          </span>

          <strong className="balance-value">
            {formatAmount(availableBalance)}
          </strong>

          <small>
            Current available money
          </small>

        </div>

        <div className="summary-card">

          <span className="summary-title">
            Total Income
          </span>

          <strong className="income-value">
            {formatAmount(totalIncome)}
          </strong>

          <small>
            Money received
          </small>

        </div>

        <div className="summary-card">

          <span className="summary-title">
            Total Spending
          </span>

          <strong className="expense-value">
            {formatAmount(totalSpending)}
          </strong>

          <small>
            Money spent
          </small>

        </div>

        <div className="summary-card">

          <span className="summary-title">
            Total Savings
          </span>

          <strong className="savings-value">
            {formatAmount(totalSavings)}
          </strong>

          <small>
            Money saved
          </small>

        </div>

      </section>

      {/* RECENT TRANSACTIONS */}

      <section className="transactions-card">

        <div className="transactions-header">

          <div>
            <h2>Recent Transactions</h2>

            <p>
              Your latest financial activity.
            </p>
          </div>

          {transactions.length > 0 && (
            <span className="transaction-count">
              {transactions.length} transaction
              {transactions.length !== 1 ? "s" : ""}
            </span>
          )}

        </div>

        {transactions.length === 0 ? (

          <div className="empty-transactions">

            <div className="empty-icon">
              ₹
            </div>

            <h3>No transactions yet</h3>

            <p>
              Add your first income or expense
              using the Quick Actions above.
            </p>

          </div>

        ) : (

          <div className="transaction-list">

            {transactions.map((transaction) => (

              <div
                className="transaction-item"
                key={transaction.id}
              >

                <div
                  className={`transaction-circle ${transaction.type}`}
                >
                  {getTransactionSymbol(
                    transaction.type
                  )}
                </div>

                <div className="transaction-info">

                  <strong>
                    {transaction.description}
                  </strong>

                  <span>
                    {getTypeLabel(transaction.type)}
                    {" | "}
                    {formatDate(transaction.date)}
                  </span>

                </div>

                <div
                  className={`transaction-amount ${getAmountClass(
                    transaction.type
                  )}`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : transaction.type === "expense"
                    ? "-"
                    : ""}
                  {formatAmount(transaction.amount)}
                </div>

                {/* DELETE BUTTON */}

                <button
                  type="button"
                  className="delete-transaction"
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                  title="Delete transaction"
                  aria-label={`Delete ${transaction.description}`}
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ADD TRANSACTION MODAL */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={closeModal}
        >

          <div
            className="transaction-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <p className="modal-label">
                  NEW TRANSACTION
                </p>

                <h2>
                  Add Transaction
                </h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={addTransaction}>

              <label>
                Transaction Type
              </label>

              <div className="type-buttons">

                <button
                  type="button"
                  className={
                    type === "income"
                      ? "type-button active"
                      : "type-button"
                  }
                  onClick={() => setType("income")}
                >
                  Income
                </button>

                <button
                  type="button"
                  className={
                    type === "expense"
                      ? "type-button active"
                      : "type-button"
                  }
                  onClick={() => setType("expense")}
                >
                  Expense
                </button>

                <button
                  type="button"
                  className={
                    type === "savings"
                      ? "type-button active"
                      : "type-button"
                  }
                  onClick={() => setType("savings")}
                >
                  Savings
                </button>

                <button
                  type="button"
                  className={
                    type === "investment"
                      ? "type-button active"
                      : "type-button"
                  }
                  onClick={() =>
                    setType("investment")
                  }
                >
                  Investment
                </button>

              </div>

              <label htmlFor="transaction-amount">
                Amount
              </label>

              <input
                id="transaction-amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(event) =>
                  setAmount(event.target.value)
                }
                required
              />

              <label htmlFor="transaction-description">
                Description
              </label>

              <input
                id="transaction-description"
                type="text"
                placeholder="Example: Monthly Salary"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Add Transaction
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;