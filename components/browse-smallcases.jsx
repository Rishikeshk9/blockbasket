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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockSmallcases = [
  {
    id: 1,
    name: 'Tech Giants',
    performance: '+15.2%',
    risk: 'Medium',
    creator: 'InvestPro',
    fee: 10,
  },
  {
    id: 2,
    name: 'Green Energy',
    performance: '+8.7%',
    risk: 'High',
    creator: 'EcoInvest',
    fee: 8,
  },
  {
    id: 3,
    name: 'Dividend Kings',
    performance: '+5.6%',
    risk: 'Low',
    creator: 'YieldMaster',
    fee: 12,
  },
  {
    id: 4,
    name: 'Emerging Markets',
    performance: '-2.3%',
    risk: 'High',
    creator: 'GlobalGrowth',
    fee: 15,
  },
];

const steps = ['Browse Smallcases', 'Subscribe', 'Manage Portfolio'];

export default function BrowseSmallcases() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSmallcase, setSelectedSmallcase] = useState(null);
  const [filter, setFilter] = useState('performance');

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='filter'>Filter by</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id='filter'>
                  <SelectValue placeholder='Select filter' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='performance'>Performance</SelectItem>
                  <SelectItem value='popularity'>Popularity</SelectItem>
                  <SelectItem value='risk'>Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-4'>
              {mockSmallcases.map((smallcase) => (
                <Card
                  key={smallcase.id}
                  className={`cursor-pointer   ${
                    selectedSmallcase?.id === smallcase.id
                      ? 'bg-black text-white'
                      : 'bg-background'
                  }`}
                  onClick={() => setSelectedSmallcase(smallcase)}
                >
                  <CardHeader>
                    <CardTitle>{smallcase.name}</CardTitle>
                    <CardDescription>by {smallcase.creator}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Performance: {smallcase.performance}</p>
                    <p>Risk: {smallcase.risk}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 1:
        return selectedSmallcase ? (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>{selectedSmallcase.name}</h3>
            <p>Creator: {selectedSmallcase.creator}</p>
            <p>Performance: {selectedSmallcase.performance}</p>
            <p>Risk: {selectedSmallcase.risk}</p>
            <div className='space-y-2'>
              <p>Subscription Fee: ${selectedSmallcase.fee}</p>
              <p>Platform Fee: $1 (fixed)</p>
              <p className='font-medium'>
                Total Fee: ${selectedSmallcase.fee + 1}
              </p>
            </div>
          </div>
        ) : (
          <p>Please select a Smallcase to subscribe</p>
        );
      case 2:
        return (
          <div className='space-y-4 text-center'>
            <h3 className='text-lg font-semibold'>Portfolio Management</h3>
            <p>You can now track and manage your subscribed Smallcase.</p>
            <p>
              You will be notified when it's time to rebalance your portfolio.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto   space-y-4'>
      <h1 className='text-3xl font-bold mb-4'>Browse </h1>
      <Card className='w-full max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>{steps[currentStep]}</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={handlePrev} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              currentStep === steps.length - 1 ||
              (currentStep === 0 && !selectedSmallcase)
            }
          >
            {currentStep === steps.length - 2 ? 'Subscribe' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
