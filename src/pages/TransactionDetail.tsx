import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { formatTransactionDateTime } from '../utils/formatDate';
import type { Transaction } from '../types/Transaction';

export function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/transactions.json')
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        const found = data.find((t) => t.id === id);
        setTransaction(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load transaction:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!transaction) {
    return (
      <div className="transaction-detail-page">
        <BackButton />
        <div className="not-found">Transaction not found</div>
      </div>
    );
  }

  const isPayment = transaction.type === 'Payment';
  const amountDisplay = isPayment
    ? `+$${transaction.amount.toFixed(2)}`
    : `$${transaction.amount.toFixed(2)}`;

  const status = transaction.pending ? 'Pending' : 'Approved';
  const formattedDateTime = formatTransactionDateTime(transaction.date);

  return (
    <div className="transaction-detail-page">
      <BackButton />

      <div className="detail-header">
        <div className="detail-amount">{amountDisplay}</div>
        <div className="detail-name">{transaction.name}</div>
        <div className="detail-datetime">{formattedDateTime}</div>
      </div>

      <div className="detail-card">
        <div className="detail-status-row">
          <span className="detail-status-label">Status:</span>
          <span className="detail-status-value">{status}</span>
        </div>
        <div className="detail-card-info">{transaction.cardInfo}</div>
        <div className="detail-divider"></div>
        <div className="detail-total-row">
          <span className="detail-total-label">Total</span>
          <span className="detail-total-value">${transaction.amount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
