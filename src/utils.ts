export const isNumber = (n: string | number) =>
  typeof n === 'number' && !isNaN(n);
