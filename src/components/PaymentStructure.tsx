
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Zap } from 'lucide-react';

interface PaymentStructureProps {
  amount: number;
  currency?: string;
  onPayment?: (paymentData: any) => void;
}

const PaymentStructure: React.FC<PaymentStructureProps> = ({ 
  amount, 
  currency = 'EUR',
  onPayment 
}) => {
  const handlePayment = async (method: string) => {
    // Structure prête pour intégration API de paiement
    const paymentData = {
      amount,
      currency,
      method,
      timestamp: new Date().toISOString()
    };

    console.log('Données de paiement préparées:', paymentData);
    
    if (onPayment) {
      onPayment(paymentData);
    }

    // TODO: Intégrer ici l'API de paiement choisie
    // Exemples d'APIs supportées :
    // - Stripe: stripe.createPaymentIntent()
    // - PayPal: paypal.createOrder()
    // - Mollie: mollie.payments.create()
    // - Square: square.paymentsApi.createPayment()
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paiement sécurisé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {amount.toFixed(2)} {currency}
          </p>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={() => handlePayment('card')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payer par carte
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handlePayment('paypal')}
          >
            Payer avec PayPal
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Paiement sécurisé SSL 256-bit</span>
          <Zap className="h-3 w-3" />
        </div>

        {/* Zone d'intégration API de paiement */}
        <div id="payment-integration-zone" className="min-h-[50px] border-2 border-dashed border-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
          Zone réservée à l'intégration de l'API de paiement
          <br />
          <span className="text-xs">
            (Stripe, PayPal, Mollie, Square, etc.)
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentStructure;
