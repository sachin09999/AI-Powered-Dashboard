import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Box } from "lucide-react";

export default function ProductsPage() {
  const products = [
    { name: 'Laser Tag', price: '$250.00', stock: '25 in stock', sales: 120 },
    { name: 'Gloop', price: '$25.00', stock: '12 in stock', sales: 80 },
    { name: 'Splat', price: '$12.50', stock: '0 in stock', sales: 40 },
    { name: 'Zorpy', price: '$420.00', stock: '2 in stock', sales: 2 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>A list of your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                            <Box className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
