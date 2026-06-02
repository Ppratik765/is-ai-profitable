import React from 'react';

// Formats a number to have exactly specified decimal places and commas
export function formatMoney(value, decimals = 4, suffix = 'B') {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}$${formatted}${suffix}`;
}

export function Odometer({ value, decimals = 4, suffix = 'B', className = '' }) {
  // Use tabular-nums to prevent layout shift during rapid updates
  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`}>
      {formatMoney(value, decimals, suffix)}
    </span>
  );
}
