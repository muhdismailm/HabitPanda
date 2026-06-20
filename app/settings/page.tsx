"use client";

import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

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
    <div className="container mx-auto p-6 max-w-2xl min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" /> Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your data and application settings.</p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="space-y-6">
        <section className="bg-card p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Data Management</h2>
          <p className="text-muted-foreground mb-6">
            All your data is stored locally in your browser. You can export it as a JSON file to back it up or move it to another device.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleExport} className="flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Backup
            </Button>
            
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImport}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
              <Upload className="w-4 h-4" /> Import Backup
            </Button>
          </div>

          {statusMessage && (
            <p className="mt-4 text-sm font-medium text-primary">{statusMessage}</p>
          )}
        </section>

        <section className="bg-destructive/5 p-6 rounded-2xl border border-destructive/20 shadow-sm">
          <h2 className="text-xl font-bold text-destructive mb-2">Danger Zone</h2>
          <p className="text-muted-foreground mb-6">
            Permanently delete all habits, streaks, bamboo, and your panda's progress.
          </p>
          <Button variant="destructive" onClick={handleReset} className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Factory Reset
          </Button>
        </section>
      </div>
    </div>
  );
}
