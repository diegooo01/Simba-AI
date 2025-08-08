
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

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

const ReportDetail = ({ label, value }: { label: string; value: string | string[] | undefined }) => {
    if(!value) return null;
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

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Analizando la conversación y generando el reporte...</p>
        <p className="text-sm text-muted-foreground/80">Esto puede tardar unos segundos.</p>
    </div>
)

export default function ReportDetailPage() {
    const params = useParams();
    const id = params.id as string;
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
                title: 'Error al cargar la conversación',
                description: 'No se pudo encontrar la conversación en el historial.',
            });
            setIsLoading(false);
        }
    }, [id, toast]);

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
                    title: 'Error al generar el reporte',
                    description: 'La IA no pudo procesar esta conversación. Por favor, inténtalo de nuevo.',
                });
            } finally {
                setIsLoading(false);
            }
        };

        getReport();
    }, [conversation, toast]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/reports">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver a la lista</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold truncate">Reporte de Interacción</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isLoading ? "Generando Reporte..." : `Reporte para: "${conversation?.title}"`}
              </CardTitle>
              <CardDescription>
                Análisis detallado de la sesión de chat generado por IA.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? <LoadingState /> : !report ? (
                     <div className="text-center text-destructive-foreground bg-destructive p-4 rounded-md">
                        No se pudo generar el reporte para esta conversación.
                     </div>
                ) : (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Información General</AccordionTrigger>
                    <AccordionContent>
                        <dl className="divide-y">
                            <ReportDetail label="ID de sesión" value={conversation?.id} />
                            <ReportDetail label="Fecha y hora de inicio" value={report.generalInfo.startTime} />
                            <ReportDetail label="Duración total" value={report.generalInfo.totalDuration} />
                            <ReportDetail label="Contexto inicial" value={report.generalInfo.initialContext} />
                            <ReportDetail label="Emociones iniciales" value={report.generalInfo.initialEmotions?.join(', ')} />
                        </dl>
                    </AccordionContent>
                    </AccordionItem>
                    
                    {report.emotionAnalysis?.map((emotion, index) => (
                        <AccordionItem value={`item-${index + 2}`} key={index}>
                            <AccordionTrigger>
                                {index === 0 ? "Análisis de Emoción Principal" : `Análisis de Emoción Secundaria #${index}`}
                            </AccordionTrigger>
                            <AccordionContent>
                                <dl className="divide-y">
                                    <ReportDetail label="Tipo de emoción" value={emotion.emotionType} />
                                    <ReportDetail label="Palabras clave" value={emotion.keywords?.join(', ')} />
                                    <ReportDetail label="Intensidad" value={emotion.intensity} />
                                    <ReportDetail label="Técnicas aplicadas" value={emotion.appliedTechniques} />
                                </dl>
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                    <AccordionItem value="item-summary">
                    <AccordionTrigger>Resumen y Cierre de la Conversación</AccordionTrigger>
                    <AccordionContent>
                        <dl className="divide-y">
                            <ReportDetail label="Flujo de la conversación" value={report.summary.conversationFlow} />
                            <ReportDetail label="Emoción al final" value={report.summary.endEmotion} />
                            <ReportDetail label="Recomendaciones finales" value={report.summary.finalRecommendations} />
                            <ReportDetail label="Acción tomada" value={report.summary.actionTaken} />
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
