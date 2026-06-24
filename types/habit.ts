export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  schedule: number[];
  completedDates: string[];
  createdAt: string;
}