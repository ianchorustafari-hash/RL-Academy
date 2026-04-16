import { Mechanic, TrainingMap, HitboxGroup, RankTip, CommunityContribution, Review, PositioningGuide } from '../types';

export const MECHANICS: Mechanic[] = [
  // BAJO
  {
    id: 'powershot',
    name: 'Powershot',
    description: 'Golpear la pelota justo después de que pique para maximizar potencia.',
    difficulty: 'bajo',
    videoUrl: 'https://www.youtube.com/results?search_query=powershot+rocket+league',
    controls: { PC: 'Acelerar + timing de golpe', 'PS4/PS5': 'R2 + timing de golpe', Xbox: 'RT + timing de golpe', Switch: 'ZR + timing de golpe' }
  },
  {
    id: 'front-flip',
    name: 'Front Flip',
    description: 'Voltereta hacia adelante para ganar velocidad o golpear.',
    difficulty: 'bajo',
    videoUrl: 'https://www.youtube.com/results?search_query=front+flip+rocket+league',
    controls: { PC: 'Saltar + adelante + saltar', 'PS4/PS5': 'X + adelante + X', Xbox: 'A + adelante + A', Switch: 'B + adelante + B' }
  },
  {
    id: 'diagonal-flip',
    name: 'Diagonal Flip',
    description: 'Variante más eficiente del flip para velocidad.',
    difficulty: 'bajo',
    videoUrl: 'https://www.youtube.com/results?search_query=diagonal+flip+rocket+league',
    controls: { PC: 'Saltar + diagonal + saltar', 'PS4/PS5': 'X + diagonal + X', Xbox: 'A + diagonal + A', Switch: 'B + diagonal + B' }
  },
  {
    id: 'boost-management',
    name: 'Boost Management',
    description: 'Uso eficiente del boost.',
    difficulty: 'bajo',
    videoUrl: 'https://www.youtube.com/results?search_query=boost+management+rocket+league',
    controls: { PC: 'Boost', 'PS4/PS5': 'Círculo/R1', Xbox: 'B/RB', Switch: 'A/R' }
  },
  {
    id: 'basic-aerial',
    name: 'Basic Aerial',
    description: 'Ir a la pelota en el aire.',
    difficulty: 'bajo',
    videoUrl: 'https://www.youtube.com/results?search_query=basic+aerial+rocket+league',
    controls: { PC: 'Saltar + boost + dirección', 'PS4/PS5': 'X + Boost + L3', Xbox: 'A + Boost + L', Switch: 'B + Boost + L' }
  },
  // MEDIO
  {
    id: 'fast-aerial',
    name: 'Fast Aerial',
    description: 'Llegar más rápido al aire.',
    difficulty: 'medio',
    videoUrl: 'https://www.youtube.com/results?search_query=fast+aerial+rocket+league',
    controls: { PC: 'Saltar + saltar + boost', 'PS4/PS5': 'X + X + Boost', Xbox: 'A + A + Boost', Switch: 'B + B + Boost' }
  },
  {
    id: 'half-flip',
    name: 'Half Flip',
    description: 'Girar 180° rápidamente.',
    difficulty: 'medio',
    videoUrl: 'https://www.youtube.com/watch?v=0tPjk6j6781',
    controls: { PC: 'Backflip + cancelar + air roll', 'PS4/PS5': 'Backflip + cancelar + L1', Xbox: 'Backflip + cancelar + LB', Switch: 'Backflip + cancelar + L' }
  },
  {
    id: 'wave-dash',
    name: 'Wave Dash',
    description: 'Ganar velocidad sin gastar boost.',
    difficulty: 'medio',
    videoUrl: 'https://www.youtube.com/watch?v=pS687p9A6oU',
    controls: { PC: 'Saltar + caer + dirección', 'PS4/PS5': 'X + caer + L3', Xbox: 'A + caer + L', Switch: 'B + caer + L' }
  },
  {
    id: 'air-roll-shot',
    name: 'Air Roll Shot',
    description: 'Golpear usando air roll.',
    difficulty: 'medio',
    videoUrl: 'https://www.youtube.com/results?search_query=air+roll+shot+rocket+league',
    controls: { PC: 'Aerial + air roll + golpe', 'PS4/PS5': 'Aerial + L1 + golpe', Xbox: 'Aerial + LB + golpe', Switch: 'Aerial + L + golpe' }
  },
  {
    id: 'dribbling-suelo',
    name: 'Dribbling (suelo)',
    description: 'Controlar la pelota sobre el auto.',
    difficulty: 'medio',
    videoUrl: 'https://www.youtube.com/results?search_query=dribbling+ground+rocket+league',
    controls: { PC: 'Acelerar + control fino', 'PS4/PS5': 'R2 + control fino', Xbox: 'RT + control fino', Switch: 'ZR + control fino' }
  },
  // ALTO
  {
    id: 'air-dribble',
    name: 'Air Dribble',
    description: 'Llevar la pelota por el aire.',
    difficulty: 'alto',
    videoUrl: 'https://www.youtube.com/results?search_query=air+dribble+rocket+league',
    controls: { PC: 'Saltar + boost + control aéreo', 'PS4/PS5': 'X + Boost + L3', Xbox: 'A + Boost + L', Switch: 'B + Boost + L' }
  },
  {
    id: 'flicks',
    name: 'Flicks',
    description: 'Levantar la pelota desde dribble.',
    difficulty: 'alto',
    videoUrl: 'https://www.youtube.com/results?search_query=flicks+rocket+league',
    variations: ['Front flick', '45° flick', '90° flick', '180° flick', 'Musty flick (avanzado)'],
    controls: { PC: 'Dribble + salto + dirección', 'PS4/PS5': 'Dribble + X + L3', Xbox: 'Dribble + A + L', Switch: 'Dribble + B + L' }
  },
  {
    id: 'ceiling-shot',
    name: 'Ceiling Shot',
    description: 'Caer del techo sin gastar salto.',
    difficulty: 'alto',
    videoUrl: 'https://www.youtube.com/results?search_query=ceiling+shot+rocket+league',
    controls: { PC: 'Subir pared → techo → caer + disparo', 'PS4/PS5': 'Pared → Techo → Caer + Círculo', Xbox: 'Pared → Techo → Caer + B', Switch: 'Pared → Techo → Caer + A' }
  },
  {
    id: 'backboard-read',
    name: 'Backboard Read',
    description: 'Leer rebotes en pared trasera.',
    difficulty: 'alto',
    videoUrl: 'https://www.youtube.com/results?search_query=backboard+read+rocket+league',
    controls: { PC: 'Aerial + lectura', 'PS4/PS5': 'Aerial + lectura', Xbox: 'Aerial + lectura', Switch: 'Aerial + lectura' }
  },
  {
    id: 'double-tap',
    name: 'Double Tap',
    description: 'Golpear → rebotar → volver a golpear.',
    difficulty: 'alto',
    videoUrl: 'https://www.youtube.com/results?search_query=double+tap+rocket+league',
    controls: { PC: 'Aerial + control rebote', 'PS4/PS5': 'Aerial + control rebote', Xbox: 'Aerial + control rebote', Switch: 'Aerial + control rebote' }
  },
  // PRO
  {
    id: 'flip-reset',
    name: 'Flip Reset',
    description: 'Recuperar salto tocando pelota en aire.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=flip+reset+rocket+league',
    controls: { PC: 'Aerial + contacto con ruedas + salto', 'PS4/PS5': 'Aerial + ruedas + X', Xbox: 'Aerial + ruedas + A', Switch: 'Aerial + ruedas + B' }
  },
  {
    id: 'musty-flick',
    name: 'Musty Flick',
    description: 'Flick potente hacia atrás.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=musty+flick+rocket+league',
    controls: { PC: 'Saltar + inclinar atrás + flip', 'PS4/PS5': 'X + L3 atrás + X', Xbox: 'A + L atrás + A', Switch: 'B + L atrás + B' }
  },
  {
    id: 'breezi-flick',
    name: 'Breezi Flick',
    description: 'Flick con rotación estilizada.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=breezi+flick+rocket+league',
    controls: { PC: 'Air roll + flick', 'PS4/PS5': 'L1 + flick', Xbox: 'LB + flick', Switch: 'L + flick' }
  },
  {
    id: 'air-dribble-reset',
    name: 'Air Dribble Reset',
    description: 'Air dribble + flip reset combinado.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=air+dribble+reset+rocket+league',
    controls: { PC: 'Aerial + control + reset', 'PS4/PS5': 'Aerial + control + reset', Xbox: 'Aerial + control + reset', Switch: 'Aerial + control + reset' }
  },
  {
    id: 'psycho',
    name: 'Psycho',
    description: 'Gol desde pared trasera rival.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=psycho+rocket+league',
    controls: { PC: 'Aerial + lectura extrema', 'PS4/PS5': 'Aerial + lectura extrema', Xbox: 'Aerial + lectura extrema', Switch: 'Aerial + lectura extrema' }
  },
  {
    id: 'redirect',
    name: 'Redirect',
    description: 'Cambiar dirección del balón en el aire.',
    difficulty: 'pro',
    videoUrl: 'https://www.youtube.com/results?search_query=redirect+rocket+league',
    controls: { PC: 'Aerial + timing', 'PS4/PS5': 'Aerial + timing', Xbox: 'Aerial + timing', Switch: 'Aerial + timing' }
  },
  // META
  {
    id: 'chain-resets',
    name: 'Chain Resets',
    description: 'Encadenar múltiples flip resets sin tocar el suelo.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=chain+resets+rocket+league',
    controls: { PC: 'Aerial + Reset + Flip + Reset', 'PS4/PS5': 'Aerial + Reset + Flip + Reset', Xbox: 'Aerial + Reset + Flip + Reset', Switch: 'Aerial + Reset + Flip + Reset' }
  },
  {
    id: 'double-reset',
    name: 'Double Reset',
    description: 'Conseguir dos flip resets en un mismo vuelo.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=double+reset+rocket+league',
    controls: { PC: 'Aerial + Reset + Stall/Flip + Reset', 'PS4/PS5': 'Aerial + Reset + Stall/Flip + Reset', Xbox: 'Aerial + Reset + Stall/Flip + Reset', Switch: 'Aerial + Reset + Stall/Flip + Reset' }
  },
  {
    id: 'zap-dash',
    name: 'Zap Dash',
    description: 'Wave dash instantáneo al aterrizar para ganar velocidad punta.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=zap+dash+rocket+league',
    controls: { PC: 'Salto pequeño + Wave dash al tocar suelo', 'PS4/PS5': 'X pequeño + L3 al tocar suelo', Xbox: 'A pequeño + L al tocar suelo', Switch: 'B pequeño + L al tocar suelo' }
  },
  {
    id: 'hel-jump',
    name: 'Hel Jump',
    description: 'Técnica avanzada para saltar desde la pelota o superficies de forma inusual.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=hel+jump+rocket+league',
    controls: { PC: 'Control preciso de las 4 ruedas', 'PS4/PS5': 'Control preciso de las 4 ruedas', Xbox: 'Control preciso de las 4 ruedas', Switch: 'Control preciso de las 4 ruedas' }
  },
  {
    id: 'wall-dash',
    name: 'Wall Dash',
    description: 'Wave dashes repetidos en la pared para ganar velocidad sin boost.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=wall+dash+rocket+league',
    controls: { PC: 'Spam salto + dirección hacia la pared', 'PS4/PS5': 'Spam X + L3 hacia la pared', Xbox: 'Spam A + L hacia la pared', Switch: 'Spam B + L hacia la pared' }
  },
  {
    id: 'speed-flip',
    name: 'Speed Flip',
    description: 'El flip más rápido del juego, esencial para kickoffs competitivos.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=speed+flip+rocket+league',
    controls: { PC: 'Diagonal flip + Cancelar instantáneo', 'PS4/PS5': 'Diagonal flip + Cancelar instantáneo', Xbox: 'Diagonal flip + Cancelar instantáneo', Switch: 'Diagonal flip + Cancelar instantáneo' }
  },
  {
    id: 'preflip-shots',
    name: 'Preflip Shots',
    description: 'Usar la parte final de un flip para golpear la pelota con precisión.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=preflip+shots+rocket+league',
    controls: { PC: 'Timing de flip anticipado', 'PS4/PS5': 'Timing de flip anticipado', Xbox: 'Timing de flip anticipado', Switch: 'Timing de flip anticipado' }
  },
  {
    id: 'fake-challenges',
    name: 'Fake Challenges',
    description: 'Simular un desafío para forzar al rival a regalar la posesión.',
    difficulty: 'meta',
    videoUrl: 'https://www.youtube.com/results?search_query=fake+challenges+rocket+league',
    controls: { PC: 'Amagar entrada + Rotar sombra', 'PS4/PS5': 'Amagar entrada + Rotar sombra', Xbox: 'Amagar entrada + Rotar sombra', Switch: 'Amagar entrada + Rotar sombra' }
  }
];

