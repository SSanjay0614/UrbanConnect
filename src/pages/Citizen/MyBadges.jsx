import { useUser } from '../../context/UserContext.jsx';
import { GAMIFICATION } from '../../utils/constants.js';

export default function MyBadges() {
  const { badges } = useUser();
  const totalPoints = badges.reduce((sum, b) => sum + (b.points || 0), 0);

  const next = GAMIFICATION.badgeThresholds.find((t) => t > totalPoints);
  const progress = next ? Math.min(100, Math.round((totalPoints / next) * 100)) : 100;

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto' }}>
      <h1>My Badges</h1>
      <p>Total points: {totalPoints}</p>
      <div aria-label="progress" style={{ height: 10, background: '#e5e7eb', borderRadius: 6 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#10b981', borderRadius: 6 }} />
      </div>
      <ul>
        {badges.map((b) => (
          <li key={b.id}>{b.name} (+{b.points})</li>
        ))}
      </ul>
    </div>
  );
}

