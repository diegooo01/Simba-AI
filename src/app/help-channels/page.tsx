
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const helpContacts = [
    {
        name: 'Centro de Atención Psicológica de UNIANDES',
        description: 'Apoyo psicológico para la comunidad de la Universidad de los Andes.',
        action: {
            type: 'link',
            href: 'https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/',
            label: 'Visitar sitio web',
            icon: <LinkIcon className="h-4 w-4" />
        }
    },
    {
        name: 'Línea 106 "El poder de ser escuchado"',
        description: 'Línea de emergencia psicológica en Bogotá, disponible 24 horas.',
        action: {
            type: 'call',
            href: 'tel:106',
            label: 'Llamar a 106',
            icon: <Phone className="h-4 w-4" />
        }
    },
    {
        name: 'Línea de Emergencias General',
        description: 'Para cualquier situación que requiera atención inmediata en Bogotá.',
        action: {
            type: 'call',
            href: 'tel:123',
            label: 'Llamar a 123',
            icon: <Phone className="h-4 w-4" />
        }
    },
    {
        name: 'Línea Púrpura',
        description: 'Apoyo psicológico para mujeres en Bogotá.',
        action: {
            type: 'call',
            href: 'tel:018000112137',
            label: 'Llamar a 018000112137',
            icon: <Phone className="h-4 w-4" />
        }
    }
]

export default function HelpChannelsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Canales de Ayuda</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactos de Ayuda y Emergencia</CardTitle>
              <CardDescription>
                Si necesitas apoyo, no dudes en contactar con alguna de estas organizaciones. No estás solo/a.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {helpContacts.map((contact, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="mb-4 sm:mb-0">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <a href={contact.action.href} target={contact.action.type === 'link' ? '_blank' : undefined} rel={contact.action.type === 'link' ? 'noopener noreferrer' : undefined} className='w-full sm:w-auto'>
                    <Button className='w-full sm:w-auto'>
                      {contact.action.icon}
                      <span>{contact.action.label}</span>
                    </Button>
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
