import { useEffect, useState } from "react";
import "./WealthAnalytics.css";

function WealthAnalytics() {
  const [analytics, setAnalytics] = useState({
    income: 0,
    expenses: 0,
    investments: 0,
    savings: 0,
    savingsTarget: 0,
    transactionCount: 0,
    investmentCount: 0,
    goalCount: 0,
  });

  useEffect(() => {
    calculateAnalytics();
  }, []);

  const getNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : 0;
  };

  const calculateAnalytics = () => {
    let income = 0;
    let expenses = 0;
    let investments = 0;
    let savings = 0;
    let savingsTarget = 0;

    let transactionCount = 0;
    let investmentCount = 0;
    let goalCount = 0;

    /*
      TRANSACTIONS
    */

    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      try {
        const transactions =
          JSON.parse(savedTransactions);

        if (Array.isArray(transactions)) {
          transactionCount = transactions.length;

          transactions.forEach((transaction) => {
            const amount = getNumber(
              transaction.amount
            );

            const type = String(
              transaction.type ||
                transaction.transactionType ||
                ""
            ).toLowerCase();

            if (
              type === "income" ||
              type === "credit"
            ) {
              income += amount;
            } else if (
              type === "expense" ||
              type === "debit"
            ) {
              expenses += amount;
            }
          });
        }
      } catch {
        transactionCount = 0;
      }
    }

    /*
      INVESTMENTS
    */

    const savedInvestments =
      localStorage.getItem("investments");

    if (savedInvestments) {
      try {
        const investmentList =
          JSON.parse(savedInvestments);

        if (Array.isArray(investmentList)) {
          investmentCount =
            investmentList.length;

          investmentList.forEach((investment) => {
            investments += getNumber(
              investment.amount
            );
          });
        }
      } catch {
        investmentCount = 0;
      }
    }

    /*
      SAVINGS GOALS
    */

    const savedGoals =
      localStorage.getItem("savingsGoals");

    if (savedGoals) {
      try {
        const goals = JSON.parse(savedGoals);

        if (Array.isArray(goals)) {
          goalCount = goals.length;

          goals.forEach((goal) => {
            savings += getNumber(goal.saved);
            savingsTarget += getNumber(
              goal.target
            );
          });
        }
      } catch {
        goalCount = 0;
      }
    }

    setAnalytics({
      income,
      expenses,
      investments,
      savings,
      savingsTarget,
      transactionCount,
      investmentCount,
      goalCount,
    });
  };

  const balance =
    analytics.income - analytics.expenses;

  const totalWealth =
    balance +
    analytics.savings +
    analytics.investments;

  const savingsRate =
    analytics.income > 0
      ? Math.round(
          ((analytics.income -
            analytics.expenses) /
            analytics.income) *
            100
        )
      : 0;

  const goalProgress =
    analytics.savingsTarget > 0
      ? Math.min(
          Math.round(
            (analytics.savings /
              analytics.savingsTarget) *
              100
          ),
          100
        )
      : 0;

  const expenseRatio =
    analytics.income > 0
      ? Math.min(
          Math.round(
            (analytics.expenses /
              analytics.income) *
              100
          ),
          100
        )
      : 0;

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const refreshAnalytics = () => {
    calculateAnalytics();
  };

  return (
    <div className="wealth-analytics-page">

      <div className="wealth-header">

        <div>
          <p className="wealth-label">
            FINANCIAL INSIGHTS
          </p>

          <h1>Wealth Analytics</h1>

          <p className="wealth-description">
            Understand your financial position and
            track your wealth growth.
          </p>
        </div>

        <button
          className="refresh-analytics-btn"
          onClick={refreshAnalytics}
        >
          ↻ Refresh
        </button>

      </div>

      {/* MAIN WEALTH CARD */}

      <div className="net-worth-card">

        <div>
          <span className="net-worth-label">
            CURRENT WEALTH POSITION
          </span>

          <h2>
            {formatCurrency(totalWealth)}
          </h2>

          <p>
            Based on your income, expenses,
            savings and investments.
          </p>
        </div>

        <div className="net-worth-icon">
          ₹
        </div>

      </div>

      {/* SUMMARY */}

      <div className="analytics-summary-grid">

        <div className="analytics-card">

          <div className="analytics-card-icon income">
            +
          </div>

          <div>
            <span>Total Income</span>

            <h3>
              {formatCurrency(
                analytics.income
              )}
            </h3>
          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-card-icon expense">
            −
          </div>

          <div>
            <span>Total Expenses</span>

            <h3>
              {formatCurrency(
                analytics.expenses
              )}
            </h3>
          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-card-icon investment">
            ₹
          </div>

          <div>
            <span>Investments</span>

            <h3>
              {formatCurrency(
                analytics.investments
              )}
            </h3>
          </div>

        </div>

        <div className="analytics-card">

          <div className="analytics-card-icon savings">
            %
          </div>

          <div>
            <span>Savings Rate</span>

            <h3>{savingsRate}%</h3>
          </div>

        </div>

      </div>

      {/* ANALYTICS SECTION */}

      <div className="analytics-grid">

        {/* CASH FLOW */}

        <div className="analytics-panel">

          <div className="panel-header">

            <div>
              <h2>Cash Flow</h2>

              <p>
                Income compared with expenses.
              </p>
            </div>

          </div>

          <div className="cash-flow-content">

            <div className="cash-flow-row">

              <div className="cash-flow-info">
                <span>Income</span>

                <strong>
                  {formatCurrency(
                    analytics.income
                  )}
                </strong>
              </div>

              <div className="cash-flow-track">

                <div
                  className="income-bar"
                  style={{
                    width:
                      analytics.income > 0
                        ? "100%"
                        : "0%",
                  }}
                />

              </div>

            </div>

            <div className="cash-flow-row">

              <div className="cash-flow-info">
                <span>Expenses</span>

                <strong>
                  {formatCurrency(
                    analytics.expenses
                  )}
                </strong>
              </div>

              <div className="cash-flow-track">

                <div
                  className="expense-bar"
                  style={{
                    width: `${expenseRatio}%`,
                  }}
                />

              </div>

            </div>

            <div className="cash-flow-result">

              <span>Remaining Balance</span>

              <strong
                className={
                  balance >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {formatCurrency(balance)}
              </strong>

            </div>

          </div>

        </div>

        {/* SAVINGS PROGRESS */}

        <div className="analytics-panel">

          <div className="panel-header">

            <div>
              <h2>Savings Progress</h2>

              <p>
                Progress toward your savings goals.
              </p>
            </div>

          </div>

          <div className="savings-progress-content">

            <div className="progress-circle">

              <div>
                <strong>
                  {goalProgress}%
                </strong>

                <span>Saved</span>
              </div>

            </div>

            <div className="progress-details">

              <div>
                <span>Saved</span>

                <strong>
                  {formatCurrency(
                    analytics.savings
                  )}
                </strong>
              </div>

              <div>
                <span>Target</span>

                <strong>
                  {formatCurrency(
                    analytics.savingsTarget
                  )}
                </strong>
              </div>

              <div>
                <span>Goals</span>

                <strong>
                  {analytics.goalCount}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* WEALTH BREAKDOWN */}

      <div className="wealth-breakdown-panel">

        <div className="panel-header">

          <div>
            <h2>Wealth Breakdown</h2>

            <p>
              Your current financial components.
            </p>
          </div>

        </div>

        <div className="wealth-breakdown-grid">

          <div className="wealth-breakdown-item">

            <div className="breakdown-title">
              <span className="breakdown-dot savings-dot" />
              Savings
            </div>

            <strong>
              {formatCurrency(
                analytics.savings
              )}
            </strong>

          </div>

          <div className="wealth-breakdown-item">

            <div className="breakdown-title">
              <span className="breakdown-dot investment-dot" />
              Investments
            </div>

            <strong>
              {formatCurrency(
                analytics.investments
              )}
            </strong>

          </div>

          <div className="wealth-breakdown-item">

            <div className="breakdown-title">
              <span className="breakdown-dot balance-dot" />
              Remaining Balance
            </div>

            <strong>
              {formatCurrency(balance)}
            </strong>

          </div>

        </div>

      </div>

      {/* ACTIVITY */}

      <div className="analytics-activity-panel">

        <div className="panel-header">

          <div>
            <h2>Financial Activity</h2>

            <p>
              Overview of your financial records.
            </p>
          </div>

        </div>

        <div className="activity-grid">

          <div>
            <span>Transactions</span>
            <strong>
              {analytics.transactionCount}
            </strong>
          </div>

          <div>
            <span>Investments</span>
            <strong>
              {analytics.investmentCount}
            </strong>
          </div>

          <div>
            <span>Savings Goals</span>
            <strong>
              {analytics.goalCount}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default WealthAnalytics;