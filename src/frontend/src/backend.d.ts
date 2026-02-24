import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MaterialPurchase {
    id: bigint;
    supplier: string;
    item: string;
    totalCost: number;
    projectId: bigint;
    quantity: number;
    loggedBy: Principal;
    unitCost: number;
}
export type Time = bigint;
export interface SafetyIncident {
    id: bigint;
    description: string;
    reportedBy: Principal;
    projectId: bigint;
    timestamp: Time;
}
export interface Task {
    id: bigint;
    dueDate: Time;
    description: string;
    projectId: bigint;
    assignedCrew: bigint;
    isOutdoor: boolean;
}
export interface Project {
    id: bigint;
    status: ProjectStatus;
    clientName: string;
    name: string;
    createdBy: Principal;
    generalContractor: string;
    notes: string;
    projectValue: number;
    estimatedCompletionDate: Time;
    location: string;
    startDate: Time;
}
export interface ChangeOrder {
    id: bigint;
    additionalCost: number;
    status: Variant_pending_approved_rejected;
    createdBy: Principal;
    description: string;
    projectId: bigint;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
    phone: string;
}
export enum ProjectStatus {
    completed = "completed",
    planned = "planned",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_pending_approved_rejected {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addMaterialPurchase(projectId: bigint, item: string, quantity: number, unitCost: number, supplier: string): Promise<bigint>;
    addPermit(projectId: bigint, permitNumber: string, inspectorName: string): Promise<bigint>;
    addPhotoAnnotation(projectId: bigint, description: string, taskId: bigint): Promise<void>;
    approveChangeOrder(changeOrderId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignCrewToTask(crewId: bigint, taskId: bigint): Promise<void>;
    checkIn(projectId: bigint, crewMemberName: string): Promise<void>;
    createChangeOrder(projectId: bigint, description: string, additionalCost: number): Promise<bigint>;
    createProject(name: string, location: string, clientName: string, generalContractor: string, projectValue: number, notes: string): Promise<bigint>;
    flagOutdoorTasksForWeatherWarning(taskId: bigint, weatherCondition: string): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMaterialPurchasesByProject(projectId: bigint): Promise<Array<MaterialPurchase>>;
    getPendingChangeOrders(): Promise<Array<ChangeOrder>>;
    getProject(id: bigint): Promise<Project | null>;
    getSafetyIncidentsByProject(projectId: bigint): Promise<Array<SafetyIncident>>;
    getTasksByDueDate(): Promise<Array<Task>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    logMileage(projectId: bigint, miles: number, driveTimeMinutes: bigint): Promise<void>;
    rejectChangeOrder(changeOrderId: bigint): Promise<void>;
    reportSafetyIncident(projectId: bigint, description: string, reportedBy: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendSmartReminders(): Promise<void>;
    verifyCodeCompliance(projectId: bigint, codeSection: string, verifiedBy: string): Promise<void>;
}
