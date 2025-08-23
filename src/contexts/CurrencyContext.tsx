
import React, { createContext, useContext, useState } from 'react';

export type Currency = 'EUR' | 'USD' | 'XOF';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Taux de change approximatifs (dans un vrai projet, ces données viendraient d'une API)
const exchangeRates = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.96
};

const currencySymbols = {
  EUR: '€',
  USD: '$',
  XOF: 'CFA'
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const convertPrice = (price: number): number => {
    return price * exchangeRates[currency];
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    const symbol = currencySymbols[currency];
    
    if (currency === 'XOF') {
      return `${Math.round(convertedPrice)} ${symbol}`;
    }
    return `${convertedPrice.toFixed(2)} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
