import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function AnalyticsPage() {
    const data = [
        { source: 'google.com', visitors: '4,827', unique: '3,928', bounceRate: '48.2%' },
        { source: 'twitter.com', visitors: '3,281', unique: '2,182', bounceRate: '32.4%' },
        { source: 'github.com', visitors: '2,928', unique: '1,827', bounceRate: '24.8%' },
        { source: 'producthunt.com', visitors: '1,283', unique: '928', bounceRate: '42.9%' },
    ];

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Here are the latest analytics for your projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead>Visitors</TableHead>
                        <TableHead>Unique</TableHead>
                        <TableHead>Bounce Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.source}>
                            <TableCell>{row.source}</TableCell>
                            <TableCell>{row.visitors}</TableCell>
                            <TableCell>{row.unique}</TableCell>
                            <TableCell>{row.bounceRate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
}
