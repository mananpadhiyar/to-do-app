import { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");

  const [todoItems, setTodoItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const handleAddTodo = () => {
    if (todo && !toggleSubmit) {
      setTodoItems(
        todoItems.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: todo };
          }
          return elem;
        })
      );
    } else if (todo !== "") {
      const allTodoItems = { id: new Date().getTime().toString(), name: todo };
      setTodoItems([...todoItems, allTodoItems]);
    }

    setToggleSubmit(true);

    setTodo("");
  };

  const handleEdit = (id) => {
    const findTodo = todoItems.find((todo) => {
      return todo.id === id;
    });
    console.log(findTodo);
    setToggleSubmit(false);
    setTodo(findTodo.name);
    setIsEditItem(id);
  };

  const handleDelete = (id) => {
    const filteredTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems([...filteredTodos]);
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <h1>What's your plan today?</h1>

          <form
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="todoForm"
          >
            <input
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              value={todo}
              placeholder="write task..."
            />
            <button onClick={() => handleAddTodo()} type="submit">
              {toggleSubmit ? "Add" : "Edit"}
            </button>
          </form>

          {todoItems.map((item) => {
            return (
              <>
                <ul key={item.id} className="all__todos">
                  <li className="single__todo">
                    <span className="todo__text">{item.name}</span>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </>
            );
          })}

          {todoItems.length > 1 ? (
            <button
              onClick={() => {
                setTodoItems([]);
              }}
              className="clear__all"
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
