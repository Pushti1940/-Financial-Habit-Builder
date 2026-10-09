import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [data, setData] = useState({
    income: 0,
    expenses: 0,
    investments: 0,
    savings: 0,
    transactions: 0,
  });

  useEffect(() => {
    loadReportData();
  }, []);

  const loadReportData = () => {
    let income = 0;
    let expenses = 0;
    let investments = 0;
    let savings = 0;
    let transactions = 0;

    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        const list = JSON.parse(savedTransactions);

        if (Array.isArray(list)) {
          transactions = list.length;

          list.forEach((item) => {
            const amount = Number(item.amount) || 0;
            const type = String(
              item.type ||
                item.transactionType ||
                ""
            ).toLowerCase();

            if (
              type === "income" ||
              type === "credit"
            ) {
              income += amount;
            }

            if (
              type === "expense" ||
              type === "debit"
            ) {
              expenses += amount;
            }
          });
        }
      } catch {
        transactions = 0;
      }
    }

    const savedInvestments =
      localStorage.getItem("investments");

    if (savedInvestments) {
      try {
        const list = JSON.parse(savedInvestments);

        if (Array.isArray(list)) {
          list.forEach((item) => {
            investments += Number(item.amount) || 0;
          });
        }
      } catch {
        investments = 0;
      }
    }

    const savedGoals =
      localStorage.getItem("savingsGoals");

    if (savedGoals) {
      try {
        const list = JSON.parse(savedGoals);

        if (Array.isArray(list)) {
          list.forEach((item) => {
            savings += Number(item.saved) || 0;
          });
        }
      } catch {
        savings = 0;
      }
    }

    setData({
      income,
      expenses,
      investments,
      savings,
      transactions,
    });
  };

  const balance = data.income - data.expenses;

  const savingsRate =
    data.income > 0
      ? Math.round(
          ((data.income - data.expenses) /
            data.income) *
            100
        )
      : 0;

  const formatMoney = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="reports-page">

      <div className="reports-header">
        <div>
          <p className="reports-label">
            FINANCIAL REPORTING
          </p>

          <h1>Reports</h1>

          <p className="reports-description">
            Get a clear overview of your financial
            activity and progress.
          </p>
        </div>

        <button
          className="reports-refresh"
          onClick={loadReportData}
        >
          ↻ Refresh Report
        </button>
      </div>

      <div className="report-summary">

        <div className="report-card">
          <div className="report-icon income-icon">
            +
          </div>

          <div>
            <span>Total Income</span>
            <h2>
              {formatMoney(data.income)}
            </h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon expense-icon">
            −
          </div>

          <div>
            <span>Total Expenses</span>
            <h2>
              {formatMoney(data.expenses)}
            </h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon balance-icon">
            ₹
          </div>

          <div>
            <span>Balance</span>
            <h2>
              {formatMoney(balance)}
            </h2>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon savings-icon">
            %
          </div>

          <div>
            <span>Savings Rate</span>
            <h2>{savingsRate}%</h2>
          </div>
        </div>

      </div>

      <div className="report-grid">

        <div className="report-panel">

          <div className="report-panel-header">
            <h2>Financial Overview</h2>
            <p>
              Your current financial position.
            </p>
          </div>

          <div className="overview-list">

            <div className="overview-row">
              <span>Income</span>
              <strong className="income-text">
                {formatMoney(data.income)}
              </strong>
            </div>

            <div className="overview-row">
              <span>Expenses</span>
              <strong className="expense-text">
                {formatMoney(data.expenses)}
              </strong>
            </div>

            <div className="overview-row">
              <span>Remaining Balance</span>
              <strong>
                {formatMoney(balance)}
              </strong>
            </div>

            <div className="overview-row">
              <span>Investments</span>
              <strong>
                {formatMoney(data.investments)}
              </strong>
            </div>

            <div className="overview-row">
              <span>Savings</span>
              <strong>
                {formatMoney(data.savings)}
              </strong>
            </div>

          </div>

        </div>

        <div className="report-panel">

          <div className="report-panel-header">
            <h2>Financial Activity</h2>
            <p>
              Your recorded financial activity.
            </p>
          </div>

          <div className="activity-number">
            <strong>{data.transactions}</strong>

            <span>
              Total Transactions
            </span>
          </div>

          <div className="activity-message">
            {data.transactions === 0
              ? "No transactions have been recorded yet."
              : "Your transaction activity is being tracked."}
          </div>

        </div>

      </div>

      <div className="report-analysis">

        <div className="report-panel-header">
          <h2>Financial Health</h2>

          <p>
            A simple summary based on your
            recorded information.
          </p>
        </div>

        <div className="health-grid">

          <div className="health-item">
            <span>Income</span>

            <div className="health-bar">
              <div
                className="health-income"
                style={{
                  width:
                    data.income > 0
                      ? "100%"
                      : "0%",
                }}
              />
            </div>

            <strong>
              {formatMoney(data.income)}
            </strong>
          </div>

          <div className="health-item">
            <span>Expenses</span>

            <div className="health-bar">
              <div
                className="health-expense"
                style={{
                  width:
                    data.income > 0
                      ? `${Math.min(
                          (data.expenses /
                            data.income) *
                            100,
                          100
                        )}%`
                      : "0%",
                }}
              />
            </div>

            <strong>
              {formatMoney(data.expenses)}
            </strong>
          </div>

          <div className="health-item">
            <span>Investments</span>

            <div className="health-bar">
              <div
                className="health-investment"
                style={{
                  width:
                    data.investments > 0
                      ? "100%"
                      : "0%",
                }}
              />
            </div>

            <strong>
              {formatMoney(data.investments)}
            </strong>
          </div>

        </div>

      </div>

      <div className="report-empty">

        {data.income === 0 &&
        data.expenses === 0 &&
        data.investments === 0 &&
        data.savings === 0 ? (
          <>
            <div className="empty-report-icon">
              ₹
            </div>

            <h3>
              Your report is ready
            </h3>

            <p>
              Add transactions, investments and
              savings goals to generate your
              personalized financial report.
            </p>
          </>
        ) : (
          <>
            <h3>
              Your financial report is updated
            </h3>

            <p>
              The information above is calculated
              from your recorded financial data.
            </p>
          </>
        )}

      </div>

    </div>
  );
}

export default Reports;