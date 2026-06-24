# HabitFlow Panda Jungle

HabitFlow Panda Jungle is a playfully gamified, mobile-first habit tracking application where building consistency is rewarded by growing your own virtual 3D Panda companion. 

Built entirely as a robust client-side Next.js application, it requires no backend or database, leaning entirely on secure Local Storage persistence to ensure a fast, private user experience.

---

## 🚀 Setup & Installation

1. **Clone the repository** (or download the source code).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser. Seed data will automatically populate your first visit!

---

## 🏗️ Architecture

- **Framework:** Next.js 16 (App Router) with React 19
- **State Management:** Custom React hooks (`useHabits`, `usePanda`) syncing securely to browser `localStorage`.
- **UI & Styling:** Tailwind CSS v4, `shadcn/ui`, and Lucide React Icons.
- **Form Validation:** `react-hook-form` and `zod` schema parsing.
- **3D Graphics & Animations:** `framer-motion` for page-scroll effects, and `@react-three/fiber` with `@react-three/drei` for procedural 3D model rendering.

---

## 📊 Data Model

### Habit
```typescript
interface Habit {
  id: string;             // UUID
  name: string;           // E.g., "Read 20 Minutes"
  icon: string;           // Lucide icon reference
  color: string;          // Hex color
  schedule: number[];     // Array of days (0=Sun, 6=Sat)
  completedDates: string[]; // Array of ISO Date Strings
  createdAt: string;
}
```

### Panda State
```typescript
interface PandaState {
  bamboo: number;         // Current currency
  totalXP: number;        // Determines evolution stage
  inventory: string[];    // Array of unlocked item IDs
  equipped: string[];     // Array of currently equipped item IDs
}
```

---

## 🔥 Streak Logic Engine

Streaks are calculated as a pure utility function. 
The logic elegantly handles **custom schedules** (e.g., Mon/Wed/Fri). If a user completes a habit on Friday, their streak will carry over through the weekend without breaking, assuming Saturday and Sunday are "scheduled off-days".

- **Current Streak:** Iterates backward from the current date, checking the scheduled array.
- **Longest Streak:** Processes the historical completion array chronologically, finding the maximum unbroken consecutive chain.

---

## 🎋 Gamification Engine

Habits shouldn't be boring. 
- **Rewards:** Completing a habit grants **+10 Bamboo** and **+5 XP**.
- **Milestones:** Hitting a 7-day streak grants a **+25 Bamboo** bonus, and 30 days grants **+100 Bamboo**.
- **Panda Stages:** As XP grows, the Panda evolves from *Baby Panda* -> *Adult Panda* -> *Elder Panda*, scaling in 3D size.
- **Mood Engine:** The Panda's mood (and its idle animation) dynamically changes to Happy, Neutral, or Sad based on the completion rate of *today's scheduled habits*.

---
