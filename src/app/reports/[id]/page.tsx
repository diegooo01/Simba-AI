'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { generateReport, type GenerateReportOutput, type Message } from '@/ai/flows/generate-report';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const ReportDetail = ({ label, value }: { label: string; value: string | string[] | undefined }) => {
    if(!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 py-2">
        <dt className="font-semibold text-muted-foreground">{label}</dt>
        <dd className="md:col-span-2">
            {Array.isArray(value) ? (
            <ul className="list-disc list-inside">
                {value.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            ) : (
            value
            )}
        </dd>
        </div>
    );
};

const LoadingState = ({ t }: { t: (key: string) => string }) => (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">{t('report.generating')}</p>
        <p className="text-sm text-muted-foreground/80">{t('report.generatingHint')}</p>
    </div>
)

export default function ReportDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { t } = useLanguage();
    const [report, setReport] = useState<GenerateReportOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!id) return;
        try {
            const savedConversations = localStorage.getItem('simba-chats');
            if (savedConversations) {
                const parsed = JSON.parse(savedConversations) as Conversation[];
                const targetConversation = parsed.find(c => c.id === id);
                if (targetConversation) {
                    setConversation(targetConversation);
                } else {
                    throw new Error("Conversation not found");
                }
            }
        } catch (e) {
            console.error("Failed to load conversation", e);
            toast({
                variant: 'destructive',
                title: t('report.loadErrorTitle'),
                description: t('report.loadErrorDescription'),
            });
            setIsLoading(false);
        }
    }, [id, toast, t]);

    useEffect(() => {
        if (!conversation) return;

        const getReport = async () => {
            try {
                const generatedReport = await generateReport({ messages: conversation.messages });
                setReport(generatedReport);
            } catch (error) {
                console.error("Failed to generate report", error);
                toast({
                    variant: 'destructive',
                    title: t('report.generationErrorTitle'),
                    description: t('report.generationErrorDescription'),
                });
            } finally {
                setIsLoading(false);
            }
        };

        getReport();
    }, [conversation, toast, t]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/reports">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('common.back')}</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold truncate">{t('report.title')}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isLoading ? t('report.generatingTitle') : `${t('report.reportFor')} "${conversation?.title}"`}
              </CardTitle>
              <CardDescription>
                {t('report.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? <LoadingState t={t} /> : !report ? (
                     <div className="text-center text-destructive-foreground bg-destructive p-4 rounded-md">
                        {t('report.generationFailed')}
                     </div>
                ) : (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>{t('report.generalInfo.title')}</AccordionTrigger>
                    <AccordionContent>
                        <dl className="divide-y">
                            <ReportDetail label={t('report.generalInfo.sessionId')} value={conversation?.id} />
                            <ReportDetail label={t('report.generalInfo.startTime')} value={report.generalInfo.startTime} />
                            <ReportDetail label={t('report.generalInfo.totalDuration')} value={report.generalInfo.totalDuration} />
                            <ReportDetail label={t('report.generalInfo.initialContext')} value={report.generalInfo.initialContext} />
                            <ReportDetail label={t('report.generalInfo.initialEmotions')} value={report.generalInfo.initialEmotions?.join(', ')} />
                        </dl>
                    </AccordionContent>
                    </AccordionItem>
                    
                    {report.emotionAnalysis?.map((emotion, index) => (
                        <AccordionItem value={`item-${index + 2}`} key={index}>
                            <AccordionTrigger>
                                {index === 0 ? t('report.emotionAnalysis.primary') : `${t('report.emotionAnalysis.secondary')} #${index}`}
                            </AccordionTrigger>
                            <AccordionContent>
                                <dl className="divide-y">
                                    <ReportDetail label={t('report.emotionAnalysis.emotionType')} value={emotion.emotionType} />
                                    <ReportDetail label={t('report.emotionAnalysis.keywords')} value={emotion.keywords?.join(', ')} />
                                    <ReportDetail label={t('report.emotionAnalysis.intensity')} value={emotion.intensity} />
                                    <ReportDetail label={t('report.emotionAnalysis.appliedTechniques')} value={emotion.appliedTechniques} />
                                </dl>
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                    <AccordionItem value="item-summary">
                    <AccordionTrigger>{t('report.summary.title')}</AccordionTrigger>
                    <AccordionContent>
                        <dl className="divide-y">
                            <ReportDetail label={t('report.summary.conversationFlow')} value={report.summary.conversationFlow} />
                            <ReportDetail label={t('report.summary.endEmotion')} value={report.summary.endEmotion} />
                            <ReportDetail label={t('report.summary.finalRecommendations')} value={report.summary.finalRecommendations} />
                            <ReportDetail label={t('report.summary.actionTaken')} value={report.summary.actionTaken} />
                        </dl>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
