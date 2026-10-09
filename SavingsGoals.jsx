import { useEffect, useState } from "react";
import "./SavingsGoals.css";

function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    target: "",
    date: "",
  });

  useEffect(() => {
    const savedGoals = localStorage.getItem("savingsGoals");

    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch {
        setGoals([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "savingsGoals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const addGoal = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a goal name.");
      return;
    }

    if (!formData.target || Number(formData.target) <= 0) {
      alert("Please enter a valid target amount.");
      return;
    }

    const newGoal = {
      id: Date.now(),
      name: formData.name.trim(),
      description:
        formData.description.trim() ||
        "Track your savings goal.",
      target: Number(formData.target),
      saved: 0,
      date: formData.date,
    };

    setGoals((previous) => [newGoal, ...previous]);

    setFormData({
      name: "",
      description: "",
      target: "",
      date: "",
    });

    setShowForm(false);
  };

  const addSavings = (id) => {
    const amount = prompt("Enter amount to add:");

    if (amount === null) {
      return;
    }

    const value = Number(amount);

    if (!value || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== id) {
          return goal;
        }

        return {
          ...goal,
          saved: Math.min(
            goal.saved + value,
            goal.target
          ),
        };
      })
    );
  };

  const deleteGoal = (id) => {
    setGoals((previous) =>
      previous.filter((goal) => goal.id !== id)
    );
  };

  const totalSaved = goals.reduce(
    (total, goal) => total + goal.saved,
    0
  );

  const totalTarget = goals.reduce(
    (total, goal) => total + goal.target,
    0
  );

  const overallProgress =
    totalTarget > 0
      ? Math.round((totalSaved / totalTarget) * 100)
      : 0;

  return (
    <div className="savings-goals-page">

      <div className="savings-header">

        <div>
          <p className="savings-label">
            FINANCIAL PLANNING
          </p>

          <h1>Savings Goals</h1>

          <p className="savings-description">
            Track your savings and work towards your
            financial goals.
          </p>
        </div>

        <button
          className="add-goal-btn"
          onClick={() =>
            setShowForm((previous) => !previous)
          }
        >
          {showForm ? "Close" : "+ Add Goal"}
        </button>

      </div>

      <div className="savings-summary-grid">

        <div className="savings-summary-card">
          <div className="summary-icon purple">
            $
          </div>

          <div>
            <span>Total Goals</span>
            <h2>{goals.length}</h2>
          </div>
        </div>

        <div className="savings-summary-card">
          <div className="summary-icon green">
            ₹
          </div>

          <div>
            <span>Total Saved</span>
            <h2>
              ₹{totalSaved.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>

        <div className="savings-summary-card">
          <div className="summary-icon blue">
            %
          </div>

          <div>
            <span>Overall Progress</span>
            <h2>{overallProgress}%</h2>
          </div>
        </div>

      </div>

      {showForm && (
        <div className="goal-form-card">

          <h2>Create Savings Goal</h2>

          <p>
            Add a goal and start tracking your savings.
          </p>

          <form onSubmit={addGoal}>

            <div className="goal-form-grid">

              <div className="goal-input-group">
                <label>Goal Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Emergency Fund"
                />
              </div>

              <div className="goal-input-group">
                <label>Target Amount</label>

                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="Example: 100000"
                  min="1"
                />
              </div>

              <div className="goal-input-group">
                <label>Target Date</label>

                <input
                  type="month"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="goal-input-group full-width">
                <label>Description</label>

                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Example: Build an emergency fund"
                />
              </div>

            </div>

            <div className="goal-form-actions">

              <button
                type="button"
                className="goal-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="goal-save-btn"
              >
                Create Goal
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="goals-main-card">

        <div className="goals-card-header">

          <div>
            <h2>Your Savings Goals</h2>

            <p>
              Monitor your savings progress.
            </p>
          </div>

        </div>

        {goals.length === 0 ? (

          <div className="goals-empty">

            <div className="goals-empty-icon">
              ₹
            </div>

            <h3>No savings goals yet</h3>

            <p>
              Create your first savings goal to start
              tracking your progress.
            </p>

            <button
              className="empty-goal-btn"
              onClick={() => setShowForm(true)}
            >
              + Create Your First Goal
            </button>

          </div>

        ) : (

          <div className="goals-list">

            {goals.map((goal) => {

              const progress =
                goal.target > 0
                  ? Math.min(
                      Math.round(
                        (goal.saved / goal.target) * 100
                      ),
                      100
                    )
                  : 0;

              return (
                <div
                  className="goal-item"
                  key={goal.id}
                >

                  <div className="goal-top">

                    <div>
                      <h3>{goal.name}</h3>

                      <p>{goal.description}</p>
                    </div>

                    <strong>
                      {progress}%
                    </strong>

                  </div>

                  <div className="goal-amounts">

                    <span>
                      ₹{goal.saved.toLocaleString("en-IN")}
                    </span>

                    <span>
                      / ₹
                      {goal.target.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  <div className="goal-progress-track">

                    <div
                      className="goal-progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <div className="goal-bottom">

                    <span>
                      {goal.date
                        ? `Target: ${goal.date}`
                        : "No target date"}
                    </span>

                    <div className="goal-actions">

                      <button
                        className="add-saving-btn"
                        onClick={() =>
                          addSavings(goal.id)
                        }
                      >
                        + Add Savings
                      </button>

                      <button
                        className="delete-goal-btn"
                        onClick={() =>
                          deleteGoal(goal.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default SavingsGoals;