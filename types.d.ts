type Todo = {
  title: string;
  completed?: boolean;
  assignedTo?: string | null;
  id: string;
  createdBy: User;
};

type User = {
  id: number;
  username: string;
};

type FormState = {
  message: string;
  ok: boolean;
};
