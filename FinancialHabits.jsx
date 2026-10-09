import { useEffect, useState } from "react";
import "./FinancialHabits.css";

function FinancialHabits() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Saving",
    target: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("financialHabits");

    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch {
        setHabits([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "financialHabits",
      JSON.stringify(habits)
    );
  }, [habits]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function addHabit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a habit name.");
      return;
    }

    if (!formData.target || Number(formData.target) <= 0) {
      alert("Please enter a valid target.");
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      target: Number(formData.target),
      progress: 0,
    };

    setHabits([newHabit, ...habits]);

    setFormData({
      name: "",
      category: "Saving",
      target: "",
    });

    setShowForm(false);
  }

  function increaseProgress(id) {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        return {
          ...habit,
          progress: Math.min(
            habit.progress + 1,
            habit.target
          ),
        };
      })
    );
  }

  function resetHabit(id) {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        return {
          ...habit,
          progress: 0,
        };
      })
    );
  }

  function deleteHabit(id) {
    setHabits(
      habits.filter((habit) => habit.id !== id)
    );
  }

  const completed = habits.filter(
    (habit) => habit.progress >= habit.target
  ).length;

  const overallProgress =
    habits.length === 0
      ? 0
      : Math.round(
          (habits.reduce(
            (sum, habit) =>
              sum + habit.progress / habit.target,
            0
          ) /
            habits.length) *
            100
        );

  return (
    <div className="financial-habits-page">

      <div className="financial-habits-header">

        <div>
          <p className="habits-label">
            WEALTH BUILDING
          </p>

          <h1>Financial Habits</h1>

          <p className="habits-description">
            Build better money habits and track your
            financial progress.
          </p>
        </div>

        <button
          className="add-habit-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add Habit"}
        </button>

      </div>

      <div className="habit-summary-grid">

        <div className="habit-summary-card">
          <div className="habit-summary-icon purple">
            ✓
          </div>

          <div>
            <span>Total Habits</span>
            <h2>{habits.length}</h2>
          </div>
        </div>

        <div className="habit-summary-card">
          <div className="habit-summary-icon green">
            ★
          </div>

          <div>
            <span>Completed</span>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="habit-summary-card">
          <div className="habit-summary-icon blue">
            %
          </div>

          <div>
            <span>Overall Progress</span>
            <h2>{overallProgress}%</h2>
          </div>
        </div>

      </div>

      {showForm && (
        <div className="habit-form-card">

          <h2>Add Financial Habit</h2>

          <p>
            Create a habit and set a target to track.
          </p>

          <form onSubmit={addHabit}>

            <div className="habit-form-grid">

              <div className="habit-input-group">
                <label>Habit Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: Save money weekly"
                />
              </div>

              <div className="habit-input-group">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Saving">
                    Saving
                  </option>

                  <option value="Budgeting">
                    Budgeting
                  </option>

                  <option value="Investing">
                    Investing
                  </option>

                  <option value="Spending">
                    Spending
                  </option>

                  <option value="Debt">
                    Debt Management
                  </option>
                </select>
              </div>

              <div className="habit-input-group">
                <label>Target</label>

                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="Example: 30"
                  min="1"
                />
              </div>

            </div>

            <div className="habit-form-actions">

              <button
                type="button"
                className="habit-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="habit-save-btn"
              >
                Create Habit
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="habits-main-card">

        <div className="habits-card-header">
          <h2>Your Financial Habits</h2>

          <p>
            Track your progress and stay consistent.
          </p>
        </div>

        {habits.length === 0 ? (

          <div className="habits-empty">

            <div className="habits-empty-icon">
              $
            </div>

            <h3>No financial habits yet</h3>

            <p>
              Create your first financial habit to
              start tracking your progress.
            </p>

            <button
              className="empty-add-btn"
              onClick={() => setShowForm(true)}
            >
              + Create Your First Habit
            </button>

          </div>

        ) : (

          <div className="habits-list">

            {habits.map((habit) => {

              const progress = Math.round(
                (habit.progress / habit.target) * 100
              );

              return (
                <div
                  className="habit-item"
                  key={habit.id}
                >

                  <div className="habit-item-top">

                    <div className="habit-item-info">

                      <div
                        className={
                          habit.progress >= habit.target
                            ? "habit-check completed"
                            : "habit-check"
                        }
                      >
                        {habit.progress >= habit.target
                          ? "✓"
                          : "$"}
                      </div>

                      <div>
                        <h3>{habit.name}</h3>

                        <span>
                          {habit.category}
                        </span>
                      </div>

                    </div>

                    <strong>
                      {progress}%
                    </strong>

                  </div>

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                  <div className="habit-item-bottom">

                    <span>
                      {habit.progress} / {habit.target}
                    </span>

                    <div className="habit-actions">

                      {habit.progress <
                        habit.target && (
                        <button
                          className="progress-btn"
                          onClick={() =>
                            increaseProgress(habit.id)
                          }
                        >
                          +1 Progress
                        </button>
                      )}

                      <button
                        className="reset-btn"
                        onClick={() =>
                          resetHabit(habit.id)
                        }
                      >
                        Reset
                      </button>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          deleteHabit(habit.id)
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

export default FinancialHabits;