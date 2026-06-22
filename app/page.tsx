import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/30 via-transparent to-green-100/30 dark:from-green-950/20 dark:to-green-900/20 relative overflow-x-hidden text-foreground">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-400/10 blur-[120px]" />
        <div className="absolute top-[60%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
          Grow Better Habits With Your <span className="text-green-600 dark:text-green-500">Panda Companion</span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
          HabitFlow Panda Jungle is a playfully gamified tracker where building consistency is rewarded. 
          Build streaks, earn bamboo, and transform your jungle one habit at a time.
        </p>
        <Link href="/dashboard" className="mt-10">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl shadow-green-500/20">
            Start Your Journey Now
          </Button>
        </Link>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to stay consistent</h2>
            <p className="text-muted-foreground mt-4">Gamify your life with powerful features built right in.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Icons.CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Schedules</h3>
              <p className="text-muted-foreground">Track habits every day, or only on specific weekdays. Our smart streak engine never breaks your streak on a scheduled off-day.</p>
            </div>
            <div className="bg-card/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Icons.Tent className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Your 3D Panda</h3>
              <p className="text-muted-foreground">Watch your procedural 3D Panda react to your progress! It bounces when you complete habits and evolves as you earn XP.</p>
            </div>
            <div className="bg-card/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Icons.Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bamboo Rewards</h3>
              <p className="text-muted-foreground">Hit milestones and complete daily missions to earn Bamboo. Spend it in The Den to decorate your panda's jungle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it Works</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">1</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5">
                <h4 className="font-bold text-lg mb-1">Create your habits</h4>
                <p className="text-muted-foreground">Set up the goals you want to achieve, assign an icon and color, and pick exactly which days of the week you want to track them.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5">
                <h4 className="font-bold text-lg mb-1">Complete daily missions</h4>
                <p className="text-muted-foreground">Use the Today Dashboard to tick off habits. The streak engine automatically calculates your current and longest streaks.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5">
                <h4 className="font-bold text-lg mb-1">Earn XP and Bamboo</h4>
                <p className="text-muted-foreground">Every completed habit yields +10 Bamboo and +5 XP. Hitting 7-day or 30-day milestones grants massive bonuses!</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">4</div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-lg shadow-green-900/5">
                <h4 className="font-bold text-lg mb-1">Grow your jungle</h4>
                <p className="text-muted-foreground">Use your Bamboo in The Den to buy cool decorations like Lotus Ponds and Bamboo Hats. Watch your Panda evolve as you gain XP!</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="bg-primary/90 backdrop-blur-xl text-primary-foreground rounded-[3rem] p-12 max-w-4xl mx-auto shadow-2xl shadow-primary/20 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to build better habits?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Everything runs securely in your browser. Start growing your virtual panda today!
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-full shadow-xl">
              Launch App
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}