import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export function NoPaymentDue() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="no-payment-due">
      <div className="no-payment-content">
        <div className="no-payment-label">No Payment Due</div>
        <div className="no-payment-text">You've paid your {currentMonth} balance.</div>
      </div>
      <div className="no-payment-check">
        <FontAwesomeIcon icon={faCheck} />
      </div>
    </div>
  );
}
