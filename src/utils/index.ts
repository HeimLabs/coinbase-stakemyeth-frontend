type Part = {
    type: string;
    value: string;
  };
  
  const truncateFractionAndFormat = (parts: Part[], digits: number): string => {
    return parts
      .map(({ type, value }) => {
        if (type !== 'fraction' || !value || value.length < digits) {
          return value;
        }
  
        let retVal = "";
        for (let idx = 0, counter = 0; idx < value.length && counter < digits; idx++) {
          if (value[idx] !== '0') {
            counter++;
          }
          retVal += value[idx];
        }
        return retVal;
      })
      .reduce((string, part) => string + part, "");
  };
  
  // Example formatter usage
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });

export function formatBalance(balance: number): string {
   return truncateFractionAndFormat(formatter.formatToParts(balance), 5);
}