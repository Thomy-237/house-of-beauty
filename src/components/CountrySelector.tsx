
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, placeholder = "Sélectionnez votre pays" }) => {
  const [customCountry, setCustomCountry] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Pays d'Afrique et d'Europe les plus courants
  const countries = [
    // Pays africains
    'Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroun', 
    'Cap-Vert', 'République centrafricaine', 'Tchad', 'Comores', 'Congo', 
    'République démocratique du Congo', "Côte d'Ivoire", 'Djibouti', 'Égypte', 
    'Guinée équatoriale', 'Érythrée', 'Éthiopie', 'Gabon', 'Gambie', 'Ghana', 
    'Guinée', 'Guinée-Bissau', 'Kenya', 'Lesotho', 'Libéria', 'Libye', 
    'Madagascar', 'Malawi', 'Mali', 'Mauritanie', 'Maurice', 'Maroc', 
    'Mozambique', 'Namibie', 'Niger', 'Nigéria', 'Rwanda', 'São Tomé-et-Principe', 
    'Sénégal', 'Seychelles', 'Sierra Leone', 'Somalie', 'Afrique du Sud', 
    'Soudan du Sud', 'Soudan', 'Tanzanie', 'Togo', 'Tunisie', 'Ouganda', 
    'Zambie', 'Zimbabwe',
    
    // Pays européens
    'Allemagne', 'Autriche', 'Belgique', 'Bulgarie', 'Chypre', 'Croatie', 
    'Danemark', 'Espagne', 'Estonie', 'Finlande', 'France', 'Grèce', 
    'Hongrie', 'Irlande', 'Islande', 'Italie', 'Lettonie', 'Lituanie', 
    'Luxembourg', 'Malte', 'Norvège', 'Pays-Bas', 'Pologne', 'Portugal', 
    'République tchèque', 'Roumanie', 'Royaume-Uni', 'Slovaquie', 'Slovénie', 
    'Suède', 'Suisse'
  ].sort();

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
      return;
    }
    setShowCustomInput(false);
    onChange(selectedValue);
  };

  const handleCustomCountrySubmit = () => {
    if (customCountry.trim()) {
      onChange(customCountry.trim());
      setShowCustomInput(false);
      setCustomCountry('');
    }
  };

  const handleCustomCountryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomCountrySubmit();
    }
  };

  if (showCustomInput) {
    return (
      <div className="space-y-2">
        <Input
          value={customCountry}
          onChange={(e) => setCustomCountry(e.target.value)}
          onKeyPress={handleCustomCountryKeyPress}
          onBlur={handleCustomCountrySubmit}
          placeholder="Saisissez votre pays"
          autoFocus
        />
        <button
          type="button"
          onClick={() => setShowCustomInput(false)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {countries.map((country) => (
          <SelectItem key={country} value={country}>
            {country}
          </SelectItem>
        ))}
        <SelectItem value="custom" className="border-t border-border mt-2 pt-2">
          <span className="italic">Mon pays n'est pas dans la liste...</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
