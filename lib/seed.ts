"use client";

import { Habit } from "@/types/habit";
import { getStorage, setStorage } from "./storage";

const DEFAULT_HABITS: Habit[] = [
  {
    id: "seed-water",
    name: "Drink 2L Water",
    icon: "Droplets",
    color: "#3b82f6",
    schedule: [0, 1, 2, 3, 4, 5, 6],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-read",
    name: "Read 20 Minutes",
    icon: "Book",
    color: "#8b5cf6",
    schedule: [0, 1, 2, 3, 4, 5, 6],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-exercise",
    name: "Exercise",
    icon: "Dumbbell",
    color: "#ef4444",
    schedule: [1, 3, 5], // Mon, Wed, Fri
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
];

export function runSeed() {
  if (typeof window === "undefined") return;

  const hasSeeded = localStorage.getItem("has_seeded");
  if (!hasSeeded) {
    const existingHabits = getStorage<Habit[]>("habits", []);
    if (existingHabits.length === 0) {
      setStorage("habits", DEFAULT_HABITS);
    }
    localStorage.setItem("has_seeded", "true");
  }
}