import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { children } = (this as any).props;
    const { hasError, error } = this.state;

    if (hasError) {
      let errorMessage = error?.message || 'Ocurrió un error inesperado.';
      let isPermissionError = false;

      try {
        const parsedError = JSON.parse(error?.message || '');
        if (parsedError.error) {
          errorMessage = parsedError.error;
          if (errorMessage.includes('insufficient permissions')) {
            errorMessage = 'No tienes permisos suficientes para acceder a estos datos. Verifica tu conexión o contacta al administrador.';
            isPermissionError = true;
          }
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
          <Card className="w-full max-w-md border-red-900/50 bg-black text-zinc-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500 uppercase italic font-black">
                <AlertCircle className="w-6 h-6" />
                Error del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <p className="text-zinc-300 text-sm font-mono break-words">{errorMessage}</p>
              </div>
              <p className="text-zinc-500 text-xs">
                {isPermissionError 
                  ? 'Este error suele ocurrir si las reglas de la base de datos no están sincronizadas.' 
                  : 'Intenta recargar la página o cerrar sesión para reintentar.'}
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                onClick={() => window.location.reload()}
              >
                REINTENTAR
              </Button>
              <Button 
                variant="ghost"
                className="w-full text-zinc-500 hover:text-zinc-300"
                onClick={() => {
                  import('../lib/firebase').then(m => m.auth.signOut());
                  window.location.reload();
                }}
              >
                Cerrar Sesión y Reintentar
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return children;
  }
}
