export interface Todo {
  id: number;
  completed: boolean;
  title: string;
  userId: number;
  favorite?: boolean;
}
