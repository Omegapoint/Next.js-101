export interface Todos {
  todos: Todo[];
}

export type Todo = {
  userId: number;
  title: string;
  completed?: boolean;
  id: string;
};
