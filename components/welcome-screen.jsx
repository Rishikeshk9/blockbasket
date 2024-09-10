'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet, Coins } from 'lucide-react';

export default function WelcomeScreen() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = async (wallet) => {
    setIsConnecting(true);
    try {
      // Implement wallet connection logic here
      console.log(`Connecting to ${wallet}`);
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // After successful connection, you would typically:
      // 1. Check if the user exists in your database
      // 2. If not, create a new user profile
      // 3. Generate a session or token for authentication
      // 4. Redirect to the dashboard or onboarding flow
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className='min-h-screen bg-black  flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Welcome to BlockBasket
          </CardTitle>
          <CardDescription className='text-center'>
            Create and invest in curated crypto portfolios
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-sm text-muted-foreground'>
            Connect your wallet to sign up or log in
          </p>
          <div className='grid grid-cols-1 gap-4 w-full'>
            <Button
              variant='outline'
              onClick={() => handleWalletConnect('MetaMask')}
              disabled={isConnecting}
            >
              <Wallet className='mr-2 h-4 w-4' />
              {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
            </Button>
            <Button
              variant='outline'
              onClick={() => handleWalletConnect('WalletConnect')}
              disabled={isConnecting}
            >
              <Coins className='mr-2 h-4 w-4' />
              {isConnecting ? 'Connecting...' : 'Connect with WalletConnect'}
            </Button>
          </div>
          <p className='text-center text-xs text-muted-foreground'>
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
