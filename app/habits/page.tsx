"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as Icons from "lucide-react";
import { calculateCurrentStreak, calculateLongestStreak, normalizeDate } from "@/lib/streak";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HabitsPage() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleCompletion, isLoaded } = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + F to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // N to open create modal (only if not typing in an input)
      if (e.key === "n" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsCreateOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isLoaded) return null;

  const handleCreate = (data: HabitFormValues) => {
    addHabit(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data: HabitFormValues) => {
    if (editingId) {
      updateHabit(editingId, data);
      setEditingId(null);
    }
  };

  // Derived State: Filter & Sort
  const filteredHabits = habits.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortOption === "a-z") return a.name.localeCompare(b.name);
    if (sortOption === "streak") {
      return calculateCurrentStreak(b.completedDates, b.schedule) - calculateCurrentStreak(a.completedDates, a.schedule);
    }
    return 0; // "newest" by default, assumes habits array is stored chronologically
  });

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">My Habits</h1>
          <p className="text-muted-foreground mt-1">Manage your daily goals and track your streaks.</p>
        </div>
        <div className="flex gap-3">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>Create Habit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
              </DialogHeader>
              <HabitForm onSubmit={handleCreate} onCancel={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Toolbar: Search & Sort */}
      {habits.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              ref={searchInputRef}
              placeholder="Search habits... (Cmd+F)" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="streak">Highest Streak</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {habits.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl border shadow-sm">
          <Icons.Leaf className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
          <p className="text-muted-foreground mb-6">Plant the first seed to start your jungle.</p>
          <Button onClick={() => setIsCreateOpen(true)}>Create Your First Habit</Button>
        </div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
          {sortedHabits.map((habit) => {
            // @ts-ignore
            const Icon = Icons[habit.icon] || Icons.Target;
            const currentStreak = calculateCurrentStreak(habit.completedDates, habit.schedule);
            const longestStreak = calculateLongestStreak(habit.completedDates, habit.schedule);

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={habit.id} 
                className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
              >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${habit.color}15`, color: habit.color }}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{habit.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {habit.schedule.length === 7 ? "Every day" : `${habit.schedule.length} days/week`}
                  </p>
                </div>
              </div>

              {/* Past 7 Days Tracker */}
              <div className="flex justify-between items-center bg-muted/30 p-2 rounded-xl border">
                {[...Array(7)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - i));
                  const dateStr = normalizeDate(d);
                  const isScheduled = habit.schedule.includes(d.getDay());
                  const isCompleted = habit.completedDates.includes(dateStr);
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => toggleCompletion(habit.id, d)}
                      disabled={!isScheduled}
                      className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${!isScheduled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-muted/80'}`}
                    >
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                        {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
                      </span>
                      <div 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 text-transparent'}`}
                      >
                        <Icons.Check className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 p-3 rounded-xl text-center border">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-1">Current</p>
                    <p className="text-2xl font-bold">{currentStreak} <span className="text-xs font-normal text-muted-foreground">days</span></p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl text-center border">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-1">Longest</p>
                    <p className="text-2xl font-bold">{longestStreak} <span className="text-xs font-normal text-muted-foreground">days</span></p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-auto pt-4 border-t">
                  <Button variant="ghost" size="sm" className="h-8" onClick={() => setEditingId(habit.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" className="h-8" onClick={() => deleteHabit(habit.id)}>Delete</Button>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          {editingId && (
            <HabitForm
              initialValues={habits.find((h) => h.id === editingId)}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}