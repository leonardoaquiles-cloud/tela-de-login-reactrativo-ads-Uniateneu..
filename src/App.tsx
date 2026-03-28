import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search as SearchIcon, 
  Bell, 
  User, 
  Home as HomeIcon, 
  Sparkles, 
  ChevronRight, 
  Heart, 
  Bookmark, 
  ArrowLeft, 
  MoreVertical, 
  Edit3, 
  Shield, 
  CreditCard, 
  Settings, 
  LogOut,
  History,
  X,
  Layers,
  Zap,
  Leaf,
  Compass,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { BottomNav } from '@/src/components/BottomNav';

// --- Types ---
type Screen = 'welcome' | 'login' | 'home' | 'search' | 'notifications' | 'profile';

interface Story {
  id: number;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: string;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: string;
  color: string;
}

interface UserProfile {
  name: string;
  email: string;
  membership: string;
  joined: string;
  location: string;
  avatar: string;
}

// --- Icons Mapping ---
const iconMap: Record<string, any> = {
  Shield,
  Compass,
  Settings,
  AlertTriangle
};

// --- Components ---

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="min-h-screen w-full max-w-md mx-auto bg-surface relative overflow-x-hidden"
  >
    {children}
  </motion.div>
);

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#FDFCFB] text-[#1A1A1A]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-t-2 border-[#1A1A1A] rounded-full mb-4"
    />
    <p className="font-serif italic text-lg tracking-wide">Curating your experience...</p>
  </div>
);

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="relative h-screen overflow-hidden bg-[#0A0A0A] text-white flex flex-col justify-end p-8">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/editorial/1080/1920" 
        alt="Welcome" 
        className="w-full h-full object-cover opacity-60 grayscale"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 space-y-6"
    >
      <h1 className="text-7xl font-serif leading-[0.9] tracking-tighter italic">
        Ethereal<br />Journal
      </h1>
      <p className="text-lg font-light text-gray-300 max-w-xs leading-relaxed">
        A sanctuary for thoughtful narratives and visual excellence.
      </p>
      <button 
        onClick={onNext}
        className="w-full py-5 bg-white text-black font-medium tracking-widest uppercase text-xs hover:bg-gray-200 transition-colors"
      >
        Enter the Sanctuary
      </button>
    </motion.div>
  </div>
);

const LoginScreen = ({ onLogin, onBack }: { onLogin: () => void, onBack: () => void }) => (
  <ScreenWrapper>
    <div className="p-8 flex flex-col min-h-screen">
      <header className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 editorial-gradient rounded-xl flex items-center justify-center text-white">
          <Compass size={24} />
        </div>
        <span className="font-extrabold text-2xl tracking-tighter text-on-surface">Architectural Calm</span>
      </header>

      <div className="mb-12">
        <h1 className="font-extrabold text-4xl text-on-surface tracking-tight leading-tight">
          Welcome back
        </h1>
        <p className="text-on-surface-variant mt-2 text-md">
          Enter your details to access your dashboard.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-ambient ghost-border">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="font-bold text-sm text-on-surface ml-1">Email address</label>
            <Input 
              placeholder="name@company.com" 
              type="email" 
              icon={<User size={18} />} 
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="font-bold text-sm text-on-surface">Password</label>
              <Button variant="tertiary" size="sm" className="h-auto p-0 font-semibold text-xs">Forgot Password?</Button>
            </div>
            <Input 
              placeholder="••••••••" 
              type="password" 
              icon={<Lock size={18} />} 
            />
            <div className="flex items-center gap-2 mt-2 ml-1">
              <CheckCircle2 size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Secure connection active</span>
            </div>
          </div>
          <Button className="w-full py-4 mt-4" type="submit">Login</Button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-surface-container-lowest px-4 text-on-surface-variant">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="gap-2 font-semibold">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Google
          </Button>
          <Button variant="secondary" className="gap-2 font-semibold">
            <Zap size={18} />
            Apple
          </Button>
        </div>
      </div>

      <footer className="mt-auto pt-10 text-center">
        <p className="text-on-surface-variant text-sm">
          Don't have an account? 
          <Button variant="tertiary" className="ml-1 p-0 h-auto font-bold" onClick={onBack}>Sign Up</Button>
        </p>
      </footer>
    </div>
  </ScreenWrapper>
);

