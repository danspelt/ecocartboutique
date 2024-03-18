// PaymentMethod.jsx
import React from 'react';

const PaymentMethod = () => {
  return (
    <div>
      <label htmlFor="payment-method">Payment Method</label>
      <select id="payment-method" className="input input-bordered w-full max-w-sm">
        <option value="credit-card">Credit Card</option>
        <option value="paypal">PayPal</option>
        {/* Add more payment methods as needed */}
      </select>
    </div>
  );
};

export default PaymentMethod;
