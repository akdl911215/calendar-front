type TodoType = Readonly<{
  id: string;
  author_id: string;
  date: Date;
  todo: string;
  done: boolean;
  month: number;
  day: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}>;