export const HITBOX_GROUPS: HitboxGroup[] = [
  {
    id: 'octane',
    name: 'Octane',
    description: 'Balance general excelente. Buen control y altura. La más usada.',
    cars: ['Octane', 'Fennec', 'Takumi']
  },
  {
    id: 'dominus',
    name: 'Dominus',
    description: 'Más larga. Mejor para flicks y tiros.',
    cars: ['Dominus', 'Aftershock']
  },
  {
    id: 'plank',
    name: 'Plank',
    description: 'Muy plana y larga. Ideal para control aéreo.',
    cars: ['Batmobile (2016)', 'Mantis']
  },
  {
    id: 'breakout',
    name: 'Breakout',
    description: 'Larga pero más baja. Precisión en tiros.',
    cars: ['Breakout', 'Samurai']
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    description: 'Mezcla de Octane y Dominus.',
    cars: ['Skyline', 'Endo']
  },
  {
    id: 'merc',
    name: 'Merc',
    description: 'Muy alta. Mejor para 50/50.',
    cars: ['Merc']
  }
];

export const POSITIONING_GUIDES: PositioningGuide[] = [
  {
    id: '1v1',
    mode: '1v1',
    description: 'Es un modo de paciencia y errores.',
    keys: ['Nunca overcommit', 'Controlar boost', 'Jugar seguro'],
    situations: [
      { condition: 'Si perdés la pelota', action: 'Rotar rápido atrás' },
      { condition: 'Si rival falla', action: 'Contraataque inmediato' },
      { condition: 'Si no tenés boost', action: 'Jugar lento' }
    ]
  },
  {
    id: '2v2',
    mode: '2v2',
    description: 'Uno presiona, uno cubre atrás.',
    keys: ['No doble commit', 'Mantener presión constante', 'Rotar en círculo'],
    situations: [
      { condition: 'Compañero ataca', action: 'Vos cubrís medio' },
      { condition: 'Rival despeja', action: 'Rotar rápido' },
      { condition: 'Perdida', action: 'Volver por pads pequeños' }
    ]
  },
  {
    id: '3v3',
    mode: '3v3',
    description: 'Rotación estándar: 1º presiona, 2º sigue jugada, 3º defensa.',
    keys: ['Rotaciones amplias', 'No cortar rotación', 'Mantener estructura'],
    situations: [
      { condition: 'Ataque', action: 'Uno presiona, otro listo, otro cubre' },
      { condition: 'Defensa', action: 'Uno va, otro cubre arco, otro espera clear' },
      { condition: 'Transición', action: 'Rotación rápida lateral' }
    ]
  }
];

