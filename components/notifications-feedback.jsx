'use client';
import { useState, useEffect } from 'react';
import { Bell, Clock, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function NotificationsFeedback({ userRole }) {
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Simulating fetching notifications and transactions
  useEffect(() => {
    // Fetch notifications
    const fetchedNotifications = [
      {
        id: '1',
        message:
          userRole === 'creator'
            ? "Your smallcase 'Tech Giants' has been successfully rebalanced."
            : "A rebalance is available for 'Tech Giants'.",
        timestamp: new Date(2023, 5, 15, 10, 30),
        read: false,
      },
      {
        id: '2',
        message:
          userRole === 'creator'
            ? "Your smallcase 'Green Energy' has gained 5 new subscribers!"
            : "Your subscription to 'Green Energy' has been processed.",
        timestamp: new Date(2023, 5, 14, 15, 45),
        read: true,
      },
    ];
    setNotifications(fetchedNotifications);

    // Fetch transactions
    const fetchedTransactions = [
      {
        id: '1',
        type: 'rebalance',
        smallcaseName: 'Tech Giants',
        timestamp: new Date(2023, 5, 15, 10, 30),
      },
      {
        id: '2',
        type: 'subscription',
        smallcaseName: 'Green Energy',
        amount: 10.0,
        timestamp: new Date(2023, 5, 14, 15, 45),
      },
    ];
    setTransactions(fetchedTransactions);
  }, [userRole]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='container mx-auto   space-y-4'>
      <h1 className='text-3xl font-bold mb-4'>Notifications </h1>
      <Tabs defaultValue='notifications'>
        <TabsList>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='transactions'>Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value='notifications'>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Stay updated on your smallcase activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex justify-between items-center mb-4'>
                <Badge variant='outline'>
                  {notifications.filter((n) => !n.read).length} Unread
                </Badge>
                <Button variant='outline' size='sm' onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </div>
              <ScrollArea className='h-[300px]'>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 ${
                      notification.read ? 'opacity-60' : ''
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start space-x-2'>
                        <Bell className='h-5 w-5 mt-0.5 text-blue-500' />
                        <div>
                          <p className='text-sm font-medium'>
                            {notification.message}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {formatDate(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <Badge className='ml-2'>New</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='transactions'>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your smallcase-related transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Smallcase</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {transaction.type === 'subscription' ? (
                          <Badge
                            variant='outline'
                            className='flex items-center'
                          >
                            <DollarSign className='h-4 w-4 mr-1' />
                            Subscription
                          </Badge>
                        ) : (
                          <Badge
                            variant='outline'
                            className='flex items-center'
                          >
                            <RefreshCw className='h-4 w-4 mr-1' />
                            Rebalance
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{transaction.smallcaseName}</TableCell>
                      <TableCell>
                        {transaction.amount
                          ? `$${transaction.amount.toFixed(2)}`
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center'>
                          <Clock className='h-4 w-4 mr-1 text-gray-500' />
                          {formatDate(transaction.timestamp)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
