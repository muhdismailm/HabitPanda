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
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50 to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 relative overflow-x-hidden text-foreground">
      
      {/* Panda Den Background - Mountains and Bamboo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute bottom-0 w-full h-96 opacity-5 dark:opacity-10" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#262321', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#262321', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <polygon points="0,300 200,100 400,250 600,80 800,220 1000,120 1200,300 1200,400 0,400" fill="url(#mountainGradient)" />
        </svg>
        <div className="absolute left-0 top-20 opacity-20 dark:opacity-30 text-6xl">🎋</div>
        <div className="absolute right-0 top-40 opacity-20 dark:opacity-30 text-5xl">🎋</div>
        <div className="absolute left-10 bottom-32 opacity-15 dark:opacity-25 text-4xl">🌿</div>
        <div className="absolute right-8 bottom-40 opacity-15 dark:opacity-25 text-5xl">🌿</div>
      </div>

      <div className="container mx-auto p-6 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-stone-900 dark:text-amber-100">🌿 My Habits</h1>
            <p className="text-stone-700 dark:text-amber-200 font-semibold mt-1">Manage your daily goals and track your streaks.</p>
          </div>
          <div className="flex gap-3">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" className="border-2 border-stone-800 dark:border-amber-200 font-bold hover:bg-stone-900 dark:hover:bg-amber-900/40 hover:text-white dark:hover:text-amber-100">Back to Dashboard</Button>
            </Link>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="border-2 border-stone-800 dark:border-amber-200 font-bold bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-500">Create Habit 🎋</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md border-2 border-stone-800 dark:border-amber-200 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="font-black text-xl">Create New Habit</DialogTitle>
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
              <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500 dark:text-amber-300" />
              <Input 
                ref={searchInputRef}
                placeholder="Search habits... (Cmd+F)" 
                className="pl-12 rounded-2xl border-2 border-stone-800 dark:border-amber-200 bg-stone-50/50 dark:bg-stone-900/50 font-semibold placeholder:text-stone-500 dark:placeholder:text-amber-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px] rounded-2xl border-2 border-stone-800 dark:border-amber-200 bg-stone-50/50 dark:bg-stone-900/50 font-bold">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-2 border-stone-800 dark:border-amber-200 rounded-2xl">
                <SelectItem value="newest" className="font-bold">Newest First</SelectItem>
                <SelectItem value="a-z" className="font-bold">A-Z</SelectItem>
                <SelectItem value="streak" className="font-bold">Highest Streak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {habits.length === 0 ? (
          <div className="text-center py-24 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 rounded-3xl border-2 border-dashed border-stone-400 dark:border-amber-700 shadow-sm">
            <Icons.Leaf className="w-20 h-20 mx-auto text-stone-300 dark:text-amber-800 mb-4" />
            <h2 className="text-2xl font-black mb-2 text-stone-900 dark:text-amber-100">No habits yet 🐼</h2>
            <p className="text-stone-700 dark:text-amber-200 font-semibold mb-6">Plant the first seed to start your jungle.</p>
            <Button onClick={() => setIsCreateOpen(true)} className="border-2 border-stone-800 dark:border-amber-200 font-bold bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">Create Your First Habit</Button>
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
                  className="p-5 rounded-3xl border-2 border-stone-800 dark:border-amber-200 bg-gradient-to-br from-white to-stone-50 dark:from-stone-800 dark:to-stone-900 text-card-foreground shadow-md hover:shadow-xl hover:scale-102 transition-all flex flex-col gap-5"
                >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl border-2" style={{ backgroundColor: `${habit.color}15`, color: habit.color, borderColor: habit.color }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-tight text-stone-900 dark:text-amber-100">{habit.name}</h3>
                    <p className="text-xs font-bold text-stone-500 dark:text-amber-300/80 mt-1 uppercase tracking-wider">
                      {habit.schedule.length === 7 ? "Every day" : `${habit.schedule.length} days/week`}
                    </p>
                  </div>
                </div>

                {/* Past 7 Days Tracker */}
                <div className="flex justify-between items-center bg-stone-100/50 dark:bg-stone-900/50 p-2 rounded-2xl border-2 border-stone-200 dark:border-stone-700">
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
                        className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-colors ${!isScheduled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-stone-800'}`}
                      >
                        <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-amber-300/70">
                          {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
                        </span>
                        <div 
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'bg-green-500 border-green-600 dark:bg-green-600 dark:border-green-500 text-white' : 'border-stone-300 dark:border-stone-600 text-transparent'}`}
                        >
                          <Icons.Check className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-stone-100/50 dark:bg-stone-900/50 p-3 rounded-2xl text-center border-2 border-stone-200 dark:border-stone-700">
                      <p className="text-stone-500 dark:text-amber-300/80 text-[10px] font-black uppercase tracking-widest mb-1">Current</p>
                      <p className="text-2xl font-black text-stone-900 dark:text-amber-100">{currentStreak} <span className="text-xs font-bold text-stone-500 dark:text-amber-300/80 uppercase">days</span></p>
                    </div>
                    <div className="bg-stone-100/50 dark:bg-stone-900/50 p-3 rounded-2xl text-center border-2 border-stone-200 dark:border-stone-700">
                      <p className="text-stone-500 dark:text-amber-300/80 text-[10px] font-black uppercase tracking-widest mb-1">Longest</p>
                      <p className="text-2xl font-black text-stone-900 dark:text-amber-100">{longestStreak} <span className="text-xs font-bold text-stone-500 dark:text-amber-300/80 uppercase">days</span></p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-auto pt-4 border-t-2 border-stone-100 dark:border-stone-800">
                    <Button variant="ghost" size="sm" className="h-9 font-bold text-stone-600 dark:text-amber-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl" onClick={() => setEditingId(habit.id)}>Edit</Button>
                    <Button variant="destructive" size="sm" className="h-9 font-bold rounded-xl bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 border-2 border-transparent" onClick={() => deleteHabit(habit.id)}>Delete</Button>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        )}

        <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
          <DialogContent className="max-w-md border-2 border-stone-800 dark:border-amber-200 rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-black text-xl">Edit Habit</DialogTitle>
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
    </div>
  );
}