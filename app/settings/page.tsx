"use client";

import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleExport = () => {
    const habits = localStorage.getItem("habits") || "[]";
    const panda = localStorage.getItem("panda") || "{}";

    const exportData = {
      version: 1,
      habits: JSON.parse(habits),
      panda: JSON.parse(panda),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `habitflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage("Data exported successfully!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.habits && json.panda) {
          localStorage.setItem("habits", JSON.stringify(json.habits));
          localStorage.setItem("panda", JSON.stringify(json.panda));
          setStatusMessage("Data imported successfully! Reloading...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        setStatusMessage("Error: Invalid backup file format.");
        setTimeout(() => setStatusMessage(""), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      localStorage.removeItem("habits");
      localStorage.removeItem("panda");
      localStorage.removeItem("has_seeded");
      window.location.href = "/";
    }
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

      <div className="container mx-auto p-6 max-w-2xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-stone-900 dark:text-amber-100 flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-stone-700 dark:text-amber-200" /> Settings
            </h1>
            <p className="text-stone-700 dark:text-amber-200 font-semibold mt-1">Manage your data and application settings.</p>
          </div>
          <div className="flex gap-3">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" className="border-2 border-stone-800 dark:border-amber-200 font-bold hover:bg-stone-900 dark:hover:bg-amber-900/40 hover:text-white dark:hover:text-amber-100">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <section className="bg-gradient-to-br from-stone-50 to-amber-50 dark:from-stone-800 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-stone-800 dark:border-amber-200 shadow-lg">
            <h2 className="text-2xl font-black mb-4 text-stone-900 dark:text-amber-100">Data Management</h2>
            <p className="text-stone-700 dark:text-amber-200 font-semibold mb-6">
              All your data is stored locally in your browser. You can export it as a JSON file to back it up or move it to another device.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleExport} className="flex items-center gap-2 border-2 border-stone-800 dark:border-amber-200 font-bold rounded-xl bg-stone-900 text-white hover:bg-stone-800 dark:bg-amber-700 dark:hover:bg-amber-600">
                <Download className="w-4 h-4" /> Export Backup
              </Button>

              <input
                type="file"
                accept=".json"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImport}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border-2 border-stone-800 dark:border-amber-200 font-bold rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800">
                <Upload className="w-4 h-4" /> Import Backup
              </Button>
            </div>

            {statusMessage && (
              <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-bold border-2 border-green-600 dark:border-green-500 rounded-xl">
                {statusMessage}
              </div>
            )}
          </section>

          <section className="bg-red-50 dark:bg-red-950/40 p-8 rounded-3xl border-2 border-red-800 dark:border-red-400 shadow-lg">
            <h2 className="text-2xl font-black text-red-700 dark:text-red-400 mb-2">Danger Zone</h2>
            <p className="text-red-900/70 dark:text-red-200/70 font-semibold mb-6">
              Permanently delete all habits, streaks, bamboo, and your panda's progress.
            </p>
            <Button variant="destructive" onClick={handleReset} className="flex items-center gap-2 font-bold rounded-xl border-2 border-red-800 dark:border-red-400 shadow-md hover:shadow-lg">
              <Trash2 className="w-4 h-4" /> Factory Reset
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
