"use client";

import { usePanda } from "@/hooks/usePanda";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const SHOP_ITEMS = [
  { id: "bamboo_hat", name: "Bamboo Hat", cost: 100, icon: "HardHat" },
  { id: "palm_tree", name: "Palm Tree", cost: 250, icon: "TreePalm" },
  { id: "lotus_pond", name: "Lotus Pond", cost: 500, icon: "Droplets" },
  { id: "bird_friend", name: "Bird Friend", cost: 1000, icon: "Bird" },
];

export default function DenPage() {
  const { panda, buyItem, toggleEquip, isLoaded } = usePanda();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  if (!isLoaded) return null;

  const handleBuy = (id: string, cost: number) => {
    const success = buyItem(id, cost);
    if (success) {
      setToast({ message: "🎉 Item purchased successfully!", type: "success" });
    } else {
      setToast({ message: "Not enough Bamboo! Keep tracking habits. 🎋", type: "error" });
    }
    setTimeout(() => setToast(null), 3000);
  };

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

      <div className="container mx-auto p-6 max-w-4xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-stone-900 dark:text-amber-100 flex items-center gap-3">
              <Icons.Tent className="w-10 h-10 text-amber-700 dark:text-amber-500" />
              The Panda Den
            </h1>
            <p className="text-stone-700 dark:text-amber-200 font-semibold mt-1">Spend your hard-earned bamboo to decorate the jungle.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 px-5 py-3 rounded-2xl border-2 border-emerald-700 dark:border-green-400 font-bold text-stone-900 dark:text-green-100 shadow-sm">
              <span className="text-2xl">🎋</span>
              <span className="text-xl font-black text-emerald-800 dark:text-green-300">{panda.bamboo} Bamboo</span>
            </div>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" className="border-2 border-stone-800 dark:border-amber-200 font-bold hover:bg-stone-900 dark:hover:bg-amber-900/40 hover:text-white dark:hover:text-amber-100">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inventory Section */}
          <section className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg h-fit">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-stone-900 dark:text-amber-100">
              <Icons.Backpack className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Inventory
            </h2>
            
            {panda.inventory.length === 0 ? (
              <div className="text-center py-12 text-stone-600 dark:text-amber-200/70 border-2 border-dashed border-stone-400 dark:border-amber-700 rounded-2xl bg-stone-100/50 dark:bg-stone-900/50">
                <p className="font-bold text-lg mb-2">Your backpack is empty.</p>
                <p className="font-semibold">Buy some cool items from the Jungle Shop! 🛒</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {panda.inventory.map((itemId) => {
                  const item = SHOP_ITEMS.find((i) => i.id === itemId);
                  if (!item) return null;
                  // @ts-ignore
                  const Icon = Icons[item.icon] || Icons.HelpCircle;
                  const isEquipped = panda.equipped.includes(itemId);

                  return (
                    <div key={itemId} className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 text-center transition-all ${isEquipped ? 'bg-green-100 dark:bg-green-900/30 border-green-600 dark:border-green-500 shadow-md transform scale-105' : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:border-stone-500 dark:hover:border-stone-500'}`}>
                      <div className={`p-4 rounded-full shadow-inner border-2 ${isEquipped ? 'bg-green-50 dark:bg-green-800/50 border-green-200 dark:border-green-700' : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700'}`}>
                        <Icon className={`w-10 h-10 ${isEquipped ? 'text-green-700 dark:text-green-400' : 'text-stone-700 dark:text-stone-300'}`} />
                      </div>
                      <div className="w-full">
                        <p className={`font-black text-sm leading-tight mb-3 ${isEquipped ? 'text-green-900 dark:text-green-200' : 'text-stone-900 dark:text-stone-100'}`}>{item.name}</p>
                        <Button 
                          variant={isEquipped ? "default" : "outline"} 
                          size="sm" 
                          className={`w-full font-bold border-2 ${isEquipped ? 'bg-green-600 hover:bg-green-700 text-white border-green-700 dark:border-green-500' : 'border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                          onClick={() => toggleEquip(itemId)}
                        >
                          {isEquipped ? "Equipped" : "Equip"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Shop Section */}
          <section className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-stone-900 dark:text-amber-100">
              <Icons.Store className="w-8 h-8 text-amber-600 dark:text-amber-500" />
              Jungle Shop
            </h2>
            
            <div className="space-y-4">
              {SHOP_ITEMS.map((item) => {
                const isOwned = panda.inventory.includes(item.id);
                // @ts-ignore
                const Icon = Icons[item.icon] || Icons.HelpCircle;

                return (
                  <div key={item.id} className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${isOwned ? 'opacity-60 bg-stone-200/50 dark:bg-stone-900/50 border-stone-300 dark:border-stone-700' : 'bg-white dark:bg-stone-900 border-stone-800 dark:border-amber-200 hover:shadow-md hover:-translate-y-1'}`}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl border-2 border-stone-200 dark:border-stone-700">
                        <Icon className="w-8 h-8 text-stone-700 dark:text-stone-300" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-stone-900 dark:text-stone-100">{item.name}</h3>
                        <p className="text-sm font-bold flex items-center gap-1 mt-1 text-emerald-700 dark:text-green-400 bg-emerald-100 dark:bg-green-900/30 w-fit px-2 py-0.5 rounded-md border border-emerald-200 dark:border-green-800/50">
                          <Icons.Leaf className="w-4 h-4" /> {item.cost}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant={isOwned ? "secondary" : "default"} 
                      disabled={isOwned}
                      onClick={() => handleBuy(item.id, item.cost)}
                      className={`font-bold border-2 ${isOwned ? 'border-transparent' : 'border-stone-800 dark:border-amber-200 bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-500'}`}
                    >
                      {isOwned ? "Owned" : "Buy"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Floating Toast */}
        {toast && (
          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-black shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 border-2 text-lg ${toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 border-green-700 dark:border-green-400 text-white' : 'bg-gradient-to-r from-red-500 to-rose-600 border-red-800 dark:border-red-400 text-white'}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}