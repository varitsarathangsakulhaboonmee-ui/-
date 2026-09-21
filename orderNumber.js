// Generates a display order number. Swap for a backend-issued number later.
export const generateOrderNumber = () => {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `KT-${n}`;
};