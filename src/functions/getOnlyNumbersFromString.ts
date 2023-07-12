export const getOnlyNumbersFromString = (value: string) => {
  return value.replace(/\D/g, "");
};
