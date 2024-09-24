"use client"
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Select} from "@repo/ui/select";

// Define interfaces for your data structures
interface Payment {
  name: string;
  amount: string;
  date: string;
}

const sortOptions = [
  { key: 'date', value: 'Date' },
  { key: 'amount', value: 'Amount' },
];


interface Transaction {
  name: string;
  amount: string;
  date: string;
}

const upcomingPayments: Payment[] = [
  { name: "Rent", amount: "$1,200", date: "Aug 1" },
  { name: "Utilities", amount: "$150", date: "Aug 5" },
];

const recentTransactions: Transaction[] = [
  { name: "Grocery Store", amount: "-$65.40", date: "Today, 2:30 PM" },
  { name: "Online Shopping", amount: "-$120.00", date: "Yesterday, 4:15 PM" },
  { name: "Salary Deposit", amount: "+$3,500.00", date: "Jul 31, 9:00 AM" },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full p-4 lg:p-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Credit Card */}
          <Card className=" col-span-2 grid-flow-col-dense bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardContent className="p-4 lg:p-6">
              <div className="mb-4 flex justify-between items-center">
                <CreditCard className="h-8 w-8" />
                <span className="text-lg font-semibold">•••• 4141</span>
              </div>
              <div className="mb-4 text-2xl font-bold">$10,240.50</div>
              <div className="flex justify-between text-sm">
                <span>John Doe</span>
                <span>Exp: 08/25</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{payment.name}</div>
                      <div className="text-sm text-gray-500">{payment.date}</div>
                    </div>
                    <div className="font-semibold">{payment.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="col-span-full">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Select onSelect={(value) => {
                         console.log('Selected:', value);
                    }} options={sortOptions.map(x => ({
                        key: x.key,
                        value: x.value
                    }))} />        
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </div>
                    <div className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
