import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetProject, useGetMaterialPurchasesByProject, useGetSafetyIncidentsByProject } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Calendar, DollarSign, User, Building2, Loader2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import MaterialCostTracker from '../components/materials/MaterialCostTracker';
import SafetyIncidentLog from '../components/safety/SafetyIncidentLog';

export default function ProjectDetail() {
  const { projectId } = useParams({ from: '/project/$projectId' });
  const navigate = useNavigate();
  const projectIdBigInt = BigInt(projectId);
  
  const { data: project, isLoading } = useGetProject(projectIdBigInt);
  const { data: purchases = [] } = useGetMaterialPurchasesByProject(projectIdBigInt);
  const { data: incidents = [] } = useGetSafetyIncidentsByProject(projectIdBigInt);

  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Project Not Found</h2>
          <Button onClick={() => navigate({ to: '/' })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1_000_000)));
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const totalSpent = purchases.reduce((sum, p) => sum + p.totalCost, 0);
  const budgetRemaining = project.projectValue - totalSpent;
  const burnRate = project.projectValue > 0 ? (totalSpent / project.projectValue) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">{project.name}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant={
                project.status === 'completed' ? 'default' :
                project.status === 'inProgress' ? 'secondary' : 'outline'
              } className="text-sm">
                {project.status === 'completed' ? 'Complete' :
                 project.status === 'inProgress' ? 'In Progress' : 'Planned'}
              </Badge>
              {incidents.length > 0 && (
                <Badge variant="destructive" className="text-sm">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {incidents.length} Safety Incident{incidents.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-[oklch(0.65_0.22_35)]">
              ${project.projectValue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Project Value</div>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MapPin className="h-8 w-8 text-[oklch(0.65_0.22_35)]" />
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-semibold">{project.location}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <User className="h-8 w-8 text-[oklch(0.65_0.22_35)]" />
            <div>
              <div className="text-xs text-muted-foreground">Client</div>
              <div className="font-semibold">{project.clientName}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Building2 className="h-8 w-8 text-[oklch(0.65_0.22_35)]" />
            <div>
              <div className="text-xs text-muted-foreground">General Contractor</div>
              <div className="font-semibold">{project.generalContractor}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="h-8 w-8 text-[oklch(0.65_0.22_35)]" />
            <div>
              <div className="text-xs text-muted-foreground">Completion Date</div>
              <div className="font-semibold">{formatDate(project.estimatedCompletionDate)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="materials" className="text-xs sm:text-sm">Materials</TabsTrigger>
          <TabsTrigger value="safety" className="text-xs sm:text-sm">Safety</TabsTrigger>
          <TabsTrigger value="permits" className="text-xs sm:text-sm">Permits</TabsTrigger>
          <TabsTrigger value="crew" className="text-xs sm:text-sm">Crew</TabsTrigger>
          <TabsTrigger value="photos" className="text-xs sm:text-sm">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                  <div className="text-lg">{formatDate(project.startDate)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Estimated Completion</div>
                  <div className="text-lg">{formatDate(project.estimatedCompletionDate)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Notes</div>
                  <div className="text-sm">{project.notes || 'No notes available'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-bold">${project.projectValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent to Date</span>
                  <span className="font-bold text-[oklch(0.65_0.22_35)]">${totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className={`font-bold ${budgetRemaining < 0 ? 'text-destructive' : 'text-foreground'}`}>
                    ${budgetRemaining.toLocaleString()}
                  </span>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Burn Rate</span>
                    <span className="font-medium">{burnRate.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div 
                      className={`h-full transition-all ${
                        burnRate > 100 ? 'bg-destructive' : 
                        burnRate > 80 ? 'bg-[oklch(0.75_0.15_85)]' : 
                        'bg-[oklch(0.65_0.22_35)]'
                      }`}
                      style={{ width: `${Math.min(burnRate, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="materials">
          <MaterialCostTracker projectId={projectIdBigInt} projectValue={project.projectValue} />
        </TabsContent>

        <TabsContent value="safety">
          <SafetyIncidentLog projectId={projectIdBigInt} />
        </TabsContent>

        <TabsContent value="permits">
          <Card>
            <CardHeader>
              <CardTitle>Permits & Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Permit tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crew">
          <Card>
            <CardHeader>
              <CardTitle>Crew Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Crew management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Project Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Photo gallery coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
