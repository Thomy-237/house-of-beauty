
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { Globe } from 'lucide-react';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { value: 'EUR' as Currency, label: 'EUR (€)', flag: '🇪🇺' },
    { value: 'USD' as Currency, label: 'USD ($)', flag: '🇺🇸' },
    { value: 'XOF' as Currency, label: 'XOF (CFA)', flag: '🇸🇳' }
  ];

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-32 bg-background border-border">
        <Globe className="h-4 w-4 mr-1" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((curr) => (
          <SelectItem key={curr.value} value={curr.value}>
            <span className="flex items-center gap-2">
              <span>{curr.flag}</span>
              <span>{curr.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
