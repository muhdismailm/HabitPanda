import { REWARDS, PANDA_STAGES } from "./constants";
import { Habit } from "@/types/habit";
import { normalizeDate } from "./streak";

export function getPandaStage(xp: number) {
  if (xp <= PANDA_STAGES.BABY.maxXP) return PANDA_STAGES.BABY;
  if (xp <= PANDA_STAGES.ADULT.maxXP) return PANDA_STAGES.ADULT;
  return PANDA_STAGES.ELDER;
}

export function calculateHabitReward(currentStreak: number): { bamboo: number; xp: number } {
  let bamboo = REWARDS.BAMBOO_PER_HABIT;
  let xp = REWARDS.XP_PER_HABIT;

  if (currentStreak === 7) {
    bamboo += REWARDS.STREAK_7_BAMBOO;
  } else if (currentStreak === 30) {
    bamboo += REWARDS.STREAK_30_BAMBOO;
  }

  return { bamboo, xp };
}

export function calculatePandaMood(habits: Habit[]): "Happy" | "Neutral" | "Sad" {
  if (habits.length === 0) return "Neutral";

  const todayStr = normalizeDate(new Date());
  const dayOfWeek = new Date().getDay();

  // Find habits scheduled for today
  const todaysHabits = habits.filter((h) => h.schedule.includes(dayOfWeek));
  
  if (todaysHabits.length === 0) return "Neutral";

  const completedToday = todaysHabits.filter((h) => h.completedDates.includes(todayStr)).length;
  const completionRate = completedToday / todaysHabits.length;

  if (completionRate === 1) return "Happy";
  if (completionRate >= 0.5) return "Neutral";
  return "Sad";
}
