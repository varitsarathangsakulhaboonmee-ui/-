export const formatYen = (amount) => {
  const n = Math.round(Number(amount) || 0);
  return `¥${n.toLocaleString('en-US')}`;
};