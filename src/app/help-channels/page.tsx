'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function HelpChannelsPage() {
  const { t } = useLanguage();

  const helpContacts = [
    {
      name: t('help.uniandes.name'),
      description: t('help.uniandes.description'),
      action: {
        type: 'link',
        href: 'https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/',
        label: t('help.uniandes.action'),
        icon: <LinkIcon className="h-4 w-4" />,
      },
    },
    {
      name: t('help.line106.name'),
      description: t('help.line106.description'),
      action: {
        type: 'call',
        href: 'tel:106',
        label: t('help.line106.action'),
        icon: <Phone className="h-4 w-4" />,
      },
    },
    {
      name: t('help.emergency.name'),
      description: t('help.emergency.description'),
      action: {
        type: 'call',
        href: 'tel:123',
        label: t('help.emergency.action'),
        icon: <Phone className="h-4 w-4" />,
      },
    },
    {
      name: t('help.purpleline.name'),
      description: t('help.purpleline.description'),
      action: {
        type: 'call',
        href: 'tel:018000112137',
        label: t('help.purpleline.action'),
        icon: <Phone className="h-4 w-4" />,
      },
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('common.back')}</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">{t('help.title')}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('help.cardTitle')}</CardTitle>
              <CardDescription>
                {t('help.cardDescription')}
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
