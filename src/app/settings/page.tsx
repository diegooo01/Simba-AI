'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Moon, Sun, Type } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('16px');

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem('theme');
    if (initialTheme === 'dark') {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }
    const initialFontSize = localStorage.getItem('fontSize');
    if (initialFontSize) {
      root.style.fontSize = initialFontSize;
      setFontSize(initialFontSize);
    }
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Configuración</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Accesibilidad</CardTitle>
              <CardDescription>
                Personaliza la apariencia de la aplicación para que se adapte a tus necesidades.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                  <span>Modo Noche</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Activa un tema oscuro para reducir la fatiga visual.
                  </span>
                </Label>
                <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5"/>
                    <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                    />
                    <Moon className="h-5 w-5"/>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size" className="flex flex-col gap-1">
                  <span>Tamaño de Fuente</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    Ajusta el tamaño del texto para una mejor legibilidad.
                  </span>
                </Label>
                 <div className="flex items-center gap-2">
                    <Type className="h-4 w-4"/>
                    <Button variant={fontSize === '14px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('14px')}>
                        Pequeño
                    </Button>
                     <Button variant={fontSize === '16px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('16px')}>
                        Normal
                    </Button>
                     <Button variant={fontSize === '18px' ? 'secondary' : 'outline'} size="sm" onClick={() => handleFontSizeChange('18px')}>
                        Grande
                    </Button>
                     <Type className="h-6 w-6"/>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