export const TRAINING_MAPS: TrainingMap[] = [
  {
    id: 'aerial-shots',
    name: 'Aerial Shots - Pass',
    code: 'C7E0-9E0B-B73E-A4E8',
    difficulty: 'medio',
    priority: 'alta',
    category: 'aéreo'
  },
  {
    id: 'ground-shots',
    name: 'Ground Shots',
    code: '6EB1-79B2-333A-8D62',
    difficulty: 'bajo',
    priority: 'alta',
    category: 'tiros'
  }
];

export const RANK_TIPS: RankTip[] = [
  {
    id: 'bronze',
    rank: 'Bronce',
    tips: ['Enfocate en pegarle a la pelota con consistencia', 'Usá cámara de balón (Ball Cam)', 'Volvé siempre a defender después de atacar'],
    commonErrors: ['Fallar la pelota constantemente', 'Ir todos juntos a la bola (ball chasing)', 'No volver a defender'],
    recommendations: ['Practicar tiros básicos', 'Aprender a moverte con el auto', 'Jugar simple, sin intentar cosas difíciles']
  },
  {
    id: 'silver',
    rank: 'Plata',
    tips: ['Empezar a apuntar los tiros', 'Aprender a usar el boost correctamente', 'Mantenerte entre la pelota y tu arco'],
    commonErrors: ['Gastar todo el boost sin sentido', 'Mala posición en defensa', 'Golpear la pelota sin dirección'],
    recommendations: ['Practicar powershots', 'Mejorar control del auto', 'Evitar sobrecomprometerse']
  },
  {
    id: 'gold',
    rank: 'Oro',
    tips: ['Aprender rotaciones básicas', 'Empezar a jugar en equipo', 'Mejorar precisión en tiros'],
    commonErrors: ['Doble commit (ir dos a la misma pelota)', 'Mala lectura de rebotes', 'Rotaciones incorrectas'],
    recommendations: ['Practicar aerials básicos', 'Jugar más defensivo', 'Pensar antes de ir a la pelota']
  },
  {
    id: 'platinum',
    rank: 'Platino',
    tips: ['Mejorar consistencia en mecánicas', 'Entender mejor el posicionamiento', 'Controlar mejor la pelota'],
    commonErrors: ['Intentar jugadas difíciles sin dominarlas', 'Rotar mal o cortar rotaciones', 'Falta de control bajo presión'],
    recommendations: ['Practicar dribbling', 'Mejorar defensa aérea', 'Jugar más inteligente, no más rápido']
  },
  {
    id: 'diamond',
    rank: 'Diamante',
    tips: ['Rotaciones más limpias y rápidas', 'Tomar decisiones más inteligentes', 'Mejorar juego sin pelota'],
    commonErrors: ['Overcommit frecuente', 'Mala gestión de boost', 'Falta de consistencia en aerials'],
    recommendations: ['Practicar fast aerials', 'Aprender backboard defense', 'Mejorar posicionamiento']
  },
  {
    id: 'champion',
    rank: 'Campeón',
    tips: ['Juego más estratégico que mecánico', 'Mantener presión constante', 'Leer jugadas antes de que pasen'],
    commonErrors: ['Decisiones apresuradas', 'Falta de adaptación al rival', 'Errores en rotaciones bajo presión'],
    recommendations: ['Mejorar velocidad de juego', 'Practicar decisiones rápidas', 'Analizar repeticiones']
  },
  {
    id: 'gc',
    rank: 'GC',
    tips: ['Maximizar eficiencia en cada jugada', 'Minimizar errores', 'Jugar con intención siempre'],
    commonErrors: ['Pequeños errores mecánicos', 'Mala lectura en jugadas rápidas', 'Fallos en coordinación de equipo'],
    recommendations: ['Perfeccionar mecánicas avanzadas', 'Mejorar lectura del juego', 'Optimizar posicionamiento']
  },
  {
    id: 'ssl',
    rank: 'SSL',
    tips: ['Juego casi perfecto', 'Lectura total del partido', 'Dominio mecánico y mental'],
    commonErrors: ['Micro errores de timing', 'Mala toma de decisiones en momentos clave', 'Descoordinación mínima'],
    recommendations: ['Optimizar cada detalle', 'Entrenar consistencia extrema', 'Jugar al más alto nivel competitivo']
  }
];

export const COMMUNITY_CONTRIBUTIONS: CommunityContribution[] = [
  {
    id: 'c1',
    userId: 'u1',
    userName: 'RL_Pro_Tips',
    type: 'tip',
    title: 'Rotación en 2v2',
    content: 'Nunca entres a la esquina si tu compañero ya está ahí. Espera el centro en el medio campo.',
    votes: 156,
    createdAt: '2024-03-20T10:00:00Z'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u2',
    userName: 'RocketFan',
    targetId: 'half-flip',
    rating: 5,
    comment: '¡Excelente explicación! Por fin me sale el half-flip.',
    createdAt: '2024-03-21T15:30:00Z'
  }
];
