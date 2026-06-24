import { PandaState } from "@/types/panda";

export const INITIAL_PANDA_STATE: PandaState = {
  bamboo: 0,
  totalXP: 0,
  inventory: [],
  equipped: [],
};

export const REWARDS = {
  BAMBOO_PER_HABIT: 10,
  XP_PER_HABIT: 5,
  STREAK_7_BAMBOO: 25,
  STREAK_30_BAMBOO: 100,
};

export const PANDA_STAGES = {
  BABY: { maxXP: 99, name: "Baby Panda" },
  ADULT: { maxXP: 499, name: "Adult Panda" },
  ELDER: { maxXP: Infinity, name: "Elder Panda" },
};
