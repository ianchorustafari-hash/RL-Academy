import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { handleFirestoreError, OperationType } from '../lib/firebase';

export default function Auth() {
  const [view, setView] = useState<'landing' | 'login' | 'register'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Sesión iniciada correctamente');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Initialize user document
        const userPath = `users/${userCredential.user.uid}`;
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            email,
            displayName: name,
            learnedMechanics: [],
            favoriteMaps: [],
            favoriteMechanics: [],
            rank: '',
            mainCar: '',
            favoriteMode: '',
            createdAt: new Date().toISOString()
          });
        } catch (dbError) {
          handleFirestoreError(dbError, OperationType.WRITE, userPath);
        }
        
        toast.success('Cuenta creada correctamente');
      }
    } catch (error: any) {
      let message = 'Ocurrió un error inesperado';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'Correo o contraseña incorrectos';
      } else if (error.code === 'auth/email-already-in-use') {
        message = 'Este correo ya está registrado';
      } else if (error.code === 'auth/weak-password') {
        message = 'La contraseña es muy débil (mínimo 6 caracteres)';
      } else if (error.code === 'auth/invalid-email') {
        message = 'El formato del correo no es válido';
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    toast.info(t.auth.demoBtn);
    localStorage.setItem('rl_academy_demo', 'true');
    window.location.reload();
  };

  if (view === 'landing') {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

        <div className="relative z-20 w-full max-w-4xl px-4 text-center space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] animate-pulse">
                <Rocket className="w-12 h-12 text-white fill-current" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic text-white uppercase leading-none">
              RL <span className="text-blue-500">Academy</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-bold max-w-2xl mx-auto uppercase tracking-wide">
              Domina la arena. Perfecciona tus mecánicas. Sube de rango.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="w-full md:w-64 h-16 bg-blue-600 hover:bg-blue-700 text-xl font-black italic uppercase transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
              onClick={() => setView('register')}
            >
              {t.auth.registerBtn}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full md:w-64 h-16 border-zinc-700 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800 text-xl font-black italic uppercase transition-all hover:scale-105"
              onClick={() => setView('login')}
            >
              {t.auth.loginBtn}
            </Button>
          </div>

          <div className="pt-4">
            <Button 
              variant="link" 
              className="text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-widest text-xs"
              onClick={handleDemoMode}
            >
              {t.auth.demoBtn}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 p-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 blur-sm"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      <Card className="relative z-10 w-full max-w-md border-zinc-800 bg-zinc-900/90 backdrop-blur-xl text-zinc-100 shadow-2xl shadow-blue-900/20 animate-in slide-in-from-bottom-8 duration-500">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 left-4 text-zinc-500 hover:text-white"
              onClick={() => setView('landing')}
            >
              <Rocket className="w-6 h-6 rotate-180" />
            </Button>
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Rocket className="w-6 h-6 text-white fill-current" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter italic text-blue-500 uppercase">
            RL ACADEMY
          </CardTitle>
          <CardDescription className="text-zinc-500 font-medium">
            {view === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {view === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400">{t.auth.username}</Label>
                <Input
                  id="name"
                  placeholder="Ej: JSTN"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 focus:border-blue-500 transition-colors text-white"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="piloto@rlacademy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500 transition-colors text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-400">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 focus:border-blue-500 transition-colors text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase py-6 text-lg" disabled={loading}>
              {loading ? t.auth.processing : view === 'login' ? t.auth.loginBtn : t.auth.registerBtn}
            </Button>
            
            <Button
              type="button"
              variant="link"
              className="text-zinc-500 hover:text-blue-400 transition-colors text-xs uppercase font-bold tracking-widest"
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
            >
              {view === 'login' ? t.auth.toggleToRegister : t.auth.toggleToLogin}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