const HomeScreen = ({ stories }: { stories: Story[] }) => (
  <div className="pb-32 pt-12 px-8 bg-[#FDFCFB]">
    <header className="flex justify-between items-end mb-16">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Saturday, March 28</p>
        <h2 className="text-5xl font-serif italic tracking-tight">The Daily Edit</h2>
      </div>
      <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
        <User size={20} className="text-gray-400" />
      </div>
    </header>

    <div className="space-y-24">
      {stories.map((story) => (
        <motion.div 
          key={story.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[3/4] overflow-hidden mb-8 shadow-2xl shadow-black/5">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-xl px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold">
              {story.category}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-serif leading-[1.1] tracking-tight group-hover:italic transition-all duration-500">
              {story.title}
            </h3>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {story.excerpt}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400">By {story.author}</span>
              <div className="h-[1px] flex-1 bg-gray-100" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400">{story.readTime}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`/api/search?q=${query}`)
        .then(res => {
          if (!res.ok) throw new Error(`Search failed: ${res.status}`);
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format');
          }
          return res.json();
        })
        .then(data => setResults(data))
        .catch(err => console.error("Search error:", err));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="p-10 bg-[#FDFCFB] min-h-screen pb-32">
      <div className="mb-16">
        <h2 className="text-6xl font-serif italic mb-12 tracking-tighter">Search</h2>
        <div className="relative">
          <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
          <input 
            type="text" 
            placeholder="Topics, authors, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b border-gray-100 py-6 pl-10 focus:outline-none focus:border-black transition-colors text-2xl font-light placeholder:text-gray-200"
          />
        </div>
      </div>

      <div className="space-y-12">
        {results.map(item => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-b border-gray-50 pb-8 group cursor-pointer"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">{item.category}</p>
            <h4 className="text-2xl font-serif group-hover:italic transition-all">{item.title}</h4>
          </motion.div>
        ))}
        {query.length > 2 && results.length === 0 && (
          <p className="text-gray-300 italic text-xl">No narratives found for "{query}"</p>
        )}
        {query.length <= 2 && (
          <div className="space-y-6">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-300">Trending Narratives</h3>
            {['Minimalism', 'Digital Ethics', 'Urbanism', 'Future Tech'].map(tag => (
              <div key={tag} className="text-2xl font-serif italic text-gray-400 hover:text-black transition-colors cursor-pointer">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationsScreen = ({ notifications }: { notifications: Notification[] }) => (
  <div className="pb-32">
    <header className="bg-surface w-full sticky top-0 shadow-sm z-50">
      <div className="flex items-center px-4 h-16 justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="font-bold text-lg text-primary">Notifications</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical size={24} />
        </Button>
      </div>
    </header>

    <main className="px-4 pt-6 space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <Button size="sm" className="rounded-full px-5">All</Button>
        <Button variant="secondary" size="sm" className="rounded-full px-5">Alerts</Button>
        <Button variant="secondary" size="sm" className="rounded-full px-5">Updates</Button>
        <Button variant="secondary" size="sm" className="rounded-full px-5">Archived</Button>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-sm tracking-wider uppercase text-outline px-1">Recent</h2>
        {notifications.map((notif) => {
          const Icon = iconMap[notif.icon] || Bell;
          return (
            <div 
              key={notif.id} 
              className={cn(
                "bg-surface-container-lowest shadow-sm rounded-xl p-4 flex gap-4 border-l-4 relative overflow-hidden",
                notif.unread ? "border-primary" : "border-transparent opacity-80"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                notif.color === 'primary' ? "bg-primary/10 text-primary" : "bg-surface-container-high text-outline"
              )}>
                <Icon size={20} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[15px] text-on-surface leading-tight">{notif.title}</h3>
                  <span className="text-[11px] text-outline font-medium">{notif.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{notif.message}</p>
              </div>
              {notif.unread && <div className="absolute top-4 right-1.5 w-2 h-2 rounded-full bg-primary"></div>}
            </div>
          );
        })}
      </div>
    </main>
  </div>
);

const ProfileScreen = ({ profile }: { profile: UserProfile | null }) => (
  <div className="pb-32">
    <header className="w-full sticky top-0 z-40 bg-surface-container-low h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-lg font-semibold tracking-tight text-on-surface">Profile</h1>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical size={24} />
      </Button>
    </header>

    <main className="px-6 py-8 space-y-10">
      {profile && (
        <>
          <section className="flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-ambient">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <Button size="icon" className="absolute bottom-1 right-1 h-8 w-8 rounded-full shadow-lg">
                <Edit3 size={14} />
              </Button>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">{profile.name}</h2>
              <p className="text-sm font-medium text-on-surface-variant">{profile.email}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold px-1 text-on-surface">Account Information</h3>
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Membership</p>
                  <p className="font-bold text-primary">{profile.membership}</p>
                </div>
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/15">
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Joined</p>
                  <p className="font-bold">{profile.joined}</p>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-outline">Location</p>
                  <p className="font-bold">{profile.location}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="space-y-2">
        <div className="bg-surface-container-low rounded-xl overflow-hidden">
          {[
            { label: 'Edit Profile', icon: User },
            { label: 'Security Settings', icon: Shield },
            { label: 'Payment Methods', icon: CreditCard },
            { label: 'App Preferences', icon: Settings },
          ].map((item, i) => (
            <button 
              key={i} 
              className={cn(
                "w-full flex items-center justify-between p-4 hover:bg-surface-container-highest transition-colors active:scale-[0.98] duration-200",
                i !== 0 && "border-t border-outline-variant/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center">
                  <item.icon size={20} className="text-primary" />
                </div>
                <span className="font-bold text-on-surface">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-outline" />
            </button>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <Button variant="secondary" className="w-full gap-2 border border-error/20 text-error hover:bg-error-container/30">
          <LogOut size={20} />
          Logout
        </Button>
      </section>
    </main>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [stories, setStories] = useState<Story[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesRes, notifsRes, profileRes] = await Promise.all([
          fetch('/api/stories'),
          fetch('/api/notifications'),
          fetch('/api/profile')
        ]);

        // Validate responses before parsing JSON
        const validateResponse = async (res: Response, name: string) => {
          if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status} ${res.statusText}`);
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            const text = await res.text();
            console.error(`Expected JSON for ${name}, but got:`, text.substring(0, 100));
            throw new Error(`Invalid response format for ${name}. Expected JSON.`);
          }
          return res.json();
        };

        const [storiesData, notifsData, profileData] = await Promise.all([
          validateResponse(storiesRes, 'stories'),
          validateResponse(notifsRes, 'notifications'),
          validateResponse(profileRes, 'profile')
        ]);

        setStories(storiesData);
        setNotifications(notifsData);
        setProfile(profileData);
      } catch (error) {
        console.error("Detailed error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderScreen = () => {
    if (loading) return <LoadingScreen />;

    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('home')} onBack={() => setCurrentScreen('welcome')} />;
      case 'home':
        return <HomeScreen stories={stories} />;
      case 'search':
        return <SearchScreen />;
      case 'notifications':
        return <NotificationsScreen notifications={notifications} />;
      case 'profile':
        return <ProfileScreen profile={profile} />;
      default:
        return <WelcomeScreen onNext={() => setCurrentScreen('login')} />;
    }
  };

  const showBottomNav = ['home', 'search', 'notifications', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      
      {showBottomNav && (
        <BottomNav 
          activeTab={currentScreen} 
          onTabChange={(tab) => setCurrentScreen(tab as Screen)} 
        />
      )}
    </div>
  );
}
