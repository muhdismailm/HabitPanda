

"use client";

import { useHabits } from "@/hooks/useHabits";
import { usePanda } from "@/hooks/usePanda";
import { BambooScroll } from "@/components/dashboard/BambooScroll";
import { calculateHabitReward, getPandaStage, calculatePandaMood } from "@/lib/rewards";
import { calculateCurrentStreak, normalizeDate } from "@/lib/streak";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { PandaModel } from "@/components/panda/PandaModel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";

export default function DashboardPage() {
  const { habits, toggleCompletion, isLoaded: habitsLoaded } = useHabits();
  const { panda, addRewards, isLoaded: pandaLoaded } = usePanda();
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  if (!habitsLoaded || !pandaLoaded) return null;

  const todayStr = normalizeDate(new Date());
  const dayOfWeek = new Date().getDay();

  const todaysHabits = habits.filter((h) => h.schedule.includes(dayOfWeek));
  const completedToday = todaysHabits.filter((h) => h.completedDates.includes(todayStr)).length;
  const completionRate = todaysHabits.length > 0 ? (completedToday / todaysHabits.length) * 100 : 0;

  const stage = getPandaStage(panda.totalXP);
  const mood = calculatePandaMood(habits);

  const handleToggle = (id: string) => {
    const isCompletedNow = toggleCompletion(id, new Date());

    if (isCompletedNow) {
      const habit = habits.find(h => h.id === id)!;
      const testDates = [...habit.completedDates, todayStr];
      const streak = calculateCurrentStreak(testDates, habit.schedule);

      const { bamboo, xp } = calculateHabitReward(streak);
      addRewards(bamboo, xp);

      setToast({ message: `+${bamboo} 🎋 Bamboo! +${xp} XP!`, visible: true });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-40 overflow-x-hidden bg-gradient-to-b from-stone-50 via-amber-50 to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 relative">

      {/* Panda Den Background - Mountains and Bamboo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Mountain silhouettes */}
        <svg className="absolute bottom-0 w-full h-96 opacity-5 dark:opacity-10" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#262321', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#262321', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <polygon points="0,300 200,100 400,250 600,80 800,220 1000,120 1200,300 1200,400 0,400" fill="url(#mountainGradient)" />
        </svg>

        {/* Bamboo stalks on sides */}
        <div className="absolute left-0 top-20 opacity-20 dark:opacity-30 text-6xl">🎋</div>
        <div className="absolute right-0 top-40 opacity-20 dark:opacity-30 text-5xl">🎋</div>
        <div className="absolute left-10 bottom-32 opacity-15 dark:opacity-25 text-4xl">🌿</div>
        <div className="absolute right-8 bottom-40 opacity-15 dark:opacity-25 text-5xl">🌿</div>
      </div>

      <BambooScroll />

      <div className="container mx-auto p-6 max-w-4xl relative z-10">

        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-stone-800 dark:border-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/20 font-bold gap-2"
            >
              <Icons.ArrowLeft className="w-4 h-4" /> Home
            </Button>
          </Link>
          <div className="flex gap-3">
            <Link href="/den">
              <Button
                variant="outline"
                className="border-2 border-stone-800 dark:border-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/20 font-bold gap-2 text-amber-700 dark:text-amber-400"
              >
                <Icons.Store className="w-4 h-4" /> The Den
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/settings">
              <Button
                variant="outline"
                size="icon"
                className="border-2 border-stone-800 dark:border-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <Icons.Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Section: Panda Stats - Panda Den Theme */}
        <section className="mt-16 md:mt-0 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-900 dark:to-amber-950 rounded-2xl md:rounded-3xl p-4 md:p-8 border-2 border-stone-800 dark:border-amber-200 shadow-lg mb-6 md:mb-8 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between relative overflow-hidden">

          {/* Decorative leaves in corner */}
          <div className="absolute top-4 right-4 text-4xl opacity-20">🍃</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-15">🎋</div>

          {/* Panda Display */}
          <div className="flex items-center gap-4 md:gap-6 relative z-10 w-full md:w-auto">
            <div className="w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-amber-100 to-stone-100 dark:from-amber-900/30 dark:to-stone-800/30 rounded-2xl md:rounded-3xl flex items-center justify-center relative overflow-hidden shrink-0 border-2 border-stone-800 dark:border-amber-200">
              <Canvas camera={{ position: [0, 2.0, 6], fov: 55 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <PandaModel mood={mood} stage={stage.name} equipped={panda.equipped} />
                <Environment preset="forest" />
              </Canvas>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-stone-900 dark:text-amber-100">{stage.name}</h2>
              <p className="text-xs md:text-base text-stone-700 dark:text-amber-200 font-semibold">🎭 Mood: {mood}</p>
              <p className="text-[10px] md:text-sm text-stone-600 dark:text-stone-400 mt-1">Your panda companion</p>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="flex-1 w-full max-w-sm space-y-4 relative z-10">
            {/* XP Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold text-stone-900 dark:text-amber-100">
                <span>✨ XP Progress</span>
                <span>{panda.totalXP} / {stage.maxXP === Infinity ? "MAX" : stage.maxXP}</span>
              </div>
              <div className="h-4 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden border border-stone-800 dark:border-amber-200">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 dark:from-amber-500 dark:to-yellow-500 transition-all duration-1000"
                  style={{ width: `${stage.maxXP === Infinity ? 100 : Math.min(100, (panda.totalXP / stage.maxXP) * 100)}%` }}
                />
              </div>
            </div>

            {/* Bamboo Counter */}
            <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 p-2 md:p-4 rounded-xl md:rounded-2xl border-2 border-emerald-700 dark:border-green-400 font-bold text-stone-900 dark:text-green-100">
              <span className="text-xl md:text-3xl">🎋</span>
              <div>
                <div className="text-[9px] md:text-xs text-stone-700 dark:text-green-300 uppercase tracking-wider">Bamboo</div>
                <div className="text-lg md:text-2xl font-black text-emerald-700 dark:text-green-300">{panda.bamboo}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Completion Rate Indicator */}
        <div className="mt-12 md:mt-0 mb-6 md:mb-8 bg-gradient-to-r from-amber-100 to-stone-100 dark:from-amber-900/30 dark:to-stone-800/30 rounded-xl md:rounded-2xl p-2.5 md:p-4 border-2 border-stone-800 dark:border-amber-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm md:text-base text-stone-900 dark:text-amber-100">Today's Progress</h3>
            <p className="text-xs md:text-sm text-stone-700 dark:text-amber-200">{completedToday} of {todaysHabits.length} habits completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-black text-stone-900 dark:text-amber-100">{Math.round(completionRate)}%</div>
            <div className="h-1.5 w-16 md:w-20 bg-stone-300 dark:bg-stone-700 rounded-full overflow-hidden mt-1 border border-stone-700 dark:border-amber-200">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </div>

        {/* Middle Section: Today's Habits */}
        <section className="mt-18 md:mt-0 mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-3 sm:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-black text-stone-900 dark:text-amber-100">🎋 Today's Habits</h2>
              <p className="text-xs md:text-base text-stone-700 dark:text-amber-200 font-semibold mt-0.5 md:mt-1">Complete habits to earn bamboo & XP!</p>
            </div>
            <Link href="/habits" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="mt-8 md:mt-3 w-full sm:w-auto border-2 border-stone-800 dark:border-amber-200 font-bold hover:bg-stone-900 dark:hover:bg-amber-900/40 hover:text-white dark:hover:text-amber-100 flex justify-center"
              >
                Manage Habits
              </Button>
            </Link>
          </div>

          {todaysHabits.length === 0 ? (
            <div className="p-8 text-center bg-gradient-to-br from-stone-100 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 rounded-3xl border-2 border-dashed border-stone-400 dark:border-amber-700">
              <p className="text-stone-700 dark:text-amber-200 mb-4 font-semibold">🏔️ Nothing scheduled for today.</p>
              <Link href="/habits">
                <Button className="bg-stone-900 dark:bg-amber-700 hover:bg-stone-800 dark:hover:bg-amber-600 text-white font-bold">
                  Create Your First Habit
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-10 md:mt-0 grid gap-4">
              {todaysHabits.map((habit, idx) => {
                const isCompleted = habit.completedDates.includes(todayStr);
                // @ts-ignore
                const Icon = Icons[habit.icon] || Icons.Target;

                return (
                  <div
                    key={habit.id}
                    className={`p-3 md:p-5 rounded-xl md:rounded-3xl border-2 transition-all transform hover:scale-102 cursor-pointer shadow-md hover:shadow-lg ${isCompleted
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border-green-500 dark:border-green-400'
                      : 'bg-gradient-to-br from-white to-stone-50 dark:from-stone-800 dark:to-stone-900 border-stone-800 dark:border-amber-200'
                      }`}
                    onClick={() => handleToggle(habit.id)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-4 min-w-0">
                        {/* Icon Badge */}
                        <div className={`p-1.5 md:p-3 rounded-lg md:rounded-2xl transition-all border-2 font-bold text-base md:text-lg shrink-0 ${isCompleted
                          ? 'bg-green-500 dark:bg-green-600 text-white border-green-600 dark:border-green-500'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-amber-200 border-stone-800 dark:border-amber-200'
                          }`}>
                          <Icon className="w-4 h-4 md:w-6 md:h-6" />
                        </div>

                        {/* Habit Info */}
                        <div className="min-w-0 flex-1 pr-2">
                          <h3 className={`font-black text-sm md:text-lg transition-all truncate ${isCompleted
                            ? 'line-through text-stone-500 dark:text-stone-400'
                            : 'text-stone-900 dark:text-amber-100'
                            }`}>
                            {habit.name}
                          </h3>
                          <p className="text-[9px] md:text-xs text-stone-600 dark:text-amber-300 font-semibold truncate">Tap to complete</p>
                        </div>
                      </div>

                      {/* Completion Circle */}
                      <div className={`w-6 h-6 md:w-10 md:h-10 shrink-0 rounded-full border-2 md:border-3 flex items-center justify-center transition-all font-bold text-base md:text-lg ${isCompleted
                        ? 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500 text-white'
                        : 'border-stone-800 dark:border-amber-200 text-stone-400'
                        }`}>
                        {isCompleted && <Icons.Check className="w-3 h-3 md:w-6 md:h-6" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Activity Heatmap */}
        <div className="mb-12">
          <h3 className="text-2xl font-black text-stone-900 dark:text-amber-100 mb-4">📊 Activity Heatmap</h3>
          <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 rounded-3xl p-6 border-2 border-stone-800 dark:border-amber-200">
            <ActivityHeatmap habits={habits} />
          </div>
        </div>

        {/* Bottom Section: Summary Stats */}
        <section className="grid md:grid-cols-3 gap-4 md:gap-6 mb-24">
          {/* Daily Progress */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-blue-700 dark:border-blue-400 shadow-md">
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2 md:mb-4 uppercase tracking-wider text-xs md:text-sm">⚡ Daily Progress</h3>
            <div className="space-y-1 md:space-y-3">
              <div className="flex items-end gap-3">
                <span className="text-4xl md:text-5xl font-black text-blue-700 dark:text-blue-300">{Math.round(completionRate)}%</span>
              </div>
              <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 font-semibold">{completedToday} of {todaysHabits.length} completed</p>
            </div>
          </div>

          {/* Total Stats */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-800/20 p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-emerald-700 dark:border-green-400 shadow-md">
            <h3 className="font-bold text-emerald-900 dark:text-green-200 mb-2 md:mb-4 uppercase tracking-wider text-xs md:text-sm">🏔️ Jungle Stats</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex justify-between items-center font-bold text-emerald-900 dark:text-green-200">
                <span className="text-sm md:text-base">Total Habits</span>
                <span className="text-xl md:text-2xl">{habits.length}</span>
              </li>
              <li className="flex justify-between items-center font-bold text-emerald-900 dark:text-green-200">
                <span className="text-sm md:text-base">Active Today</span>
                <span className="text-xl md:text-2xl">{todaysHabits.length}</span>
              </li>
            </ul>
          </div>

          {/* Panda Level */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-800/20 p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-amber-700 dark:border-yellow-400 shadow-md">
            <h3 className="font-bold text-amber-900 dark:text-yellow-200 mb-2 md:mb-4 uppercase tracking-wider text-xs md:text-sm">🐼 Panda Level</h3>
            <div className="space-y-1 md:space-y-3">
              <div className="text-2xl md:text-3xl font-black text-amber-700 dark:text-yellow-300">{stage.name}</div>
              <div className="text-xs md:text-sm text-amber-800 dark:text-yellow-300 font-semibold">Total XP: {panda.totalXP}</div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Reward Toast - Panda Style */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 text-white px-8 py-4 rounded-full font-black shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 border-2 border-green-700 dark:border-green-400 text-lg">
          🎉 {toast.message}
        </div>
      )}
    </div>
  );
}