"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, HabitFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Book, Dumbbell, Heart, Coffee, Moon, Sun, Music, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  Droplets, Book, Dumbbell, Heart, Coffee, Moon, Sun, Music, Zap, Target
} as const;

export type IconName = keyof typeof ICONS;

const COLORS = [
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Violet
  "#ec4899", // Pink
];

const DAYS = [
  { id: 0, label: "S" },
  { id: 1, label: "M" },
  { id: 2, label: "T" },
  { id: 3, label: "W" },
  { id: 4, label: "T" },
  { id: 5, label: "F" },
  { id: 6, label: "S" },
];

interface HabitFormProps {
  initialValues?: Partial<HabitFormValues>;
  onSubmit: (data: HabitFormValues) => void;
  onCancel?: () => void;
}

export function HabitForm({ initialValues, onSubmit, onCancel }: HabitFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: initialValues?.name || "",
      icon: initialValues?.icon || "Target",
      color: initialValues?.color || COLORS[0],
      schedule: initialValues?.schedule || [0, 1, 2, 3, 4, 5, 6],
    },
  });

  const selectedIcon = watch("icon");
  const selectedColor = watch("color");
  const selectedSchedule = watch("schedule") || [];

  const toggleDay = (dayId: number) => {
    const current = selectedSchedule;
    const updated = current.includes(dayId)
      ? current.filter((id) => id !== dayId)
      : [...current, dayId];
    setValue("schedule", updated, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-6">
      {/* Name */}
      <div className="space-y-1 md:space-y-2">
        <label className="text-sm md:text-base font-bold text-stone-900 dark:text-amber-100">Habit Name</label>
        <Input 
          placeholder="e.g. Drink 2L Water" 
          className="h-9 md:h-12 rounded-xl md:rounded-2xl border-2 border-stone-800 dark:border-amber-200 font-semibold text-sm md:text-base bg-stone-50/50 dark:bg-stone-900/50" 
          {...register("name")} 
        />
        {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
      </div>

      {/* Icon Selection */}
      <div className="space-y-1 md:space-y-2">
        <label className="text-sm md:text-base font-bold text-stone-900 dark:text-amber-100">Icon</label>
        <div className="grid grid-cols-5 sm:flex sm:flex-wrap gap-2 md:gap-2">
          {Object.entries(ICONS).map(([name, IconComp]) => (
            <button
              key={name}
              type="button"
              onClick={() => setValue("icon", name, { shouldValidate: true })}
              className={cn(
                "p-1.5 md:p-3 rounded-xl md:rounded-2xl border-2 transition-all flex items-center justify-center",
                selectedIcon === name 
                  ? "border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                  : "border-stone-800/20 dark:border-amber-200/20 hover:border-stone-800 dark:hover:border-amber-200 text-stone-600 dark:text-stone-400"
              )}
            >
              <IconComp className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          ))}
        </div>
        {errors.icon && <p className="text-xs text-red-500 font-bold">{errors.icon.message}</p>}
      </div>

      {/* Color Selection */}
      <div className="space-y-1 md:space-y-2">
        <label className="text-sm md:text-base font-bold text-stone-900 dark:text-amber-100">Color</label>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color, { shouldValidate: true })}
              className={cn(
                "w-7 h-7 md:w-10 md:h-10 rounded-full border-2 transition-transform shrink-0",
                selectedColor === color ? "scale-110 border-stone-900 dark:border-white shadow-md" : "border-stone-800/20 dark:border-amber-200/20 hover:scale-105"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {errors.color && <p className="text-xs text-red-500 font-bold">{errors.color.message}</p>}
      </div>

      {/* Schedule */}
      <div className="space-y-1 md:space-y-2">
        <label className="text-sm md:text-base font-bold text-stone-900 dark:text-amber-100">Schedule</label>
        <p className="text-xs text-stone-600 dark:text-amber-200/70 mb-2">Select the days you want to track this habit.</p>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {DAYS.map((day) => {
            const isSelected = selectedSchedule.includes(day.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDay(day.id)}
                className={cn(
                  "w-7 h-7 md:w-10 md:h-10 rounded-full font-black text-xs md:text-sm transition-colors shrink-0 border-2 flex items-center justify-center",
                  isSelected
                    ? "bg-green-600 border-green-700 text-white shadow-inner"
                    : "bg-stone-100 dark:bg-stone-800 border-stone-800/20 dark:border-amber-200/20 text-stone-500 dark:text-amber-300/50 hover:bg-stone-200 dark:hover:bg-stone-700"
                )}
              >
                {day.label}
              </button>
            );
          })}
        </div>
        {errors.schedule && <p className="text-xs text-red-500 font-bold">{errors.schedule.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-1 md:pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="h-9 md:h-10 text-sm border-2 border-stone-800 dark:border-amber-200 font-bold hover:bg-stone-100 dark:hover:bg-amber-900/20 rounded-xl md:rounded-2xl">
            Cancel
          </Button>
        )}
        <Button type="submit" className="h-9 md:h-10 text-sm bg-green-600 hover:bg-green-700 text-white font-bold border-2 border-green-800 dark:border-green-500 rounded-xl md:rounded-2xl">
          Save Habit
        </Button>
      </div>
    </form>
  );
}