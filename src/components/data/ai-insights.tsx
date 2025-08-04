'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Sparkles, Loader2 } from "lucide-react";
import { summarizeDataTrends } from '@/ai/flows/summarize-data-trends';
import { recommendChartTypes } from '@/ai/flows/recommend-chart-types';
import { detectAnomalies } from '@/ai/flows/detect-anomalies';
import { useAlerts } from '@/context/alerts-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockCsvData = `Date,Users,Revenue,Platform
2024-01-01,1500,2500,Desktop
2024-01-02,1600,2700,Mobile
2024-01-03,1550,2600,Desktop
2024-02-01,1800,3000,Mobile
2024-02-02,1900,3200,Desktop
2024-03-01,2200,3800,Mobile
2024-03-02,2100,3600,Desktop
2024-03-15,50,500,Desktop`; // Added an anomaly for detection

const mockFields = ['Date', 'Users', 'Revenue', 'Platform'];

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: React.ReactNode;
}

export function AiInsights() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setAlerts } = useAlerts();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const handleInitialAnalysis = async () => {
        setIsLoading(true);
        setMessages([]);
        setAlerts([]);
        
        try {
            // Run summarization, recommendations, and anomaly detection in parallel
            const [summaryResult, recommendationsResult, anomalyResult] = await Promise.all([
                summarizeDataTrends({
                    data: mockCsvData,
                    question: 'Provide a general summary of the dataset.'
                }),
                recommendChartTypes({
                    dataSummary: "A summary of the data.", // Placeholder, will be updated
                    fields: mockFields,
                }),
                detectAnomalies({ data: mockCsvData })
            ]);

            // Update recommendations with the actual summary
            const finalRecommendations = await recommendChartTypes({
                dataSummary: summaryResult.summary,
                fields: mockFields,
            });

            const aiResponse = (
                <div>
                    <h4 className="font-bold mb-2">Data Summary:</h4>
                    <p className="mb-4">{summaryResult.summary}</p>
                    <h4 className="font-bold mb-2">Chart Recommendations:</h4>
                    <p className="mb-2">{finalRecommendations.reasoning}</p>
                    <div className="flex flex-wrap gap-2">
                        {finalRecommendations.recommendedChartTypes.map(chart => (
                             <span key={chart} className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                                {chart.charAt(0).toUpperCase() + chart.slice(1)} Chart
                            </span>
                        ))}
                    </div>
                </div>
            );
            
            setMessages([{ id: Date.now().toString(), type: 'ai', content: aiResponse }]);

            if (anomalyResult.anomalies.length > 0) {
                setAlerts(anomalyResult.anomalies);
            }

        } catch (error) {
            setMessages([{ id: 'error', type: 'ai', content: 'Sorry, I encountered an error during the initial analysis. Please try again.' }]);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), type: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const result = await summarizeDataTrends({
                data: mockCsvData,
                question: currentInput,
            });
            const aiMessage: Message = { id: (Date.now() + 1).toString(), type: 'ai', content: result.answer };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { id: 'error' + Date.now(), type: 'ai', content: 'Sorry, I had trouble answering that. Please try another question.' };
            setMessages(prev => [...prev, errorMessage]);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <CardTitle>AI-Powered Insights</CardTitle>
                </div>
                <CardDescription>Ask questions or request an initial analysis to uncover insights and detect anomalies.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[500px] justify-between">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center gap-4">
                        <Sparkles className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Click the button below to get an initial analysis of your sample data.</p>
                        <Button onClick={handleInitialAnalysis} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Get Initial Data Analysis
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 pr-4 -mr-4 mb-4">
                        <div className="space-y-6">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-start gap-4 ${message.type === 'user' ? 'justify-end' : ''}`}>
                                    {message.type === 'ai' && (
                                        <Avatar className="h-9 w-9 border" data-ai-hint="abstract tech">
                                            <AvatarImage src="https://placehold.co/100x100.png" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`max-w-[85%] rounded-lg p-3 shadow-sm ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-9 w-9 border" data-ai-hint="abstract tech">
                                        <AvatarImage src="https://placehold.co/100x100.png" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div className="max-w-[85%] rounded-lg p-3 bg-muted shadow-sm flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <p className="text-sm">Thinking...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div ref={bottomRef} />
                    </ScrollArea>
                )}
                <form onSubmit={handleSubmit} className="relative">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        className="pr-12"
                        disabled={isLoading || messages.length === 0}
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
