'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Link as LinkIcon, Database } from "lucide-react";

export function DataUpload() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Import Data</CardTitle>
                <CardDescription>Upload files or connect to data sources to start analyzing.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <div className="flex flex-col items-center gap-2">
                             <p className="text-sm text-muted-foreground">Drag & drop your files here or</p>
                             <Button asChild size="sm">
                                <label htmlFor="file-upload">
                                    Browse Files
                                    <Input id="file-upload" type="file" className="sr-only" />
                                </label>
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Supported file types: .csv, .xlsx</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-medium text-lg">Connect to a data source</h3>
                        <Button variant="outline" className="w-full justify-start gap-3">
                            <Database className="h-5 w-5" />
                            <span>Connect to a Database</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3">
                            <LinkIcon className="h-5 w-5" />
                            <span>Connect via API</span>
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.543 6.457H15.75v-1.5H8.25v1.5H2.457L.405 23.595h23.19L21.543 6.457zM8.25 3h7.5v1.957h-7.5V3zm13.141 19.095H2.607l1.852-15.09h5.641v1.5h5.25v-1.5h5.641l1.852 15.09z"></path><path d="M12.825 15.382v-2.1l-3.45 3.45 3.45 3.45v-2.1h3.3v-2.7h-3.3z"></path></svg>
                            <span>Google Analytics</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
