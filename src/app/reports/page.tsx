'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/language-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isCareMessage?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export default function ReportsListPage() {
  const { t } = useLanguage();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem('simba-chats');
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations) as Conversation[];
        // Filter out new/empty conversations that only have the initial assistant message
        const meaningfulConversations = parsed.filter(c => c.messages.length > 1);
        setConversations(meaningfulConversations);
      }
    } catch (e) {
      console.error("Failed to load conversations from localStorage", e);
    } finally {
        setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('common.back')}</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">{t('reports.title')}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('reports.cardTitle')}</CardTitle>
              <CardDescription>
                {t('reports.cardDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {isLoading && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              {!isLoading && conversations.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p>{t('reports.noConversations')}</p>
                  <p className="text-sm">{t('reports.noConversationsHint')}</p>
                </div>
              )}
              {!isLoading && conversations.map((conv) => (
                 <Link key={conv.id} href={`/reports/${conv.id}`} passHref>
                    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-semibold">{conv.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {t('reports.messagesCount', { count: conv.messages.length })} &middot; {new Date(parseInt(conv.id)).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">{t('reports.viewReport')}</Button>
                    </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
