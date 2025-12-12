type Todo = {
  title: string;
  completed?: boolean;
  assignedTo?: string | null;
  id: string;
};

type FormState = {
  message: string;
  ok: boolean;
};
