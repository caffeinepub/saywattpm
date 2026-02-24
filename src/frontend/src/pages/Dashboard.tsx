import { useNavigate } from '@tanstack/react-router';
import { useGetAllProjects, useGetTasksByDueDate, useGetPendingChangeOrders } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import CreateProjectDialog from '../components/projects/CreateProjectDialog';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjects();
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasksByDueDate();
  const { data: changeOrders = [], isLoading: changeOrdersLoading } = useGetPendingChangeOrders();
  const [showCreateProject, setShowCreateProject] = useState(false);

  const getUrgencyColor = (dueDate: bigint) => {
    const now = BigInt(Date.now() * 1_000_000);
    const daysUntil = Number((dueDate - now) / BigInt(86_400_000_000_000));
    
    if (daysUntil < 3) return 'text-destructive';
    if (daysUntil < 7) return 'text-[oklch(0.65_0.22_35)]';
    if (daysUntil < 14) return 'text-[oklch(0.75_0.15_85)]';
    return 'text-muted-foreground';
  };

  const getUrgencyBadge = (dueDate: bigint) => {
    const now = BigInt(Date.now() * 1_000_000);
    const daysUntil = Number((dueDate - now) / BigInt(86_400_000_000_000));
    
    if (daysUntil < 3) return <Badge variant="destructive">Urgent</Badge>;
    if (daysUntil < 7) return <Badge className="bg-[oklch(0.65_0.22_35)] text-white">Soon</Badge>;
    if (daysUntil < 14) return <Badge className="bg-[oklch(0.75_0.15_85)] text-white">Upcoming</Badge>;
    return null;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp / BigInt(1_000_000)));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntil = (dueDate: bigint) => {
    const now = BigInt(Date.now() * 1_000_000);
    const daysUntil = Number((dueDate - now) / BigInt(86_400_000_000_000));
    return Math.max(0, Math.floor(daysUntil));
  };

  if (projectsLoading || tasksLoading || changeOrdersLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div 
        className="relative mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-[oklch(0.35_0.08_35)] to-[oklch(0.25_0.05_25)] p-8 text-white shadow-lg"
        style={{
          backgroundImage: 'url(/assets/generated/dashboard-hero.dim_1200x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
          <p className="text-lg opacity-90">Manage your electrical projects with voice-first efficiency</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[oklch(0.65_0.22_35)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[oklch(0.75_0.15_85)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[oklch(0.85_0.12_105)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Change Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{changeOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${projects.reduce((sum, p) => sum + p.projectValue, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">Projects</CardTitle>
            <Button onClick={() => setShowCreateProject(true)} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <img 
                  src="/assets/generated/empty-projects.dim_400x300.png" 
                  alt="No projects" 
                  className="mb-4 h-32 w-auto opacity-50"
                />
                <p className="text-muted-foreground">No projects yet. Create your first project to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project.id.toString()}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
                    onClick={() => navigate({ to: '/project/$projectId', params: { projectId: project.id.toString() } })}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        project.status === 'completed' ? 'default' :
                        project.status === 'inProgress' ? 'secondary' : 'outline'
                      }>
                        {project.status === 'completed' ? 'Complete' :
                         project.status === 'inProgress' ? 'In Progress' : 'Planned'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-16 w-16 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No upcoming deadlines</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id.toString()}
                    className="flex items-start justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${getUrgencyColor(task.dueDate)}`} />
                        <span className={`text-sm font-medium ${getUrgencyColor(task.dueDate)}`}>
                          {getDaysUntil(task.dueDate)} days
                        </span>
                        {getUrgencyBadge(task.dueDate)}
                      </div>
                      <p className="font-medium text-foreground">{task.description}</p>
                      <p className="text-sm text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Change Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Pending Change Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {changeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-16 w-16 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No pending change orders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {changeOrders.map((order) => (
                  <div
                    key={order.id.toString()}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <Badge variant="outline">Pending Approval</Badge>
                      <span className="text-lg font-bold text-[oklch(0.65_0.22_35)]">
                        +${order.additionalCost.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{order.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="h-14 w-full justify-start text-left" variant="outline">
              <AlertTriangle className="mr-3 h-5 w-5 text-[oklch(0.75_0.15_85)]" />
              <div>
                <div className="font-semibold">Report Safety Incident</div>
                <div className="text-xs text-muted-foreground">Quick voice logging</div>
              </div>
            </Button>
            <Button className="h-14 w-full justify-start text-left" variant="outline">
              <Clock className="mr-3 h-5 w-5 text-[oklch(0.65_0.22_35)]" />
              <div>
                <div className="font-semibold">Check In to Site</div>
                <div className="text-xs text-muted-foreground">Start time tracking</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      <CreateProjectDialog open={showCreateProject} onOpenChange={setShowCreateProject} />
    </div>
  );
}
