import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProject } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [generalContractor, setGeneralContractor] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [notes, setNotes] = useState('');

  const createProject = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProject.mutateAsync({
        name,
        location,
        clientName,
        generalContractor,
        projectValue: parseFloat(projectValue),
        notes,
      });

      toast.success('Project created successfully');
      onOpenChange(false);
      
      // Reset form
      setName('');
      setLocation('');
      setClientName('');
      setGeneralContractor('');
      setProjectValue('');
      setNotes('');
    } catch (error) {
      toast.error('Failed to create project');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
          <DialogDescription>
            Add a new electrical project to your portfolio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hospital Renovation"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="123 Main St, City, State"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name *</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="ABC Healthcare"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="generalContractor">General Contractor *</Label>
            <Input
              id="generalContractor"
              value={generalContractor}
              onChange={(e) => setGeneralContractor(e.target.value)}
              placeholder="XYZ Construction"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectValue">Project Value ($) *</Label>
            <Input
              id="projectValue"
              type="number"
              step="0.01"
              value={projectValue}
              onChange={(e) => setProjectValue(e.target.value)}
              placeholder="150000"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional project details..."
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 flex-1"
              disabled={createProject.isPending}
            >
              {createProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
