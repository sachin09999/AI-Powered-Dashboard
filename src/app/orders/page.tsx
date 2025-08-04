import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const orders = [
    { id: '#3210', status: 'Shipped', customer: 'Olivia Martin', date: 'Feb 20, 2022', total: '$42.25' },
    { id: '#3209', status: 'Paid', customer: 'Ava Johnson', date: 'Feb 18, 2022', total: '$74.99' },
    { id: '#3204', status: 'Paid', customer: 'Michael Johnson', date: 'Jan 28, 2022', total: '$64.75' },
    { id: '#3203', status: 'Shipped', customer: 'Lisa Anderson', date: 'Jan 25, 2022', total: '$42.25' },
    { id: '#3202', status: 'Paid', customer: 'Samantha Williams', date: 'Jan 22, 2022', total: '$74.99' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>A list of your recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell><Badge variant={order.status === 'Shipped' ? 'default' : 'secondary'}>{order.status}</Badge></TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
