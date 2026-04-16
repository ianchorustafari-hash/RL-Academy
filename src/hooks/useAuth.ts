import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isDemo = localStorage.getItem('rl_academy_demo') === 'true';
    if (isDemo) {
      setUser({
        uid: 'demo-user',
        email: 'invitado@rlacademy.com',
        displayName: 'Invitado Demo',
      } as any);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}
