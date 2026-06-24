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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Habit Name</label>
        <Input placeholder="e.g. Drink 2L Water" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      {/* Icon Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Icon</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ICONS).map(([name, IconComp]) => (
            <button
              key={name}
              type="button"
              onClick={() => setValue("icon", name, { shouldValidate: true })}
              className={cn(
                "p-2 rounded-lg border transition-colors",
                selectedIcon === name ? "border-primary bg-primary/10" : "border-border hover:bg-muted"
              )}
            >
              <IconComp className="w-5 h-5" />
            </button>
          ))}
        </div>
        {errors.icon && <p className="text-xs text-destructive">{errors.icon.message}</p>}
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue("color", color, { shouldValidate: true })}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-transform",
                selectedColor === color ? "scale-110 border-foreground" : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        {errors.color && <p className="text-xs text-destructive">{errors.color.message}</p>}
      </div>

      {/* Schedule */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Schedule</label>
        <p className="text-xs text-muted-foreground mb-2">Select the days you want to track this habit.</p>
        <div className="flex gap-2">
          {DAYS.map((day) => {
            const isSelected = selectedSchedule.includes(day.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDay(day.id)}
                className={cn(
                  "w-10 h-10 rounded-full font-medium text-sm transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {day.label}
              </button>
            );
          })}
        </div>
        {errors.schedule && <p className="text-xs text-destructive">{errors.schedule.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Habit</Button>
      </div>
    </form>
  );
}
