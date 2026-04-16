export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  learnedMechanics: string[];
  favoriteMaps: string[];
  favoriteMechanics: string[];
  rank?: string;
  mainCar?: string;
  favoriteMode?: string;
  platform?: 'PC' | 'PS4/PS5' | 'Xbox' | 'Switch';
  createdAt: string;
}

export type Difficulty = 'bajo' | 'medio' | 'alto' | 'pro' | 'meta';
export type Priority = 'baja' | 'media' | 'alta';

export interface Mechanic {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  videoUrl: string;
  controls?: {
    [key: string]: string;
  };
  variations?: string[];
}

export interface TrainingMap {
  id: string;
  name: string;
  code: string;
  difficulty: Difficulty;
  priority: Priority;
  category: 'objetivos' | 'aéreo' | 'control' | 'mecánicas' | 'defensa' | 'tiros';
}

export interface HitboxGroup {
  id: string;
  name: string;
  description: string;
  cars: string[];
}

export interface RankTip {
  id: string;
  rank: 'Bronce' | 'Plata' | 'Oro' | 'Platino' | 'Diamante' | 'Campeón' | 'GC' | 'SSL';
  tips: string[];
  commonErrors: string[];
  recommendations: string[];
}

export interface PositioningGuide {
  id: string;
  mode: '1v1' | '2v2' | '3v3';
  description: string;
  keys: string[];
  situations: {
    condition: string;
    action: string;
  }[];
  footer?: string;
}

export interface CommunityContribution {
  id: string;
  userId: string;
  userName: string;
  type: 'map' | 'mechanic' | 'tip';
  title: string;
  content: string;
  code?: string; // For maps
  votes: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  targetId: string; // Mechanic or Map ID
  rating: number;
  comment: string;
  createdAt: string;
}
