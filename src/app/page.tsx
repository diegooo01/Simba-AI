
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, User, Settings, Send, Loader2, Menu, MessageSquare, LifeBuoy, FileText, Plus } from 'lucide-react';
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

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
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
          href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/"
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

const SidebarContent = ({ conversations, onSelectConversation, onNewChat }: { conversations: Conversation[], onSelectConversation: (id: string) => void, onNewChat: () => void }) => {
  return (
    <div className="flex h-full flex-col bg-muted/40 p-4 text-foreground">
      <div className="mb-4 flex items-center justify-between">
        <div className='flex items-center gap-2'>
            <Image src="/simba-logo.png" alt="Simba Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-3xl font-bold">Simba</h1>
        </div>
        <Button size="icon" variant="outline" className="rounded-full h-9 w-9" onClick={onNewChat} aria-label="Nuevo chat">
            <Plus className="h-5 w-5"/>
        </Button>
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
           {conversations.map((chat) => (
             <Button key={chat.id} variant="ghost" className="w-full justify-start gap-3 px-3 font-normal" onClick={() => onSelectConversation(chat.id)}>
                <MessageSquare className="h-4 w-4" />
                <span className="truncate">{chat.title}</span>
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

const createNewConversation = (): Conversation => ({
    id: Date.now().toString(),
    title: 'Nueva Conversación',
    messages: [{
        id: '1',
        role: 'assistant',
        content: "¡Hola! Soy Simba, tu compañero de apoyo emocional. ¿Cómo te sientes hoy?",
    }],
});

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
        const savedConversations = localStorage.getItem('simba-chats');
        if (savedConversations) {
            const parsed = JSON.parse(savedConversations) as Conversation[];
            if(parsed.length > 0) {
              setConversations(parsed);
              setActiveConversationId(parsed[0]?.id);
            } else {
                const newConv = createNewConversation();
                setConversations([newConv]);
                setActiveConversationId(newConv.id);
            }
        } else {
          const newConv = createNewConversation();
          setConversations([newConv]);
          setActiveConversationId(newConv.id);
        }
    } catch(e) {
        const newConv = createNewConversation();
        setConversations([newConv]);
        setActiveConversationId(newConv.id);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('simba-chats', JSON.stringify(conversations));
    }
  }, [conversations, isMounted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversationId, isLoading]);


  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleNewChat = () => {
    const newConv = createNewConversation();
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
  };
  
  const updateConversationMessages = (conversationId: string, newMessages: Message[]) => {
      setConversations(prev => prev.map(conv => {
          if (conv.id === conversationId) {
              // Create a title from the first user message if it's a new chat
              const isNewChat = conv.messages.length <= 1 && newMessages.some(m => m.role === 'user');
              const newTitle = isNewChat 
                  ? newMessages.find(m => m.role === 'user')?.content.substring(0, 30) || 'Conversación'
                  : conv.title;
              return { ...conv, title: newTitle, messages: newMessages };
          }
          return conv;
      }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !activeConversationId) return;

    const activeConversation = conversations.find(c => c.id === activeConversationId);
    if(!activeConversation) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    const updatedMessages = [...activeConversation.messages, userMessage];
    
    updateConversationMessages(activeConversationId, updatedMessages);
    
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
      
      const finalMessages = [...updatedMessages, assistantMessage];
      updateConversationMessages(activeConversationId, finalMessages);

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ocurrió un error',
        description: 'No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.',
      });
      // Rollback user message on error
      updateConversationMessages(activeConversationId, activeConversation.messages);

    } finally {
      setIsLoading(false);
    }
  };
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="flex h-screen w-full bg-background">
      <aside className="hidden w-72 flex-shrink-0 border-r bg-muted/40 md:block">
        <SidebarContent conversations={conversations} onSelectConversation={handleSelectConversation} onNewChat={handleNewChat} />
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <SidebarContent conversations={conversations} onSelectConversation={handleSelectConversation} onNewChat={handleNewChat} />
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-lg font-semibold md:hidden">Simba</p>
          <div />
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-4 md:p-6">
            {activeConversation?.messages.map((message) => <ChatMessage key={message.id} message={message} />)}
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
              disabled={isLoading || !isMounted}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-2.5 right-3 h-10 w-10 rounded-full"
              disabled={isLoading || !input.trim() || !isMounted}
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
