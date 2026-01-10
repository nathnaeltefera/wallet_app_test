function getSeasonStartDate(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Winter: December 1 - February 28/29
  // Spring: March 1 - May 31
  // Summer: June 1 - August 31
  // Fall: September 1 - November 30

  if (month >= 11) {
    // December - Winter starts
    return new Date(year, 11, 1);
  } else if (month >= 8) {
    // September, October, November - Fall
    return new Date(year, 8, 1);
  } else if (month >= 5) {
    // June, July, August - Summer
    return new Date(year, 5, 1);
  } else if (month >= 2) {
    // March, April, May - Spring
    return new Date(year, 2, 1);
  } else {
    // January, February - Winter (started previous December)
    return new Date(year - 1, 11, 1);
  }
}

function getDayOfSeason(today: Date, seasonStart: Date): number {
  const diffTime = today.getTime() - seasonStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Day 1 is the first day
}

export function calculateDailyPoints(): number {
  const today = new Date();
  const seasonStart = getSeasonStartDate(today);
  const dayOfSeason = getDayOfSeason(today, seasonStart);

  if (dayOfSeason === 1) return 2;
  if (dayOfSeason === 2) return 3;

  // Build up points iteratively
  // Day 3+: 100% of (day-2) + 60% of (day-1)
  let prevPrev = 2; // day 1
  let prev = 3;     // day 2

  for (let day = 3; day <= dayOfSeason; day++) {
    const current = prevPrev + 0.6 * prev;
    prevPrev = prev;
    prev = current;
  }

  return Math.round(prev);
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return Math.round(points / 1000) + 'K';
  }
  return points.toString();
}
