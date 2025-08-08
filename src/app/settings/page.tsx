'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Moon, Sun, Type, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function SettingsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('16px');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem('theme');
    const initialFontSize = localStorage.getItem('fontSize') || '16px';

    if (initialTheme === 'dark') {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    root.style.fontSize = initialFontSize;
    setFontSize(initialFontSize);

  }, []);

  const toggleDarkMode = (checked: boolean) => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', checked);
    setIsDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  const handleFontSizeChange = (size: string) => {
    const root = window.document.documentElement;
    root.style.fontSize = size;
    setFontSize(size);
    localStorage.setItem('fontSize', size);
  }

  const handleClearHistory = () => {
    localStorage.removeItem('simba-chats');
    // We could also show a toast here
    router.push('/');
  };

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('common.back')}</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">{t('settings.title')}</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.accessibility.title')}</CardTitle>
              <CardDescription>
                {t('settings.accessibility.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                  <span>{t('settings.darkMode.label')}</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    {t('settings.darkMode.description')}
                  </span>
                </Label>
                <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5"/>
                    <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                        aria-label={t('settings.darkMode.ariaLabel')}
                    />
                    <Moon className="h-5 w-5"/>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="flex flex-col gap-1">
                  <span>{t('settings.fontSize.label')}</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    {t('settings.fontSize.description')}
                  </span>
                </Label>
                 <div className="flex items-center gap-2">
                    <Type className="h-4 w-4"/>
                    <Button variant={fontSize === '14px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('14px')}>
                        {t('settings.fontSize.small')}
                    </Button>
                     <Button variant={fontSize === '16px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('16px')}>
                        {t('settings.fontSize.normal')}
                    </Button>
                     <Button variant={fontSize === '18px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('18px')}>
                        {t('settings.fontSize.large')}
                    </Button>
                     <Type className="h-6 w-6"/>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
             <CardHeader>
                <CardTitle>{t('settings.dataManagement.title')}</CardTitle>
                <CardDescription>
                    {t('settings.dataManagement.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto">
                            <Trash2 className="h-4 w-4" />
                            <span>{t('settings.clearHistory.button')}</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>
                           <div className="flex items-center gap-2">
                             <AlertTriangle className="h-6 w-6 text-destructive" />
                             {t('settings.clearHistory.confirmTitle')}
                           </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('settings.clearHistory.confirmDescription')}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/90">
                           {t('settings.clearHistory.confirmButton')}
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
