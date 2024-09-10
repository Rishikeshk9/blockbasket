'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Plus, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const createdSmallcases = [
  {
    id: 1,
    name: 'Tech Giants',
    performance: '+15.2%',
    subscribers: 1200,
    needsRebalance: false,
  },
  {
    id: 2,
    name: 'Green Energy',
    performance: '+8.7%',
    subscribers: 800,
    needsRebalance: true,
  },
];

const subscribedSmallcases = [
  {
    id: 3,
    name: 'Dividend Kings',
    performance: '+5.6%',
    creator: 'InvestPro',
    needsRebalance: true,
  },
  {
    id: 4,
    name: 'Emerging Markets',
    performance: '-2.3%',
    creator: 'GlobalGrowth',
    needsRebalance: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCreateNewSmallcase = () => {
    router.push('/home/create');
  };

  const handleBrowseSmallcases = () => {
    router.push('/home/browse');
  };

  const handleManageSmallcase = (id) => {
    router.push(`/home/manage?id=${id}`);
  };

  return (
    <div className='container mx-auto   space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button className='flex-1' onClick={handleCreateNewSmallcase}>
          <Plus className='mr-2 h-4 w-4' /> Create New Smallcase
        </Button>
        <Button
          className='flex-1'
          variant='outline'
          onClick={handleBrowseSmallcases}
        >
          <TrendingUp className='mr-2 h-4 w-4' /> Browse Smallcases
        </Button>
      </div>
      <Tabs defaultValue='created'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='created'>My Smallcases</TabsTrigger>
          <TabsTrigger value='subscribed'>Subscribed Smallcases</TabsTrigger>
        </TabsList>
        <TabsContent value='created' className='space-y-4'>
          {createdSmallcases.map((smallcase) => (
            <Card key={smallcase.id}>
              <CardHeader>
                <CardTitle>{smallcase.name}</CardTitle>
                <CardDescription>
                  Performance: {smallcase.performance}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Subscribers: {smallcase.subscribers}</p>
                <div className='flex justify-between items-center mt-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleManageSmallcase(smallcase.id)}
                  >
                    Manage
                  </Button>
                  {smallcase.needsRebalance && (
                    <Button size='sm'>
                      <Bell className='mr-2 h-4 w-4' /> Rebalance
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value='subscribed' className='space-y-4'>
          {subscribedSmallcases.map((smallcase) => (
            <Card key={smallcase.id}>
              <CardHeader>
                <CardTitle>{smallcase.name}</CardTitle>
                <CardDescription>By {smallcase.creator}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Performance: {smallcase.performance}</p>
                {smallcase.needsRebalance && (
                  <Button className='mt-4' size='sm'>
                    <Bell className='mr-2 h-4 w-4' /> Update Portfolio
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
