import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      toast.success('Logged out successfully');
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        } else {
          toast.error('Login failed. Please try again.');
        }
      }
    }
  };

  if (isAuthenticated) {
    return (
      <Button
        onClick={handleAuth}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="h-12 px-6 text-base font-semibold"
      >
        {disabled ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Logging out...
          </>
        ) : (
          <>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      size="lg"
      className="h-14 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
    >
      {disabled ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-5 w-5" />
          Login with Internet Identity
        </>
      )}
    </Button>
  );
}
