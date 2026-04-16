import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from './ui/button';
import { 
  Trophy, 
  Map as MapIcon, 
  Car, 
  Lightbulb, 
  Compass, 
  LogOut, 
  Menu,
  Search,
  User as UserIcon,
  Rocket,
  MessageSquare,
  Languages
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export default function Layout({ 
  children, 
  activeSection, 
  setActiveSection, 
  searchQuery, 
  setSearchQuery,
  accentColor,
  setAccentColor
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const SECTIONS = [
    { id: 'home', name: t.nav.home, icon: Trophy },
    { id: 'mechanics', name: t.nav.mechanics, icon: Rocket },
    { id: 'maps', name: t.nav.maps, icon: MapIcon },
    { id: 'hitboxes', name: t.nav.hitboxes, icon: Car },
    { id: 'tips', name: t.nav.tips, icon: Lightbulb },
    { id: 'positioning', name: t.nav.positioning, icon: Compass },
    { id: 'community', name: t.nav.community, icon: MessageSquare },
  ];

  const colors = [
    { id: 'blue', class: 'bg-blue-500' },
    { id: 'red', class: 'bg-red-500' },
    { id: 'green', class: 'bg-green-500' },
    { id: 'orange', class: 'bg-orange-500' },
    { id: 'purple', class: 'bg-purple-500' },
    { id: 'pink', class: 'bg-pink-500' },
  ];

  const textActiveMap: Record<string, string> = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500'
  };

  const bgActiveMap: Record<string, string> = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600',
    pink: 'bg-pink-600'
  };

  const shadowActiveMap: Record<string, string> = {
    blue: 'shadow-blue-900/20',
    red: 'shadow-red-900/20',
    green: 'shadow-green-900/20',
    orange: 'shadow-orange-900/20',
    purple: 'shadow-purple-900/20',
    pink: 'shadow-pink-900/20'
  };

  const handleSignOut = () => {
    localStorage.removeItem('rl_academy_demo');
    signOut(auth);
    window.location.reload();
  };

  const NavContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <h1 className={cn("text-xl font-black italic uppercase flex items-center gap-2", textActiveMap[accentColor])}>
          <Rocket className="w-6 h-6 fill-current" />
          RL Academy
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setIsMobileMenuOpen(false);
            }}
            className={cn(
              "flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200 uppercase text-xs font-black tracking-widest",
              activeSection === section.id 
                ? cn(bgActiveMap[accentColor], "text-white shadow-lg", shadowActiveMap[accentColor]) 
                : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            )}
          >
            <section.icon className="w-5 h-5" />
            <span>{section.name}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 py-6 border-t border-zinc-800 space-y-6">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Color de Contraste</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setAccentColor(c.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                  c.class,
                  accentColor === c.id ? "border-white scale-110" : "border-transparent"
                )}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Idioma / Language</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage('es')}
              className={cn(
                "flex-1 py-1.5 text-[10px] font-black rounded border transition-all",
                language === 'es' ? "bg-blue-600 border-blue-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
              )}
            >
              ESPAÑOL
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={cn(
                "flex-1 py-1.5 text-[10px] font-black rounded border transition-all",
                language === 'en' ? "bg-blue-600 border-blue-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
              )}
            >
              ENGLISH
            </button>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">{t.nav.logout}</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 h-screen">
        <NavContent />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-bottom border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-zinc-900 border-zinc-800 w-64">
                <NavContent />
              </SheetContent>
            </Sheet>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Buscar contenido..." 
                className={cn("pl-10 bg-zinc-800/50 border-zinc-700 text-white", `focus:ring-${accentColor}-500`)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium">{auth.currentUser?.displayName || 'Usuario'}</span>
              <span className="text-xs text-zinc-500">{auth.currentUser?.email}</span>
            </div>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", bgActiveMap[accentColor])}>
              <UserIcon className="w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
