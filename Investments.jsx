import { useEffect, useState } from "react";
import "./Investments.css";

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Mutual Fund",
    amount: "",
    date: "",
  });

  useEffect(() => {
    const savedInvestments =
      localStorage.getItem("investments");

    if (savedInvestments) {
      try {
        setInvestments(JSON.parse(savedInvestments));
      } catch {
        setInvestments([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "investments",
      JSON.stringify(investments)
    );
  }, [investments]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const addInvestment = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter an investment name.");
      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      alert("Please enter a valid investment amount.");
      return;
    }

    const newInvestment = {
      id: Date.now(),
      name: formData.name.trim(),
      type: formData.type,
      amount: Number(formData.amount),
      date: formData.date,
    };

    setInvestments((previous) => [
      newInvestment,
      ...previous,
    ]);

    setFormData({
      name: "",
      type: "Mutual Fund",
      amount: "",
      date: "",
    });

    setShowForm(false);
  };

  const addMoney = (id) => {
    const value = prompt(
      "Enter additional investment amount:"
    );

    if (value === null) {
      return;
    }

    const amount = Number(value);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setInvestments((previous) =>
      previous.map((investment) =>
        investment.id === id
          ? {
              ...investment,
              amount: investment.amount + amount,
            }
          : investment
      )
    );
  };

  const deleteInvestment = (id) => {
    setInvestments((previous) =>
      previous.filter(
        (investment) => investment.id !== id
      )
    );
  };

  const totalInvested = investments.reduce(
    (total, investment) =>
      total + investment.amount,
    0
  );

  const investmentCount = investments.length;

  return (
    <div className="investments-page">

      <div className="investments-header">

        <div>
          <p className="investments-label">
            WEALTH MANAGEMENT
          </p>

          <h1>Investments</h1>

          <p className="investments-description">
            Track your investments and build your
            long-term wealth.
          </p>
        </div>

        <button
          className="add-investment-btn"
          onClick={() =>
            setShowForm((previous) => !previous)
          }
        >
          {showForm ? "Close" : "+ Add Investment"}
        </button>

      </div>

      <div className="investment-summary-grid">

        <div className="investment-summary-card">

          <div className="investment-icon purple">
            ₹
          </div>

          <div>
            <span>Total Invested</span>

            <h2>
              ₹{totalInvested.toLocaleString("en-IN")}
            </h2>
          </div>

        </div>

        <div className="investment-summary-card">

          <div className="investment-icon green">
            #
          </div>

          <div>
            <span>Total Investments</span>

            <h2>{investmentCount}</h2>
          </div>

        </div>

        <div className="investment-summary-card">

          <div className="investment-icon blue">
            %
          </div>

          <div>
            <span>Portfolio Status</span>

            <h2>
              {investmentCount === 0
                ? "Not Started"
                : "Active"}
            </h2>
          </div>

        </div>

      </div>

      {showForm && (
        <div className="investment-form-card">

          <h2>Add Investment</h2>

          <p>
            Enter your investment details to start
            tracking your portfolio.
          </p>

          <form onSubmit={addInvestment}>

            <div className="investment-form-grid">

              <div className="investment-input-group">

                <label>
                  Investment Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: HDFC Mutual Fund"
                />

              </div>

              <div className="investment-input-group">

                <label>
                  Investment Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Mutual Fund">
                    Mutual Fund
                  </option>

                  <option value="Stocks">
                    Stocks
                  </option>

                  <option value="Fixed Deposit">
                    Fixed Deposit
                  </option>

                  <option value="Recurring Deposit">
                    Recurring Deposit
                  </option>

                  <option value="Gold">
                    Gold
                  </option>

                  <option value="Bonds">
                    Bonds
                  </option>

                  <option value="ETF">
                    ETF
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

              </div>

              <div className="investment-input-group">

                <label>
                  Amount Invested
                </label>

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Example: 10000"
                  min="1"
                />

              </div>

              <div className="investment-input-group">

                <label>
                  Investment Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="investment-form-actions">

              <button
                type="button"
                className="investment-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="investment-save-btn"
              >
                Add Investment
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="investments-main-card">

        <div className="investments-card-header">

          <div>
            <h2>Your Investments</h2>

            <p>
              Monitor your investment portfolio.
            </p>
          </div>

        </div>

        {investments.length === 0 ? (

          <div className="investments-empty">

            <div className="investments-empty-icon">
              ₹
            </div>

            <h3>
              No investments yet
            </h3>

            <p>
              Add your first investment to start
              tracking your portfolio.
            </p>

            <button
              className="empty-investment-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Your First Investment
            </button>

          </div>

        ) : (

          <div className="investments-list">

            {investments.map((investment) => (

              <div
                className="investment-item"
                key={investment.id}
              >

                <div className="investment-item-left">

                  <div className="investment-item-icon">
                    ₹
                  </div>

                  <div>

                    <h3>
                      {investment.name}
                    </h3>

                    <span>
                      {investment.type}
                    </span>

                  </div>

                </div>

                <div className="investment-item-right">

                  <strong>
                    ₹
                    {investment.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <span>
                    {investment.date
                      ? investment.date
                      : "No date added"}
                  </span>

                </div>

                <div className="investment-actions">

                  <button
                    className="add-money-btn"
                    onClick={() =>
                      addMoney(investment.id)
                    }
                  >
                    + Add Money
                  </button>

                  <button
                    className="delete-investment-btn"
                    onClick={() =>
                      deleteInvestment(investment.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Investments;