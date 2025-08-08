
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, User, Settings, Send, Loader2, Menu, MessageSquare, LifeBuoy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getSimbaResponse } from '@/app/actions';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isCareMessage?: boolean;
}

const CareLineMessage = () => (
  <Alert variant="destructive" className="max-w-md bg-transparent border-0 text-destructive-foreground p-0">
    <Bot className="h-4 w-4" />
    <AlertTitle>El apoyo está disponible</AlertTitle>
    <AlertDescription>
      <p>Parece que estás pasando por un momento difícil. Por favor, considera buscar apoyo.</p>
      <p className="mt-2">
        Puedes contactar al{' '}
        <a
          href="https://psicologia.uniandes.edu.co/en/consulting-center"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          Centro de Atención Psicológica de UNIANDES
        </a>
        .
      </p>
      <p className="mt-2">
        En Bogotá, para emergencias psicológicas puedes marcar la <strong>Línea 106</strong> ("El poder de ser escuchado"), disponible 24 horas. También puedes llamar al <strong>123</strong> para emergencias generales. Adicionalmente, la <strong>Línea Púrpura (018000112137)</strong> está disponible para mujeres que necesiten apoyo psicológico.
      </p>
    </AlertDescription>
  </Alert>
);

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  const bubbleBg = isUser
    ? 'bg-primary text-primary-foreground'
    : message.isCareMessage
    ? 'bg-destructive text-destructive-foreground'
    : 'bg-secondary text-secondary-foreground';

  return (
    <div className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/simba-logo.png" alt="Simba" />
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-2xl p-3 md:p-4 text-base',
          isUser ? 'rounded-br-none' : 'rounded-bl-none',
          bubbleBg
        )}
      >
        {message.isCareMessage ? <CareLineMessage /> : <p>{message.content}</p>}
      </div>
      {isUser && (
        <Avatar className="h-10 w-10 border">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const LoadingMessage = () => (
  <div className="flex items-start gap-4 justify-start">
    <Avatar className="h-10 w-10 border">
      <AvatarImage src="/simba-logo.png" alt="Simba" />
      <AvatarFallback className="bg-accent text-accent-foreground">
        <Bot />
      </AvatarFallback>
    </Avatar>
    <div className="max-w-md rounded-2xl p-4 text-lg rounded-bl-none bg-secondary text-secondary-foreground">
      <Loader2 className="animate-spin" />
    </div>
  </div>
);

const SidebarContent = () => {
  const previousChats = [
    'Conversación sobre ansiedad',
    'Charla de la semana pasada',
    'Reflexiones de hoy',
  ];

  return (
    <div className="flex h-full flex-col bg-muted/40 p-4 text-foreground">
      <div className="mb-8 flex items-center gap-2">
        <Image src="/simba-logo.png" alt="Simba Logo" width={40} height={40} className="rounded-full" />
        <h1 className="text-3xl font-bold">Simba</h1>
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/reports" passHref>
            <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-base">
                <FileText className="h-5 w-5" />
                Reportes
            </Button>
        </Link>
        <Link href="/help-channels" passHref>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-base">
            <LifeBuoy className="h-5 w-5" />
            Canales de Ayuda
          </Button>
        </Link>
        <Link href="/settings" passHref>
          <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-base">
            <Settings className="h-5 w-5" />
            Configuración
          </Button>
        </Link>
      </nav>

      <Separator className="my-4" />

      <div className="flex-1 overflow-y-auto">
        <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight">
          Chats Anteriores
        </h2>
        <div className="space-y-1 p-0">
           {previousChats.map((chat, index) => (
             <Button key={index} variant="ghost" className="w-full justify-start gap-3 px-3 font-normal">
                <MessageSquare className="h-4 w-4" />
                {chat}
             </Button>
           ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/50">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="person portrait" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Usuario</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "¡Hola! Soy Simba, tu compañero de apoyo emocional. ¿Cómo te sientes hoy?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await getSimbaResponse(currentInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        isCareMessage: result.redirectToCareLine,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ocurrió un error',
        description: 'No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // This effect ensures that theme and font size are applied on initial load
    // for the settings page, but it's kept here to ensure consistency if the user
    // navigates back to home without a full reload.
    const root = window.document.documentElement;
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
      root.style.fontSize = fontSize;
    } else {
      root.style.fontSize = '16px'; // Default font size
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="hidden w-72 flex-shrink-0 border-r bg-muted/40 md:block">
        <SidebarContent />
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-lg font-semibold md:hidden">Simba</p>
          <div />
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-4 md:p-6">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {isLoading && <LoadingMessage />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t bg-background/80 p-2 md:p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Comparte lo que tienes en mente..."
              className="min-h-[50px] resize-none rounded-2xl pr-20 text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-2.5 right-3 h-10 w-10 rounded-full"
              disabled={isLoading || !input.trim()}
              aria-label="Enviar mensaje"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
