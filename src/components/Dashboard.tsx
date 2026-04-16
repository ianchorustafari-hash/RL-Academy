import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import Layout from './Layout';
import { MECHANICS, TRAINING_MAPS, HITBOX_GROUPS, RANK_TIPS, COMMUNITY_CONTRIBUTIONS, REVIEWS, POSITIONING_GUIDES } from '../data/mockData';
import { Mechanic, TrainingMap, HitboxGroup, RankTip, PositioningGuide } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  CheckCircle2, 
  Heart, 
  ExternalLink, 
  Copy, 
  Check,
  Shield,
  Rocket,
  Target,
  Wind,
  Compass,
  Trophy,
  Car,
  Lightbulb,
  Plus,
  MessageSquare,
  ThumbsUp,
  Settings,
  Monitor,
  LayoutGrid
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { profile, toggleLearned, toggleFavoriteMap, toggleFavoriteMechanic, updateProfile } = useProgress(user?.uid);
  const [activeSection, setActiveSection] = useState('home');
  const [accentColor, setAccentColor] = useState('blue');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editData, setEditData] = useState({
    rank: '',
    mainCar: '',
    favoriteMode: '',
    platform: 'PC' as any
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        rank: profile.rank || '',
        mainCar: profile.mainCar || '',
        favoriteMode: profile.favoriteMode || '',
        platform: profile.platform || 'PC'
      });
    }
  }, [profile]);

  const colorMap: Record<string, string> = {
    blue: 'blue-500',
    red: 'red-500',
    green: 'green-500',
    orange: 'orange-500',
    purple: 'purple-500',
    pink: 'pink-500'
  };

  const bgActiveMap: Record<string, string> = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600',
    pink: 'bg-pink-600'
  };

  const borderActiveMap: Record<string, string> = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500'
  };

  const textActiveMap: Record<string, string> = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500'
  };

  const currentColor = colorMap[accentColor];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMechanics = useMemo(() => 
    MECHANICS.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredMaps = useMemo(() => 
    TRAINING_MAPS.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredHitboxes = useMemo(() => 
    HITBOX_GROUPS.filter(h => 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredTips = useMemo(() => 
    RANK_TIPS.filter(t => 
      t.rank.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredPositioning = useMemo(() => 
    POSITIONING_GUIDES.filter(p => 
      p.mode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-2xl", bgActiveMap[accentColor])}>
        <Rocket className="w-12 h-12 text-white fill-current" />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">
          {t.home.welcome}, <span className={textActiveMap[accentColor]}>{user?.displayName || t.home.pilot}</span>
        </h2>
        <p className="text-2xl md:text-3xl font-bold text-zinc-400">
          {t.home.question}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 flex flex-col items-center gap-4 group hover:border-zinc-700 transition-all relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditingProfile(true)}
          >
            <Settings className="w-4 h-4 text-zinc-500" />
          </Button>
          <div className={cn("p-3 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors", textActiveMap[accentColor])}>
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.home.rank}</p>
            <p className="text-2xl font-black italic uppercase text-white">{profile?.rank || t.home.notDefined}</p>
          </div>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 p-6 flex flex-col items-center gap-4 group hover:border-zinc-700 transition-all relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditingProfile(true)}
          >
            <Settings className="w-4 h-4 text-zinc-500" />
          </Button>
          <div className={cn("p-3 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors", textActiveMap[accentColor])}>
            <Car className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.home.mainCar}</p>
            <p className="text-2xl font-black italic uppercase text-white">{profile?.mainCar || t.home.notDefined}</p>
          </div>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 p-6 flex flex-col items-center gap-4 group hover:border-zinc-700 transition-all relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditingProfile(true)}
          >
            <Settings className="w-4 h-4 text-zinc-500" />
          </Button>
          <div className={cn("p-3 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors", textActiveMap[accentColor])}>
            <LayoutGrid className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.home.favMode}</p>
            <p className="text-2xl font-black italic uppercase text-white">{profile?.favoriteMode || t.home.notDefined}</p>
          </div>
        </Card>
      </div>

      {isEditingProfile && (
        <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 p-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold uppercase italic">{t.profile.edit}</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(false)}>{t.profile.cancel}</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 uppercase">{t.profile.rank}</label>
              <Input 
                value={editData.rank} 
                onChange={e => setEditData({...editData, rank: e.target.value})}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder={t.profile.placeholderRank}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 uppercase">{t.profile.car}</label>
              <Input 
                value={editData.mainCar} 
                onChange={e => setEditData({...editData, mainCar: e.target.value})}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder={t.profile.placeholderCar}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 uppercase">{t.profile.mode}</label>
              <Input 
                value={editData.favoriteMode} 
                onChange={e => setEditData({...editData, favoriteMode: e.target.value})}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder={t.profile.placeholderMode}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-500 uppercase">{t.profile.platform}</label>
              <select 
                value={editData.platform} 
                onChange={e => setEditData({...editData, platform: e.target.value as any})}
                className="w-full h-10 rounded-md bg-zinc-950 border border-zinc-800 px-3 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer"
                style={{ colorScheme: 'dark' }}
              >
                <option value="PC" className="bg-zinc-900 text-white">PC (Teclado/Ratón)</option>
                <option value="PS4/PS5" className="bg-zinc-900 text-white">PlayStation</option>
                <option value="Xbox" className="bg-zinc-900 text-white">Xbox</option>
                <option value="Switch" className="bg-zinc-900 text-white">Nintendo Switch</option>
              </select>
            </div>
          </div>
          <Button 
            className={cn("w-full mt-8 font-black uppercase italic", bgActiveMap[accentColor])}
            onClick={() => {
              updateProfile(editData);
              setIsEditingProfile(false);
            }}
          >
            {t.profile.save}
          </Button>
        </Card>
      )}
      
      <div className="pt-8">
        <p className="text-zinc-500 text-sm font-medium">{t.home.footer}</p>
      </div>
    </div>
  );

  const renderMechanics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMechanics.map((mechanic) => (
        <Card key={mechanic.id} className={cn("bg-zinc-900 border-zinc-800 transition-all", `hover:${borderActiveMap[accentColor]}/50`)}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-white">{mechanic.name}</CardTitle>
              <Badge variant="outline" className={cn(
                "capitalize",
                mechanic.difficulty === 'bajo' && "border-green-500 text-green-500",
                mechanic.difficulty === 'medio' && "border-yellow-500 text-yellow-500",
                mechanic.difficulty === 'alto' && "border-orange-500 text-orange-500",
                mechanic.difficulty === 'pro' && "border-red-500 text-red-500",
                mechanic.difficulty === 'meta' && "border-purple-500 text-purple-500"
              )}>
                {mechanic.difficulty}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full",
                profile?.favoriteMechanics?.includes(mechanic.id) ? "text-red-500" : "text-zinc-500"
              )}
              onClick={() => toggleFavoriteMechanic(mechanic.id)}
            >
              <Heart className={cn("w-5 h-5", profile?.favoriteMechanics?.includes(mechanic.id) && "fill-current")} />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-300 text-sm">{mechanic.description}</p>
            
            {mechanic.variations && (
              <div className="flex flex-wrap gap-1.5">
                {mechanic.variations.map(v => (
                  <Badge key={v} variant="secondary" className="text-[9px] bg-zinc-800 text-zinc-400 border-zinc-700">
                    {v}
                  </Badge>
                ))}
              </div>
            )}

            {mechanic.controls && (
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{t.mechanics.controls} ({profile?.platform || 'PC'})</span>
                  <LayoutGrid className="w-3 h-3 text-zinc-500" />
                </div>
                <p className="text-xs font-mono text-zinc-100">
                  {mechanic.controls[profile?.platform || 'PC'] || 'No disponible'}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className={cn("gap-2 hover:bg-zinc-800", `hover:${textActiveMap[accentColor]}`)}
                onClick={() => window.open(mechanic.videoUrl, '_blank')}
              >
                <Play className="w-4 h-4" /> Ver Video
              </Button>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{t.mechanics.reviews}</h4>
              <div className="space-y-2">
                {REVIEWS.filter(r => r.targetId === mechanic.id).map(review => (
                  <div key={review.id} className="text-[11px] bg-zinc-800/50 p-2 rounded">
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span className="font-bold">{review.userName}</span>
                      <span>{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-zinc-300 italic">"{review.comment}"</p>
                  </div>
                ))}
                <Button variant="ghost" size="xs" className="w-full text-zinc-500 hover:text-zinc-300">
                  <MessageSquare className="w-3 h-3 mr-1" /> {t.mechanics.writeReview}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-zinc-800 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox 
                id={`learned-${mechanic.id}`} 
                checked={profile?.learnedMechanics?.includes(mechanic.id)}
                onCheckedChange={() => toggleLearned(mechanic.id)}
              />
              <label htmlFor={`learned-${mechanic.id}`} className="text-sm text-white font-bold cursor-pointer">
                {t.mechanics.learned}
              </label>
            </div>
            {profile?.learnedMechanics?.includes(mechanic.id) && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderMaps = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMaps.map((map) => (
        <Card key={map.id} className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">{map.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary" className="capitalize bg-zinc-800 text-white border-zinc-700">{map.category}</Badge>
                <Badge variant="outline" className="capitalize border-zinc-700 text-zinc-300">{map.difficulty}</Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full",
                profile?.favoriteMaps?.includes(map.id) ? "text-red-500" : "text-zinc-500"
              )}
              onClick={() => toggleFavoriteMap(map.id)}
            >
              <Heart className={cn("w-5 h-5", profile?.favoriteMaps?.includes(map.id) && "fill-current")} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between border border-zinc-800">
              <code className={cn("font-mono font-bold", textActiveMap[accentColor])}>{map.code}</code>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleCopyCode(map.code, map.id)}
              >
                {copiedId === map.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-zinc-100 font-bold">
              {t.maps.priority}: <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                map.priority === 'alta' ? "bg-red-500/20 text-red-500 border border-red-500/50" : 
                map.priority === 'media' ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50" : 
                "bg-green-500/20 text-green-500 border border-green-500/50"
              )}>{map.priority}</span>
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderHitboxes = () => (
    <div className="space-y-6">
      {filteredHitboxes.map((group) => (
        <Card key={group.id} className={cn("bg-zinc-900 border-zinc-800 overflow-hidden transition-all", `hover:${borderActiveMap[accentColor]}/30`)}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-6 md:col-span-1 bg-zinc-800/50 border-r border-zinc-800">
              <h3 className={cn("text-2xl font-black italic uppercase mb-2", textActiveMap[accentColor])}>{group.name}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{group.description}</p>
            </div>
            <div className="p-6 md:col-span-2">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">{t.hitboxes.carsIncluded}</h4>
              <div className="flex flex-wrap gap-2">
                {group.cars.map(car => (
                  <Badge key={car} variant="outline" className="bg-zinc-950 border-zinc-800 py-1.5 px-3 text-sm text-zinc-100 hover:border-zinc-600 transition-colors">
                    {car}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTips = () => (
    <div className="space-y-8">
      {filteredTips.map((tip) => (
        <div key={tip.id} className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className={cn("text-3xl font-black italic uppercase", textActiveMap[accentColor])}>{tip.rank}</h3>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" /> {t.tips.keyTips}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.tips.map((t, i) => <li key={i} className="text-sm text-zinc-300">• {t}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-red-500">
                  <Shield className="w-4 h-4" /> {t.tips.commonErrors}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.commonErrors.map((e, i) => <li key={i} className="text-sm text-zinc-300">• {e}</li>)}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className={cn("text-sm flex items-center gap-2", textActiveMap[accentColor])}>
                  <Rocket className="w-4 h-4" /> {t.tips.recommendations}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.recommendations.map((r, i) => <li key={i} className="text-sm text-zinc-300">• {r}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPositioning = () => (
    <div className="space-y-8">
      {filteredPositioning.map((guide) => (
        <Card key={guide.id} className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-black italic uppercase">{guide.mode}</CardTitle>
              <Badge variant="outline" className={cn("border-current", textActiveMap[accentColor])}>Táctica</Badge>
            </div>
            <CardDescription className="text-zinc-400">{guide.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guide.keys.map((key, i) => (
                <div key={i} className="bg-zinc-950 p-3 rounded border border-zinc-800 flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", bgActiveMap[accentColor])} />
                  <span className="text-sm font-bold text-zinc-200">{key}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">{t.positioning.situations}</h4>
              <div className="grid grid-cols-1 gap-4">
                {guide.situations.map((s, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800">
                      <span className="text-[10px] font-black text-zinc-500 block mb-1 uppercase">{t.positioning.situation}</span>
                      <p className="text-sm text-zinc-100">{s.condition}</p>
                    </div>
                    <div className={cn("p-4 rounded-lg border", `bg-${accentColor}-900/10 border-${accentColor}-900/20`)}>
                      <span className={cn("text-[10px] font-black block mb-1 uppercase", textActiveMap[accentColor])}>{t.positioning.action}</span>
                      <p className="text-sm text-zinc-100 font-bold">{s.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {guide.footer && (
              <div className="pt-4 border-t border-zinc-800">
                <p className={cn("text-sm font-black italic uppercase text-center", textActiveMap[accentColor])}>
                  {guide.footer}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">{t.community.title}</h2>
        <Button className={cn("font-black uppercase italic", bgActiveMap[accentColor])}>
          <Plus className="w-4 h-4 mr-2" /> {t.community.newContribution}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMMUNITY_CONTRIBUTIONS.map(item => (
          <Card key={item.id} className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="uppercase text-[10px] bg-zinc-800 text-zinc-100 border-zinc-700">{item.type}</Badge>
              <div className="flex items-center gap-1 text-zinc-500 text-xs">
                <ThumbsUp className="w-3 h-3" /> {item.votes} {t.community.votes}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.content}</p>
            </div>
            {item.code && (
              <div className="bg-zinc-950 p-3 rounded border border-zinc-800 flex items-center justify-between">
                <code className={cn("font-mono font-bold", textActiveMap[accentColor])}>{item.code}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopyCode(item.code!, item.id)}>
                  {copiedId === item.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <span className="text-xs text-zinc-500">Por: <span className="text-zinc-300 font-bold">{item.userName}</span></span>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                <ThumbsUp className="w-4 h-4 mr-2" /> Votar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      accentColor={accentColor}
      setAccentColor={setAccentColor}
    >
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {activeSection !== 'home' && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight capitalize">
                {activeSection === 'mechanics' && t.nav.mechanics}
                {activeSection === 'maps' && t.nav.maps}
                {activeSection === 'hitboxes' && t.nav.hitboxes}
                {activeSection === 'tips' && t.nav.tips}
                {activeSection === 'positioning' && t.nav.positioning}
                {activeSection === 'community' && t.nav.community}
              </h2>
              <p className="text-zinc-400">
                {activeSection === 'mechanics' && (language === 'es' ? 'Domina el control de tu coche con estas técnicas.' : 'Master car control with these techniques.')}
                {activeSection === 'maps' && (language === 'es' ? 'Los mejores códigos de entrenamiento para practicar.' : 'The best training codes to practice.')}
                {activeSection === 'hitboxes' && (language === 'es' ? 'Entiende cómo interactúa cada coche con el balón.' : 'Understand how each car interacts with the ball.')}
                {activeSection === 'tips' && (language === 'es' ? 'Guía paso a paso para subir de rango.' : 'Step-by-step guide to rank up.')}
                {activeSection === 'positioning' && (language === 'es' ? 'Mejora tu lectura de juego y rotaciones.' : 'Improve your game sense and rotations.')}
                {activeSection === 'community' && (language === 'es' ? 'Comparte y descubre consejos de otros jugadores.' : 'Share and discover tips from other players.')}
              </p>
            </div>
            
            {activeSection === 'mechanics' && (
              <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                <div className="px-3 py-1 text-xs font-medium text-zinc-400 border-r border-zinc-800">
                  Progreso: {profile?.learnedMechanics?.length || 0} / {MECHANICS.length}
                </div>
                <div className="px-3 py-1 text-xs font-medium text-zinc-400">
                  Favoritos: {profile?.favoriteMechanics?.length || 0}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="min-h-[60vh]">
          {activeSection === 'home' && renderHome()}
          {activeSection === 'mechanics' && renderMechanics()}
          {activeSection === 'maps' && renderMaps()}
          {activeSection === 'hitboxes' && renderHitboxes()}
          {activeSection === 'tips' && renderTips()}
          {activeSection === 'positioning' && renderPositioning()}
          {activeSection === 'community' && renderCommunity()}
        </div>
      </div>
    </Layout>
  );
}
