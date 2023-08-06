type TodoType = Readonly<{
  id: string;
  appId: string;
  nickname: string;
  email: string;
  phone: string;
  date: number;
  todo: string;
  done: boolean;
  year: number;
  month: number;
  day: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}>;
