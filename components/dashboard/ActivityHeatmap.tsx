"use client";

import { normalizeDate } from "@/lib/streak";
import { Habit } from "@/types/habit";
import { useMemo } from "react";

interface ActivityHeatmapProps {
  habits: Habit[];
}

export function ActivityHeatmap({ habits }: ActivityHeatmapProps) {
  const days = 90; // Last 90 days

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    
    // Initialize last 90 days
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      map.set(normalizeDate(d), 0);
    }

    // Populate with completions
    habits.forEach(habit => {
      habit.completedDates.forEach(dateStr => {
        if (map.has(dateStr)) {
          map.set(dateStr, map.get(dateStr)! + 1);
        }
      });
    });

    return Array.from(map.entries());
  }, [habits]);

  // Determine intensity based on completions
  const getColor = (count: number) => {
    if (count === 0) return "bg-muted/50 dark:bg-muted/20";
    if (count === 1) return "bg-green-300 dark:bg-green-900";
    if (count === 2) return "bg-green-400 dark:bg-green-700";
    if (count === 3) return "bg-green-500 dark:bg-green-500";
    return "bg-green-600 dark:bg-green-400"; // 4+
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-6 border shadow-sm mt-8">
      <h3 className="font-semibold text-lg mb-4">Activity Heatmap (Last 90 Days)</h3>
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin">
        {activityMap.map(([date, count]) => (
          <div 
            key={date}
            className={`w-4 h-4 rounded-sm flex-shrink-0 transition-colors ${getColor(count)}`}
            title={`${date}: ${count} habits completed`}
          />
        ))}
      </div>
      <div className="flex justify-end items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted/50 dark:bg-muted/20" />
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
