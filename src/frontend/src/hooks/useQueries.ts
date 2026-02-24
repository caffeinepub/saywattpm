import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  Project, 
  UserProfile, 
  MaterialPurchase, 
  ChangeOrder, 
  SafetyIncident,
  Task 
} from '../backend';

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Projects
export function useGetAllProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProject(projectId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Project | null>({
    queryKey: ['project', projectId?.toString()],
    queryFn: async () => {
      if (!actor || !projectId) return null;
      return actor.getProject(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      location: string;
      clientName: string;
      generalContractor: string;
      projectValue: number;
      notes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProject(
        data.name,
        data.location,
        data.clientName,
        data.generalContractor,
        data.projectValue,
        data.notes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Material Purchases
export function useGetMaterialPurchasesByProject(projectId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<MaterialPurchase[]>({
    queryKey: ['materialPurchases', projectId?.toString()],
    queryFn: async () => {
      if (!actor || !projectId) return [];
      return actor.getMaterialPurchasesByProject(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useAddMaterialPurchase() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectId: bigint;
      item: string;
      quantity: number;
      unitCost: number;
      supplier: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMaterialPurchase(
        data.projectId,
        data.item,
        data.quantity,
        data.unitCost,
        data.supplier
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['materialPurchases', variables.projectId.toString()] 
      });
    },
  });
}

// Change Orders
export function useGetPendingChangeOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<ChangeOrder[]>({
    queryKey: ['changeOrders', 'pending'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingChangeOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateChangeOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectId: bigint;
      description: string;
      additionalCost: number;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createChangeOrder(
        data.projectId,
        data.description,
        data.additionalCost
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changeOrders'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useApproveChangeOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (changeOrderId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.approveChangeOrder(changeOrderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changeOrders'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useRejectChangeOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (changeOrderId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.rejectChangeOrder(changeOrderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changeOrders'] });
    },
  });
}

// Safety Incidents
export function useGetSafetyIncidentsByProject(projectId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<SafetyIncident[]>({
    queryKey: ['safetyIncidents', projectId?.toString()],
    queryFn: async () => {
      if (!actor || !projectId) return [];
      return actor.getSafetyIncidentsByProject(projectId);
    },
    enabled: !!actor && !isFetching && !!projectId,
  });
}

export function useReportSafetyIncident() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectId: bigint;
      description: string;
      reportedBy: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.reportSafetyIncident(
        data.projectId,
        data.description,
        data.reportedBy
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['safetyIncidents', variables.projectId.toString()] 
      });
    },
  });
}

// Tasks
export function useGetTasksByDueDate() {
  const { actor, isFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ['tasks', 'byDueDate'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasksByDueDate();
    },
    enabled: !!actor && !isFetching,
  });
}

// Permits
export function useAddPermit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectId: bigint;
      permitNumber: string;
      inspectorName: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPermit(
        data.projectId,
        data.permitNumber,
        data.inspectorName
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// Check-in
export function useCheckIn() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      projectId: bigint;
      crewMemberName: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.checkIn(data.projectId, data.crewMemberName);
    },
  });
}
