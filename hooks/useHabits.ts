"use client";

import { useState, useEffect } from "react";
import { Habit } from "@/types/habit";
import { getStorage, setStorage } from "@/lib/storage";
import { normalizeDate } from "@/lib/streak";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = getStorage<Habit[]>("habits", []);
    setHabits(stored);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setStorage("habits", habits);
    }
  }, [habits, isLoaded]);

  const addHabit = (habit: Omit<Habit, "id" | "createdAt" | "completedDates">) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Omit<Habit, "id" | "createdAt">>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const toggleCompletion = (id: string, date: Date | string) => {
    const dateStr = normalizeDate(date);
    let isCompletedNow = false;

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const hasCompleted = h.completedDates.includes(dateStr);
          isCompletedNow = !hasCompleted;
          return {
            ...h,
            completedDates: hasCompleted
              ? h.completedDates.filter((d) => d !== dateStr)
              : [...h.completedDates, dateStr],
          };
        }
        return h;
      })
    );

    return isCompletedNow;
  };

  return {
    habits,
    isLoaded,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
  };
}
