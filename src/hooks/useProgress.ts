import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';
import { toast } from 'sonner';

export function useProgress(uid: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return;
    }

    if (uid === 'demo-user') {
      setProfile({
        uid: 'demo-user',
        email: 'invitado@rlacademy.com',
        learnedMechanics: [],
        favoriteMaps: [],
        favoriteMechanics: [],
        rank: '',
        mainCar: '',
        favoriteMode: '',
        platform: 'PC',
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      return;
    }

    const path = `users/${uid}`;
    const unsubscribe = onSnapshot(doc(db, 'users', uid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // Initialize profile if it doesn't exist
        const newProfile: UserProfile = {
          uid,
          email: '', // Will be updated on first load
          learnedMechanics: [],
          favoriteMaps: [],
          favoriteMechanics: [],
          rank: '',
          mainCar: '',
          favoriteMode: '',
          createdAt: new Date().toISOString()
        };
        setDoc(doc(db, 'users', uid), newProfile).catch(e => handleFirestoreError(e, OperationType.WRITE, path));
        setProfile(newProfile);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return unsubscribe;
  }, [uid]);

  const toggleLearned = async (mechanicId: string) => {
    if (!uid || !profile) return;
    if (uid === 'demo-user') {
      setProfile(prev => prev ? {
        ...prev,
        learnedMechanics: prev.learnedMechanics.includes(mechanicId)
          ? prev.learnedMechanics.filter(id => id !== mechanicId)
          : [...prev.learnedMechanics, mechanicId]
      } : null);
      return;
    }
    const path = `users/${uid}`;
    const isLearned = profile.learnedMechanics.includes(mechanicId);
    try {
      await updateDoc(doc(db, 'users', uid), {
        learnedMechanics: isLearned ? arrayRemove(mechanicId) : arrayUnion(mechanicId)
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  };

  const toggleFavoriteMap = async (mapId: string) => {
    if (!uid || !profile) return;
    if (uid === 'demo-user') {
      setProfile(prev => prev ? {
        ...prev,
        favoriteMaps: prev.favoriteMaps.includes(mapId)
          ? prev.favoriteMaps.filter(id => id !== mapId)
          : [...prev.favoriteMaps, mapId]
      } : null);
      return;
    }
    const path = `users/${uid}`;
    const isFav = profile.favoriteMaps.includes(mapId);
    try {
      await updateDoc(doc(db, 'users', uid), {
        favoriteMaps: isFav ? arrayRemove(mapId) : arrayUnion(mapId)
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  };

  const toggleFavoriteMechanic = async (mechanicId: string) => {
    if (!uid || !profile) return;
    if (uid === 'demo-user') {
      setProfile(prev => prev ? {
        ...prev,
        favoriteMechanics: prev.favoriteMechanics.includes(mechanicId)
          ? prev.favoriteMechanics.filter(id => id !== mechanicId)
          : [...prev.favoriteMechanics, mechanicId]
      } : null);
      return;
    }
    const path = `users/${uid}`;
    const isFav = profile.favoriteMechanics.includes(mechanicId);
    try {
      await updateDoc(doc(db, 'users', uid), {
        favoriteMechanics: isFav ? arrayRemove(mechanicId) : arrayUnion(mechanicId)
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!uid || !profile) return;
    if (uid === 'demo-user') {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return;
    }
    const path = `users/${uid}`;
    try {
      await updateDoc(doc(db, 'users', uid), updates);
      toast.success('Perfil actualizado');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  };

  return { 
    profile, 
    loading, 
    toggleLearned, 
    toggleFavoriteMap, 
    toggleFavoriteMechanic,
    updateProfile
  };
}
