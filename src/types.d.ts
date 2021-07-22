interface Todo {
  id: integer;
  text: string;
  complete: boolean;
}

type GetTodo = () => void;

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (text: string) => void;

type DeleteTodo = (selectedTodo: Todo) => void;
