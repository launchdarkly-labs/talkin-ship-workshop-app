export const shouldClickAddToCart = ({ label }: { label: string }): boolean => {
  const rando = Math.floor(Math.random() * 10);
  switch (label) {
    case "Special":
      return rando > 6;  // 40% chance
    case "Sale":
      return rando > 3;  // 80% chance
    case "New":
      return rando > 4;  // 60% chance
    default:
      return rando > 7;  // 30% chance
  }
};

export const shouldClickCheckout = (): boolean => {
  const rando = Math.floor(Math.random() * 10);
  return rando > 1;  // 80% chance
};
