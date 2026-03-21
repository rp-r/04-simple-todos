import "./assets/App.scss";
import Container from "react-bootstrap/Container";
import type { Todo } from "../src/types/Todo.types";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import TodoCounter from "./components/TodoCounter";
import TodoListitem from "./components/TodoListitem";

const intialTodos: Todo[] = [
  { id: 1, title: "Make coffee", completed: true },
  { id: 2, title: "Drink coffee", completed: false },
  { id: 3, title: "Drink MOAR coffee", completed: false },
  { id: 4, title: "Drink ALL ZE  coffee", completed: false },
];

function App() {
  const [inputtodotitle, setInputtodotitle] = useState("");

  const [inputtodotitle, setInputtodotitle] = useState("");

  const [todos, setTodos] = useState(intialTodos);

  const trimmedinputtodotitle = inputtodotitle.trim();

  const handleAdd = (e: React.SubmitEvent) => {
    e.preventDefault();

    //CREATE NEW todos

    setTodos([
      ...todos,
      {
        id: Math.max(0, ...todos.map((todo) => todo.id)) + 1,
        title: inputtodotitle.trim(),
        completed: false,
      },
    ]);
    setInputtodotitle("");
  };

  const handleToggleTodo = (todo: Todo) => {
    todo.completed = !todo.completed;
    setTodos([...todos]);
  };

  const handleDeleteTodo = (todo: Todo) => {
    setTodos(todos.filter((td) => td.id !== todo.id));
  };

  //DERIVE LIST OF COMPLETED  /INCOMPLETE TODOS

  const completedtodos = todos.filter((todo) => todo.completed);
  const incompletedtodos = todos.filter((todo) => !todo.completed);
  return (
    <>
      <p className="text-primary"> IN THE NAME OF ALLLAH</p>
      <Container>
        <h1> Simple todos</h1>
        <Form onSubmit={handleAdd} className="mb-4">
          <InputGroup>
            <Form.Control
              aria-label="New todo title"
              onChange={(e) => setInputtodotitle(e.target.value)}
              value={inputtodotitle}
              placeholder="learn abour GTD"
              required
            />
            <Button
              disabled={trimmedinputtodotitle.length < 3}
              variant="success"
              type="submit"
            >
              {" "}
              Create
            </Button>
          </InputGroup>

          {trimmedinputtodotitle.length > 0 &&
            trimmedinputtodotitle.length < 3 && (
              <Form.Text className="text-danger text-small">
                That's a too short to do ,better to do it right away instead!
              </Form.Text>
            )}
        </Form>
        {todos.length ? (
          <>
            <h2 className="h5 mb-2">💪🏻 stuff I got to do</h2>
            <ListGroup className="todolist mb-3">
              {incompletedtodos.map((todo) => (
                <TodoListitem todo={todo} key={todo.id} />
              ))}
            </ListGroup>
            <h2 className="h5 mb-2">🙄 stuff I have completed </h2>
            <ListGroup className="todolist mb-3">
              {completedtodos.map((todo) => (
                <TodoListitem key={todo.id} todo={todo} />
              ))}
            </ListGroup>

            <TodoCounter
              completed={completedtodos.length}
              total={todos.length}
            />
          </>
        ) : (
          <p> You are not go todos to do. No todos are left</p>
        )}
      </Container>
    </>
  );
}

export default App;
