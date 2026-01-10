import { useMemo } from 'react';

interface CardBalanceProps {
  balance: number;
}

export function CardBalance({ balance }: CardBalanceProps) {
  const limit = 1500;
  const available = useMemo(() => limit - balance, [balance]);

  return (
    <div className="card-balance">
      <div className="card-balance-label">Card Balance</div>
      <div className="card-balance-amount">${balance.toFixed(2)}</div>
      <div className="card-balance-available">${available.toFixed(2)} Available</div>
    </div>
  );
}
