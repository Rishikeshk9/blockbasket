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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Bell, ChevronUp, Percent, RefreshCw } from 'lucide-react';

export default function ManagePortfolio({
  userRole,
  smallcases = [
    {
      id: 1,
      name: 'Tech Giants',
      performance: 15.2,
      subscribers: 1200,
      needsRebalance: false,
      allocation: { AAPL: 30, GOOGL: 30, MSFT: 40 },
    },
    {
      id: 2,
      name: 'Green Energy',
      performance: 8.7,
      subscribers: 800,
      needsRebalance: true,
      allocation: { TSLA: 40, ENPH: 30, SEDG: 30 },
    },
    {
      id: 3,
      name: 'Dividend Kings',
      performance: 5.6,
      subscribers: 950,
      needsRebalance: true,
      allocation: { JNJ: 25, PG: 25, KO: 25, XOM: 25 },
    },
    {
      id: 4,
      name: 'Emerging Markets',
      performance: -2.3,
      subscribers: 600,
      needsRebalance: false,
      allocation: { BABA: 35, TCEHY: 35, BIDU: 30 },
    },
  ],
}) {
  const [selectedSmallcase, setSelectedSmallcase] = useState(null);
  const [newAllocation, setNewAllocation] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const handleRebalance = (smallcase) => {
    setSelectedSmallcase(smallcase);
    setNewAllocation(smallcase.allocation);
  };

  const handleAllocationChange = (crypto, value) => {
    setNewAllocation((prev) => {
      const updatedAllocation = { ...prev, [crypto]: value };
      const total = Object.values(updatedAllocation).reduce(
        (sum, val) => sum + val,
        0
      );

      // Adjust other allocations proportionally
      if (total !== 100) {
        const factor = (100 - value) / (total - updatedAllocation[crypto]);
        Object.keys(updatedAllocation).forEach((key) => {
          if (key !== crypto) {
            updatedAllocation[key] = Math.round(
              updatedAllocation[key] * factor
            );
          }
        });
      }

      return updatedAllocation;
    });
  };

  const confirmRebalance = () => {
    // Here you would typically call a function to update the smart contract
    console.log('Updating smart contract with new allocation:', newAllocation);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
    setSelectedSmallcase(null);
  };

  if (smallcases?.length === 0) {
    return <div>No smallcases available to manage. </div>;
  }

  const renderSmallcaseCards = () => (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {smallcases.length > 0 ? (
        smallcases.map((smallcase) => (
          <Card key={smallcase.id}>
            <CardHeader>
              <CardTitle>{smallcase.name}</CardTitle>
              <CardDescription>
                {userRole === 'creator'
                  ? `${smallcase.subscribers} subscribers`
                  : 'Subscribed'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium'>Performance</span>
                <Badge
                  variant={
                    smallcase.performance >= 0 ? 'default' : 'destructive'
                  }
                >
                  <ChevronUp
                    className={`h-4 w-4 ${
                      smallcase.performance < 0 ? 'rotate-180' : ''
                    }`}
                  />
                  {Math.abs(smallcase.performance)}%
                </Badge>
              </div>
              <BarChart className='h-16 w-full text-muted-foreground' />
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleRebalance(smallcase)}
                className='w-full'
              >
                <RefreshCw className='mr-2 h-4 w-4' /> Rebalance
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No smallcases available.</p>
      )}
    </div>
  );

  const renderRebalanceModal = () => (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Rebalance {selectedSmallcase?.name}</CardTitle>
        <CardDescription>Adjust the allocation percentages</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(newAllocation).map(([crypto, value]) => (
          <div key={crypto} className='mb-4'>
            <div className='flex justify-between mb-2'>
              <span>{crypto}</span>
              <span>{value}%</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={([newValue]) =>
                handleAllocationChange(crypto, newValue)
              }
              max={100}
              step={1}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' onClick={() => setSelectedSmallcase(null)}>
          Cancel
        </Button>
        <Button onClick={confirmRebalance}>Confirm Rebalance</Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className='container mx-auto  space-y-4'>
      <h1 className='text-3xl font-bold mb-4'>Manage</h1>
      {showNotification && (
        <Alert>
          <Bell className='h-4 w-4' />
          <AlertTitle>Rebalance Notification</AlertTitle>
          <AlertDescription>
            {userRole === 'creator'
              ? 'Your smallcase has been rebalanced. Subscribers have been notified.'
              : "A smallcase you're subscribed to has been rebalanced. Please update your portfolio."}
          </AlertDescription>
        </Alert>
      )}
      <Tabs
        defaultValue={
          userRole === 'creator' ? 'mySmallcases' : 'subscribedSmallcases'
        }
      >
        <TabsList>
          {userRole === 'creator' && (
            <TabsTrigger value='mySmallcases'>My Smallcases</TabsTrigger>
          )}
          {userRole === 'subscriber' && (
            <TabsTrigger value='subscribedSmallcases'>
              Subscribed Smallcases
            </TabsTrigger>
          )}
          <TabsTrigger value='performance'>Performance</TabsTrigger>
        </TabsList>

        <TabsContent value='mySmallcases'>
          <h2 className='text-2xl font-semibold mb-4'>My Smallcases</h2>
          {renderSmallcaseCards()}
        </TabsContent>

        <TabsContent value='subscribedSmallcases'>
          <h2 className='text-2xl font-semibold mb-4'>Subscribed Smallcases</h2>
          {renderSmallcaseCards()}
        </TabsContent>

        <TabsContent value='performance'>
          <h2 className='text-2xl font-semibold mb-4'>Performance Tracking</h2>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {smallcases.length > 0 ? (
              smallcases.map((smallcase) => (
                <Card key={smallcase.id}>
                  <CardHeader>
                    <CardTitle>{smallcase.name}</CardTitle>
                    <CardDescription>Historical Performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm font-medium'>
                        Overall Performance
                      </span>
                      <Badge
                        variant={
                          smallcase.performance >= 0 ? 'default' : 'destructive'
                        }
                      >
                        <Percent className='mr-1 h-4 w-4' />
                        {smallcase.performance}%
                      </Badge>
                    </div>
                    <BarChart className='h-40 w-full text-muted-foreground' />
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No performance data available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {selectedSmallcase && renderRebalanceModal()}
    </div>
  );
}
