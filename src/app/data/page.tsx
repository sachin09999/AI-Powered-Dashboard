'use client';
import { AiInsights } from '@/components/data/ai-insights';
import { DataUpload } from '@/components/data/data-upload';
import { Separator } from '@/components/ui/separator';

export default function DataPage() {
  return (
      <div className="flex flex-col gap-8">
        <DataUpload />
        <Separator />
        <AiInsights />
      </div>
  );
}
