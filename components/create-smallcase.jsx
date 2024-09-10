'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

const steps = [
  'Smallcase Details',
  'Crypto Allocation',
  'Subscription Fee',
  'Deploy',
];

export default function CreateCase() {
  const [currentStep, setCurrentStep] = useState(0);
  const [smallcaseData, setSmallcaseData] = useState({
    name: '',
    description: '',
    platformFee: 1,
    cryptoAllocation: { BTC: 50, ETH: 30, ADA: 20 },
    subscriptionFee: 5,
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulating deployment
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeploying(false);
    handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={smallcaseData.name}
                onChange={(e) =>
                  setSmallcaseData({ ...smallcaseData, name: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Input
                id='description'
                value={smallcaseData.description}
                onChange={(e) =>
                  setSmallcaseData({
                    ...smallcaseData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='platformFee'>Platform Fee (%)</Label>
              <Input
                id='platformFee'
                type='number'
                value={smallcaseData.platformFee}
                onChange={(e) =>
                  setSmallcaseData({
                    ...smallcaseData,
                    platformFee: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className='space-y-6'>
            {Object.entries(smallcaseData.cryptoAllocation).map(
              ([crypto, value]) => (
                <div key={crypto} className='space-y-2'>
                  <Label>{crypto} Allocation (%)</Label>
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) =>
                      setSmallcaseData({
                        ...smallcaseData,
                        cryptoAllocation: {
                          ...smallcaseData.cryptoAllocation,
                          [crypto]: newValue[0],
                        },
                      })
                    }
                    max={100}
                    step={1}
                  />
                  <p className='text-sm text-muted-foreground'>{value}%</p>
                </div>
              )
            )}
          </div>
        );
      case 2:
        return (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='subscriptionFee'>Subscription Fee ($)</Label>
              <Input
                id='subscriptionFee'
                type='number'
                value={smallcaseData.subscriptionFee}
                onChange={(e) =>
                  setSmallcaseData({
                    ...smallcaseData,
                    subscriptionFee: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Platform fee: ${smallcaseData.platformFee} (fixed)
            </p>
            <p className='text-sm font-medium'>
              Total fee for subscribers: $
              {smallcaseData.subscriptionFee + smallcaseData.platformFee}
            </p>
          </div>
        );
      case 3:
        return (
          <div className='space-y-4 text-center'>
            {isDeploying ? (
              <Loader2 className='h-8 w-8 animate-spin mx-auto' />
            ) : (
              <>
                <h3 className='text-lg font-semibold'>
                  Smallcase Created Successfully!
                </h3>
                <p>Your Smallcase is now live and available for subscribers.</p>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto  '>
      <CardHeader>
        <CardTitle>Create New Smallcase</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </CardDescription>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleDeploy} disabled={isDeploying}>
            {isDeploying ? 'Deploying...' : 'Deploy Smallcase'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
