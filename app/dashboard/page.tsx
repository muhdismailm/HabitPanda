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
      // Recalculate streak simulating completion today
      const testDates = [...habit.completedDates, todayStr];
      const streak = calculateCurrentStreak(testDates, habit.schedule);
      
      const { bamboo, xp } = calculateHabitReward(streak);
      addRewards(bamboo, xp);
      
      setToast({ message: `+${bamboo} Bamboo! +${xp} XP!`, visible: true });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen pb-40 overflow-x-hidden">
      <BambooScroll />
      
      <div className="container mx-auto p-6 max-w-4xl relative z-10">
        
        {/* Top Section: Panda Stats */}
        <section className="bg-card text-card-foreground rounded-3xl p-8 border shadow-sm mb-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden shrink-0">
              <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <PandaModel mood={mood} stage={stage.name} />
                <Environment preset="forest" />
              </Canvas>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{stage.name}</h2>
              <p className="text-muted-foreground">Mood: {mood}</p>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-sm space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 font-medium">
                <span>XP Progress</span>
                <span>{panda.totalXP} / {stage.maxXP === Infinity ? "MAX" : stage.maxXP}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000" 
                  style={{ width: `${stage.maxXP === Infinity ? 100 : Math.min(100, (panda.totalXP / stage.maxXP) * 100)}%` }} 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-xl w-fit font-bold">
              <Icons.Leaf className="w-5 h-5" />
              <span>{panda.bamboo} Bamboo</span>
            </div>
          </div>
        </section>

        {/* Middle Section: Today's Habits */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold">Today's Habits</h2>
              <p className="text-muted-foreground mt-1">Check off habits to earn rewards!</p>
            </div>
            <Link href="/habits">
              <Button variant="outline">Manage Habits</Button>
            </Link>
          </div>

          {todaysHabits.length === 0 ? (
            <div className="p-8 text-center bg-card rounded-2xl border border-dashed">
              <p className="text-muted-foreground mb-4">Nothing scheduled for today.</p>
              <Link href="/habits">
                <Button>Add a Habit</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {todaysHabits.map((habit) => {
                const isCompleted = habit.completedDates.includes(todayStr);
                // @ts-ignore
                const Icon = Icons[habit.icon] || Icons.Target;

                return (
                  <div 
                    key={habit.id} 
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer hover:shadow-md ${isCompleted ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}
                    onClick={() => handleToggle(habit.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-colors ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>{habit.name}</h3>
                        <p className="text-xs text-muted-foreground">Tap to toggle completion</p>
                      </div>
                    </div>
                    
                    <div className="px-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground text-transparent'}`}>
                        <Icons.Check className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom Section: Progress Summary */}
        <section className="grid md:grid-cols-2 gap-6 mb-24">
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <h3 className="font-semibold text-muted-foreground mb-4 uppercase tracking-wider text-sm">Daily Progress</h3>
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black">{Math.round(completionRate)}%</span>
              <span className="text-muted-foreground mb-1">completed today</span>
            </div>
            <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
             <h3 className="font-semibold text-muted-foreground mb-4 uppercase tracking-wider text-sm">Jungle Stats</h3>
             <ul className="space-y-3">
               <li className="flex justify-between items-center border-b pb-2">
                 <span>Total Habits</span>
                 <span className="font-bold">{habits.length}</span>
               </li>
               <li className="flex justify-between items-center pb-1">
                 <span>Habits Today</span>
                 <span className="font-bold">{todaysHabits.length}</span>
               </li>
             </ul>
          </div>
        </section>

      </div>

      {/* Floating Reward Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5">
          {toast.message}
        </div>
      )}
    </div>
  );
}