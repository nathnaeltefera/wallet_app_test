import { useState, useEffect, useMemo } from 'react';
import { CardBalance } from '../components/CardBalance';
import { NoPaymentDue } from '../components/NoPaymentDue';
import { DailyPoints } from '../components/DailyPoints';
import { TransactionItem } from '../components/TransactionItem';
import type { Transaction } from '../types/Transaction';

export function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate random balance once per session
  const cardBalance = useMemo(() => {
    return Math.round((Math.random() * 100 + 10) * 100) / 100;
  }, []);

  useEffect(() => {
    fetch('/data/transactions.json')
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load transactions:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="transactions-list-page">
      <div className="header-grid">
        <CardBalance balance={cardBalance} />
        <NoPaymentDue />
        <DailyPoints />
        <div className="checkmark-block">
          <div className="checkmark-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <section className="transactions-section">
        <h2 className="transactions-title">Latest Transactions</h2>
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </div>
  );
}
