export const shouldClickAddToCart = ({ label }: { label: string }): boolean => {
  const rando = Math.floor(Math.random() * 10);
  switch (label) {
    case "special":
      // ~40% likely to click
      // better than baseline
      return rando > 5;
    case "sale":
      // ~80% likely to click
      // better than baseline
      return rando > 1;
    case "new":
      // ~60% likely to click
      // better than baseline
      return rando > 5;
    default:
      // ~30% likely to click
      // baseline
      return rando > 9;
  }
};

export const shouldClickCheckout = ({ label }: { label: string }): boolean => {
  const rando = Math.floor(Math.random() * 10);

  if (["special", "new", "sale"].includes(label)) return rando > 3;

  // ~50% chance to click checkout
  return rando > 6;
};
