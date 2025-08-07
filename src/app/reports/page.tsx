
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const ReportDetail = ({ label, value }: { label: string; value: string | string[] }) => (
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

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Reportes de Interacción</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Interacción Emocional</CardTitle>
              <CardDescription>
                Análisis detallado de la sesión de chat con el asistente virtual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Información General</AccordionTrigger>
                  <AccordionContent>
                    <dl className="divide-y">
                        <ReportDetail label="ID de sesión" value="ses_1a2b3c4d5e" />
                        <ReportDetail label="Fecha y hora de inicio" value="26 de julio de 2024, 10:00 AM" />
                        <ReportDetail label="Fecha y hora de finalización" value="26 de julio de 2024, 10:25 AM" />
                        <ReportDetail label="Duración total" value="25 minutos" />
                        <ReportDetail label="Nombre del usuario" value="Usuario" />
                        <ReportDetail label="ID del usuario" value="usr_x7y8z9a0b1" />
                        <ReportDetail label="Idioma" value="Español" />
                        <ReportDetail label="Contexto inicial" value="El usuario menciona sentirse triste y agotado emocionalmente." />
                        <ReportDetail label="Emociones iniciales" value="Tristeza, Apatía" />
                    </dl>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Análisis de Emociones y Técnicas Aplicadas</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-lg">Emoción Principal Detectada</h4>
                            <Separator className="my-2"/>
                            <dl className="divide-y">
                                <ReportDetail label="Tipo de emoción" value="Tristeza" />
                                <ReportDetail label="Palabras clave" value='"Me siento solo", "no tengo ganas", "nada tiene sentido"' />
                                <ReportDetail label="Intensidad" value="Alta" />
                                <ReportDetail label="Técnicas aplicadas" value={["Validación de la emoción", "Sugerencia de escritura expresiva", "Recomendación de hablar con alguien cercano"]} />
                            </dl>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">Emoción Secundaria Detectada</h4>
                            <Separator className="my-2"/>
                            <dl className="divide-y">
                                <ReportDetail label="Tipo de emoción" value="Ansiedad" />
                                <ReportDetail label="Palabras clave" value='"Tengo miedo", "no puedo respirar"' />
                                <ReportDetail label="Intensidad" value="Moderada" />
                                <ReportDetail label="Técnicas aplicadas" value={["Ejercicio de respiración 4-7-8", "Técnica de anclaje o grounding (5-4-3-2-1)"]} />
                            </dl>
                        </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Resumen y Cierre de la Conversación</AccordionTrigger>
                  <AccordionContent>
                     <dl className="divide-y">
                        <ReportDetail label="Flujo de la conversación" value="El usuario inició la conversación manifestando tristeza y agotamiento. A medida que avanzaba el diálogo, emergieron síntomas de ansiedad. El asistente aplicó técnicas de validación y ejercicios de respiración, logrando una leve mejoría en el estado del usuario." />
                        <ReportDetail label="Emoción al final" value="El usuario reportó sentirse 'algo mejor', aunque reconoció que la sensación de vacío persistía. Se mostró receptivo a las sugerencias." />
                        <ReportDetail label="Recomendaciones finales" value={["Continuar con rutinas de autocuidado (dormir, comer, moverse)", "Considerar hablar con un profesional si los síntomas persisten", "Utilizar aplicaciones de meditación como recurso de apoyo"]} />
                        <ReportDetail label="Acción tomada" value="No se requirió escalamiento a líneas de emergencia. La conversación se mantuvo en un nivel de apoyo emocional sin alertas críticas." />
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
