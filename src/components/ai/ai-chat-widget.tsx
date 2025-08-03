'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, ArrowUp, Sparkles, Loader2, X } from "lucide-react";
import { summarizeDataTrends } from '@/ai/flows/summarize-data-trends';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const mockCsvData = `Date,Users,Revenue,Platform
2024-01-01,1500,2500,Desktop
2024-01-02,1600,2700,Mobile
2024-01-03,1550,2600,Desktop
2024-02-01,1800,3000,Mobile
2024-02-02,1900,3200,Desktop
2024-03-01,2200,3800,Mobile
2024-03-02,2100,3600,Desktop`;

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: React.ReactNode;
}

export function AiChatWidget() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Add a welcome message when the chat opens for the first time
            setMessages([{ 
                id: 'welcome', 
                type: 'ai', 
                content: "Hello! I'm your AI data analyst. Ask me anything about your data." 
            }]);
        }
    }, [isOpen, messages.length]);
    
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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="primary"
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
                >
                   {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-80 md:w-96 p-0 border-none shadow-xl rounded-lg mr-2 mb-2">
                 <Card className="flex flex-col h-[500px] justify-between border-0">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <CardTitle>AI Assistant</CardTitle>
                        </div>
                        <CardDescription>Ask questions about your sample data.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-0">
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                                        {message.type === 'ai' && (
                                            <Avatar className="h-8 w-8 border" data-ai-hint="abstract tech">
                                                <AvatarImage src="https://placehold.co/100x100" />
                                                <AvatarFallback>AI</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-8 w-8 border" data-ai-hint="abstract tech">
                                            <AvatarImage src="https://placehold.co/100x100" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <div className="max-w-[85%] rounded-lg px-3 py-2 bg-muted shadow-sm flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            <p className="text-sm">Thinking...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div ref={bottomRef} />
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <form onSubmit={handleSubmit} className="relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="pr-12"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                 </Card>
            </PopoverContent>
        </Popover>
    );
}
