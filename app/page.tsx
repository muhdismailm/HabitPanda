import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50 to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 relative overflow-x-hidden text-foreground">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl text-stone-900 dark:text-amber-100">
            Grow Better Habits With Your <span className="text-emerald-600 dark:text-green-500">Panda Companion</span>
          </h1>
          <p className="mt-6 text-xl text-stone-700 dark:text-amber-200 font-semibold max-w-2xl">
            Build better habits with your panda companion. Stay consistent, earn rewards, grow your streaks, and transform a small bamboo grove into a thriving jungle of achievement.
          </p>
          <Link href="/dashboard" className="mt-10">
            <Button size="lg" className="text-lg px-8 py-6 rounded-3xl shadow-xl shadow-green-500/20 border-2 border-stone-800 dark:border-amber-200 font-bold bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-500">
              Start Your Journey Now 🎋
            </Button>
          </Link>
        </section>

        {/* Key Features Section */}
        <section className="py-24 px-6 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 dark:text-amber-100">Everything you need to stay consistent</h2>
              <p className="text-stone-700 dark:text-amber-200 font-semibold mt-4">Gamify your life with powerful features built right in.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-amber-200 border-2 border-stone-800 dark:border-amber-200 rounded-2xl flex items-center justify-center mb-6 font-bold">
                  <Icons.CalendarCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-stone-900 dark:text-amber-100">Custom Schedules</h3>
                <p className="text-stone-700 dark:text-amber-200 font-semibold">Track habits every day, or only on specific weekdays. Our smart streak engine never breaks your streak on a scheduled off-day.</p>
              </div>
              <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border-2 border-amber-600 dark:border-amber-400 rounded-2xl flex items-center justify-center mb-6 font-bold">
                  <Icons.Tent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-stone-900 dark:text-amber-100">Your 3D Panda</h3>
                <p className="text-stone-700 dark:text-amber-200 font-semibold">Watch your procedural 3D Panda react to your progress! It bounces when you complete habits and evolves as you earn XP.</p>
              </div>
              <div className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-600 dark:border-emerald-400 rounded-2xl flex items-center justify-center mb-6 font-bold">
                  <Icons.Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-stone-900 dark:text-amber-100">Bamboo Rewards</h3>
                <p className="text-stone-700 dark:text-amber-200 font-semibold">Hit milestones and complete daily missions to earn Bamboo. Spend it in The Den to decorate your panda's jungle.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-stone-900 dark:text-amber-100">How it Works</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-stone-300 dark:before:bg-stone-700">

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-stone-800 dark:border-amber-200 bg-emerald-500 text-white font-black text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">1</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-6 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
                  <h4 className="font-black text-xl mb-1 text-stone-900 dark:text-amber-100">Create your habits</h4>
                  <p className="text-stone-700 dark:text-amber-200 font-semibold">Set up the goals you want to achieve, assign an icon and color, and pick exactly which days of the week you want to track them.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-stone-800 dark:border-amber-200 bg-emerald-500 text-white font-black text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-6 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
                  <h4 className="font-black text-xl mb-1 text-stone-900 dark:text-amber-100">Complete daily missions</h4>
                  <p className="text-stone-700 dark:text-amber-200 font-semibold">Use the Today Dashboard to tick off habits. The streak engine automatically calculates your current and longest streaks.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-stone-800 dark:border-amber-200 bg-emerald-500 text-white font-black text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-6 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
                  <h4 className="font-black text-xl mb-1 text-stone-900 dark:text-amber-100">Earn XP and Bamboo</h4>
                  <p className="text-stone-700 dark:text-amber-200 font-semibold">Every completed habit yields +10 Bamboo and +5 XP. Hitting 7-day or 30-day milestones grants massive bonuses!</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-stone-800 dark:border-amber-200 bg-emerald-500 text-white font-black text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">4</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-6 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
                  <h4 className="font-black text-xl mb-1 text-stone-900 dark:text-amber-100">Grow your jungle</h4>
                  <p className="text-stone-700 dark:text-amber-200 font-semibold">Use your Bamboo in The Den to buy cool decorations like Lotus Ponds and Bamboo Hats. Watch your Panda evolve as you gain XP!</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-stone-800 dark:border-amber-200 bg-emerald-500 text-white font-black text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">5</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-6 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
                  <h4 className="font-black text-xl mb-1 text-stone-900 dark:text-amber-100">The Jungle Shop 🛒</h4>
                  <p className="text-stone-700 dark:text-amber-200 font-semibold">Spend your hard-earned Bamboo on 3D decorations for your Panda's habitat! Equip items to see them appear live on your dashboard.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-700 dark:to-green-700 text-white rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl shadow-green-900/20 border-4 border-stone-800 dark:border-amber-200 relative overflow-hidden">
            <div className="absolute top-4 right-8 text-6xl opacity-30">🐼</div>
            <div className="absolute bottom-4 left-8 text-6xl opacity-30">🌿</div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">Ready to build better habits?</h2>
            <p className="text-green-100 font-semibold text-xl mb-8 max-w-xl mx-auto relative z-10">
              Everything runs securely in your browser. Start growing your virtual panda today!
            </p>
            <Link href="/dashboard" className="relative z-10">
              <Button size="lg" className="text-xl px-10 py-8 rounded-3xl shadow-xl bg-white text-emerald-800 hover:bg-stone-100 border-2 border-stone-800 font-black">
                Launch App 🚀
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}