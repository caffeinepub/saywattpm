import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useGetSafetyIncidentsByProject, useReportSafetyIncident } from '../../hooks/useQueries';
import { AlertTriangle, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface SafetyIncidentLogProps {
  projectId: bigint;
}

export default function SafetyIncidentLog({ projectId }: SafetyIncidentLogProps) {
  const { data: incidents = [], isLoading } = useGetSafetyIncidentsByProject(projectId);
  const reportIncident = useReportSafetyIncident();

  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await reportIncident.mutateAsync({
        projectId,
        description,
        reportedBy,
      });

      toast.success('Safety incident reported');
      setShowForm(false);
      setDescription('');
      setReportedBy('');
    } catch (error) {
      toast.error('Failed to report incident');
      console.error(error);
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1_000_000)));
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[oklch(0.75_0.15_85)]" />
          Safety Incidents
        </CardTitle>
        <Button onClick={() => setShowForm(!showForm)} size="sm" variant="destructive">
          <Plus className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-border bg-muted/50 p-4">
            <div className="space-y-2">
              <Label htmlFor="reportedBy">Reported By *</Label>
              <Input
                id="reportedBy"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                placeholder="Your name"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Incident Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened, location, people involved, and corrective actions needed..."
                required
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="h-12 flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="h-12 flex-1"
                disabled={reportIncident.isPending}
              >
                {reportIncident.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Reporting...
                  </>
                ) : (
                  'Report Incident'
                )}
              </Button>
            </div>
          </form>
        )}

        {incidents.length === 0 ? (
          <div className="py-12 text-center">
            <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No safety incidents reported</p>
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.id.toString()}
                className="rounded-lg border border-destructive/20 bg-destructive/5 p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <Badge variant="destructive">Safety Incident</Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(incident.timestamp)}
                  </span>
                </div>
                <p className="mb-2 text-sm text-foreground">{incident.description}</p>
                <p className="text-xs text-muted-foreground">
                  Reported by: {incident.reportedBy.toString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
