import { useState } from "react"

function App() {
  const defaultTodo = [
    {
      id: 1,
      text: "Clear the list",
      isDone: true,
    },
    {
      id: 2,
      text: "Run the platform",
      isDone: true,
    },
    {
      id: 3,
      text: "give it to me",
      isDone: false,
    },
    {
      id: 4,
      text: "Talk to me",
      isDone: false,
    },
    {
      id: 5,
      text: "Call the doctor",
      isDone: true,
    },
    {
      id: 6,
      text: "Life is Life",
      isDone: false,
    },
  ]

  const [todo, setTodo] = useState("")
  const [form, setForm] = useState(defaultTodo)
  const formSubmit = (e) => {
    e.preventDefault()
    if (!todo) {
      return false
    }
    setForm([
      {
        id: Date.now(),
        text: todo,
        isDone: false,
      },
      ...form,
    ])
    setTodo("")
  }

  const checkChange = (id) => {
    setForm(
      form.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
    )
  }

  const deleteTodo = (id) => {
    setForm(form.filter((item) => item.id !== id))
  }

  const allDone = () => {
    setForm(
      form.map((allTodo) =>
        allTodo.isDone === false ? { ...allTodo, isDone: true } : { ...allTodo }
      )
    )
  }

  const clrCompleted = () => {
    setForm(form.filter((clr) => clr.isDone === false))
  }

  const cmpCounter = form.filter((fltr) => fltr.isDone === false)

  const [foFilter, setFoFilter] = useState(0)

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={formSubmit}>
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" onClick={() => allDone()}>
            Mark all as complete
          </label>

          <ul className="todo-list">
            {(foFilter === 0
              ? form
              : foFilter === 1
              ? form.filter((flsmu) => flsmu.isDone === false)
              : form.filter((flsmu) => flsmu.isDone === true)
            ).map((items) => (
              <li
                key={items.id}
                className={!items.isDone ? "bekliyor" : "completed"}
              >
                <div className="view">
                  <input
                    id={items.id}
                    className="toggle"
                    type="checkbox"
                    checked={items.isDone}
                  />
                  <label
                    htmlFor={items.id}
                    onClick={() => checkChange(items.id)}
                  >
                    {items.text}
                  </label>
                  <button
                    className="destroy"
                    onClick={() => {
                      deleteTodo(items.id)
                    }}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{cmpCounter.length}</strong> items left
          </span>

          <ul className="filters">
            <li>
              <span
                onClick={() => {
                  setFoFilter(0)
                }}
                className={foFilter === 0 ? "selected" : null}
              >
                All
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  setFoFilter(1)
                }}
                className={foFilter === 1 ? "selected" : null}
              >
                Active
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  setFoFilter(2)
                }}
                className={foFilter === 2 ? "selected" : null}
              >
                Completed
              </span>
            </li>
          </ul>

          <button
            className="clear-completed"
            onClick={() => {
              clrCompleted()
            }}
          >
            Clear completed
          </button>
        </footer>
      </section>
    </>
  )
}

export default App
