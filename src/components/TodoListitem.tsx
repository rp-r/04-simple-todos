import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import type {Todo} from "../types/Todo.types"
interface TodoListitemProps
{


    todo:Todo;

}

const TodoListitem:React.FC<TodoListitemProps> =({todo})=>
{
    return(<ListGroup.Item 
       key={todo.id}
       //className={todo.completed?'completed':""}
       >
        <span className="todo-title">{todo.title}</span>

        <div> 
          <Button size="sm" variant="outline-warning"
        //onClick={()=>handleToggleTodo(todo)}
        >Toggle</Button>
        
         <Button size="sm" variant="outline-danger"
        //onClick={()=>handleDeleteTodo(todo)}
        >Delete</Button>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default TodoListitem;
