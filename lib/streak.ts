export function normalizeDate(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

/**
 * schedule: Array of integers 0-6 where 0 is Sunday, 1 is Monday, etc.
 * completedDates: Array of ISO string dates (YYYY-MM-DD)
 */
export function calculateCurrentStreak(completedDates: string[], schedule: number[]): number {
  if (!completedDates.length || !schedule.length) return 0;

  const datesSet = new Set(completedDates.map(normalizeDate));
  let streak = 0;
  let currentDate = new Date();
  
  // Normalize today's date to midnight for accurate day comparison
  currentDate.setHours(0, 0, 0, 0);

  // If today is a scheduled day but not completed yet, we still check yesterday and before
  // If today IS completed, we count it.
  const todayStr = normalizeDate(currentDate);
  if (schedule.includes(currentDate.getDay()) && !datesSet.has(todayStr)) {
    // We haven't completed today's habit yet. We step back one day to calculate the streak up to yesterday.
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Iterate backwards in time up to a reasonable limit (e.g. 5 years) to prevent infinite loops
  let safetyCounter = 365 * 5; 
  
  while (safetyCounter > 0) {
    const dayOfWeek = currentDate.getDay();
    const dateStr = normalizeDate(currentDate);

    if (schedule.includes(dayOfWeek)) {
      if (datesSet.has(dateStr)) {
        streak++;
      } else {
        // A scheduled day was missed! Break the streak.
        break;
      }
    }
    // Step back one day
    currentDate.setDate(currentDate.getDate() - 1);
    safetyCounter--;
  }

  return streak;
}

export function calculateLongestStreak(completedDates: string[], schedule: number[]): number {
  if (!completedDates.length || !schedule.length) return 0;

  const sortedDates = [...completedDates].map(normalizeDate).sort();
  const datesSet = new Set(sortedDates);
  
  if (sortedDates.length === 0) return 0;

  let maxStreak = 0;
  let currentStreak = 0;
  
  const firstDate = new Date(sortedDates[0]);
  firstDate.setHours(0,0,0,0);
  const lastDate = new Date(sortedDates[sortedDates.length - 1]);
  lastDate.setHours(0,0,0,0);

  let iterDate = new Date(firstDate);

  // We iterate from the first ever completed date to the last completed date
  while (iterDate <= lastDate) {
    const dayOfWeek = iterDate.getDay();
    const dateStr = normalizeDate(iterDate);

    if (schedule.includes(dayOfWeek)) {
      if (datesSet.has(dateStr)) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }
    
    iterDate.setDate(iterDate.getDate() + 1);
  }

  return maxStreak;
}
