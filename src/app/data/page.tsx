import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DataUpload } from '@/components/data/data-upload';
import { AiInsights } from '@/components/data/ai-insights';
import { Separator } from '@/components/ui/separator';

export default function DataPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <DataUpload />
        <Separator />
        <AiInsights />
      </div>
    </DashboardLayout>
  );
}
