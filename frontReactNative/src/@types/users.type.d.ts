type UsersType = Readonly<{
  id: string;
  app_id: string;
  nickname: string;
  password: string;
  phone: string;
  email: string;
  refresh_token: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}>;
