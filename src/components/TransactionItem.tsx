import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faStore, faBullseye, faBox, faMugHot, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Transaction } from '../types/Transaction';
import { formatTransactionDate } from '../utils/formatDate';

interface TransactionItemProps {
  transaction: Transaction;
}

const iconMap: Record<string, IconDefinition> = {
  apple: faApple,
  store: faStore,
  bullseye: faBullseye,
  box: faBox,
  'mug-hot': faMugHot,
  film: faFilm,
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const navigate = useNavigate();
  const isPayment = transaction.type === 'Payment';
  const amountDisplay = isPayment
    ? `+$${transaction.amount.toFixed(2)}`
    : `$${transaction.amount.toFixed(2)}`;

  const icon = iconMap[transaction.icon] || faStore;
  const formattedDate = formatTransactionDate(transaction.date);

  const descriptionParts = [];
  if (transaction.pending) {
    descriptionParts.push('Pending');
  }
  descriptionParts.push(transaction.description);

  return (
    <div
      className="transaction-item"
      onClick={() => navigate(`/transaction/${transaction.id}`)}
    >
      <div
        className="transaction-icon"
        style={{
          background: transaction.iconBgColor.includes('gradient')
            ? transaction.iconBgColor
            : transaction.iconBgColor
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      <div className="transaction-details">
        <div className="transaction-name">{transaction.name}</div>
        <div className="transaction-description">
          {descriptionParts.join(' - ')}
        </div>
        <div className="transaction-meta">
          {transaction.authorizedUser && (
            <span className="transaction-user">{transaction.authorizedUser} - </span>
          )}
          <span className="transaction-date">{formattedDate}</span>
        </div>
      </div>

      <div className="transaction-amount-section">
        <div className="transaction-amount">{amountDisplay}</div>
        {transaction.percentBack && (
          <div className="transaction-percent">{transaction.percentBack}%</div>
        )}
      </div>

      <div className="transaction-chevron">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}
