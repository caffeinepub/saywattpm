import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import type { UserProfile } from '../../backend';

export default function ProfileSetup() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name,
      role,
      email,
      phone,
    };

    await saveProfile.mutateAsync(profile);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Welcome to SayWattPM</DialogTitle>
          <DialogDescription>
            Let's set up your profile to get started
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Project Manager"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              required
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base font-semibold"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
