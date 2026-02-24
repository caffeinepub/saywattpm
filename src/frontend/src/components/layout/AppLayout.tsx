import { Outlet, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Mic, Home, LogOut } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../../hooks/useQueries';

export default function AppLayout() {
  const navigate = useNavigate();
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <img 
              src="/assets/generated/saywattpm-logo.dim_256x256.png" 
              alt="SayWattPM" 
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">SayWattPM</h1>
              <p className="text-xs text-muted-foreground">Voice-First PM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {userProfile && (
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-foreground">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.role}</p>
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={handleHome}
              className="h-12 w-12"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-12"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Floating Voice Input Button */}
      <button
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_35)] to-[oklch(0.55_0.18_25)] shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Voice Input"
      >
        <Mic className="h-8 w-8 text-white" />
      </button>
    </div>
  );
}
