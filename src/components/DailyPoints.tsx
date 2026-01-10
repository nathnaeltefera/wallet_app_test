import { calculateDailyPoints, formatPoints } from '../utils/calculatePoints';

export function DailyPoints() {
  const points = calculateDailyPoints();
  const formattedPoints = formatPoints(points);

  return (
    <div className="daily-points">
      <div className="daily-points-label">Daily Points</div>
      <div className="daily-points-value">{formattedPoints}</div>
    </div>
  );
}
