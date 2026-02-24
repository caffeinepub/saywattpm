import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Debug "mo:core/Debug";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
    role : Text;
    phone : Text;
    email : Text;
  };

  public type ProjectStatus = { #planned; #inProgress; #completed };
  public type PermitStatus = { #pending; #approved; #expired };
  public type InspectionResult = { #passed; #failed; #pending };

  public type Project = {
    id : Nat;
    name : Text;
    location : Text;
    status : ProjectStatus;
    startDate : Time.Time;
    estimatedCompletionDate : Time.Time;
    clientName : Text;
    generalContractor : Text;
    projectValue : Float;
    notes : Text;
    createdBy : Principal;
  };

  public type Permit = {
    id : Nat;
    projectId : Nat;
    permitNumber : Text;
    status : PermitStatus;
    renewalDate : Time.Time;
    inspectionResult : InspectionResult;
    inspectorName : Text;
  };

  public type CrewMember = {
    id : Nat;
    name : Text;
    available : Bool;
  };

  public type Task = {
    id : Nat;
    projectId : Nat;
    description : Text;
    assignedCrew : Nat;
    dueDate : Time.Time;
    isOutdoor : Bool;
  };

  module Task {
    public func compare(task1 : Task, task2 : Task) : Order.Order {
      Nat.compare(task1.id, task2.id);
    };
  };

  public type MaterialPurchase = {
    id : Nat;
    projectId : Nat;
    item : Text;
    quantity : Float;
    unitCost : Float;
    totalCost : Float;
    supplier : Text;
    loggedBy : Principal;
  };

  public type ChangeOrder = {
    id : Nat;
    projectId : Nat;
    description : Text;
    additionalCost : Float;
    status : { #pending; #approved; #rejected };
    createdBy : Principal;
  };

  public type SafetyIncident = {
    id : Nat;
    projectId : Nat;
    description : Text;
    timestamp : Time.Time;
    reportedBy : Principal;
  };

  // State
  var nextId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();
  let projects = Map.empty<Nat, Project>();
  let permits = Map.empty<Nat, Permit>();
  let crewMembers = Map.empty<Nat, CrewMember>();
  let tasks = Map.empty<Nat, Task>();
  let materialPurchases = Map.empty<Nat, MaterialPurchase>();
  let changeOrders = Map.empty<Nat, ChangeOrder>();
  let safetyIncidents = Map.empty<Nat, SafetyIncident>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Management
  public shared ({ caller }) func createProject(name : Text, location : Text, clientName : Text, generalContractor : Text, projectValue : Float, notes : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create projects");
    };
    let id = nextId;
    nextId += 1;
    let project : Project = {
      id;
      name;
      location;
      status = #planned;
      startDate = Time.now();
      estimatedCompletionDate = Time.now() + 86_400_000_000_000;
      clientName;
      generalContractor;
      projectValue;
      notes;
      createdBy = caller;
    };
    projects.add(id, project);
    id;
  };

  public query ({ caller }) func getProject(id : Nat) : async ?Project {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view projects");
    };
    projects.get(id);
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view projects");
    };
    projects.values().toArray();
  };

  // Permit & Inspection Tracker
  public shared ({ caller }) func addPermit(projectId : Nat, permitNumber : Text, inspectorName : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add permits");
    };
    let id = nextId;
    nextId += 1;
    let permit : Permit = {
      id;
      projectId;
      permitNumber;
      status = #pending;
      renewalDate = Time.now() + 31_536_000_000_000;
      inspectionResult = #pending;
      inspectorName;
    };
    permits.add(id, permit);
    id;
  };

  // Crew Conflict Detection
  public shared ({ caller }) func assignCrewToTask(crewId : Nat, taskId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can assign crew to tasks");
    };

    switch (crewMembers.get(crewId)) {
      case (null) { Runtime.trap("Crew member does not exist") };
      case (?crew) {
        switch (tasks.get(taskId)) {
          case (null) { Runtime.trap("Task does not exist") };
          case (?task) {
            if (not crew.available) {
              Runtime.trap("Crew member is not available");
            };
            let updatedTask = {
              task with
              assignedCrew = crewId;
            };
            tasks.add(taskId, updatedTask);
          };
        };
      };
    };
  };

  // Weather-Aware Scheduling (simplified, just flagging outdoor tasks)
  public shared ({ caller }) func flagOutdoorTasksForWeatherWarning(taskId : Nat, weatherCondition : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can flag outdoor tasks");
    };

    switch (tasks.get(taskId)) {
      case (null) { Runtime.trap("Task does not exist") };
      case (?task) {
        if (task.isOutdoor) {
          Debug.print("Task flagged for weather condition: " # weatherCondition);
        };
      };
    };
  };

  // Mileage & Drive Time Tracking (simplified)
  public shared ({ caller }) func logMileage(projectId : Nat, miles : Float, driveTimeMinutes : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log mileage");
    };
    Debug.print(
      "Mileage logged for project "
      # projectId.toText()
      # ": "
      # miles.toText()
      # " miles, "
      # driveTimeMinutes.toText()
      # " minutes"
    );
  };

  // Voice-Activated Job Site Check-In/Check-Out (simplified)
  public shared ({ caller }) func checkIn(projectId : Nat, crewMemberName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check in");
    };
    Debug.print("Checked in to project " # projectId.toText() # " by crew member " # crewMemberName);
  };

  // Photo + Voice Annotation (simplified)
  public shared ({ caller }) func addPhotoAnnotation(projectId : Nat, description : Text, taskId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add photo annotations");
    };
    Debug.print("Photo annotation added for project " # projectId.toText() # ": " # description);
  };

  // Material Cost Tracker (simplified)
  public shared ({ caller }) func addMaterialPurchase(projectId : Nat, item : Text, quantity : Float, unitCost : Float, supplier : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add material purchases");
    };
    let id = nextId;
    nextId += 1;
    let purchase : MaterialPurchase = {
      id;
      projectId;
      item;
      quantity;
      unitCost;
      totalCost = quantity * unitCost;
      supplier;
      loggedBy = caller;
    };
    materialPurchases.add(id, purchase);
    id;
  };

  public query ({ caller }) func getMaterialPurchasesByProject(projectId : Nat) : async [MaterialPurchase] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view material purchases");
    };
    let purchasesList = List.empty<MaterialPurchase>();
    for (purchase in materialPurchases.values()) {
      if (purchase.projectId == projectId) {
        purchasesList.add(purchase);
      };
    };
    purchasesList.toArray();
  };

  // Change Order Management
  public shared ({ caller }) func createChangeOrder(projectId : Nat, description : Text, additionalCost : Float) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create change orders");
    };
    let id = nextId;
    nextId += 1;
    let changeOrder : ChangeOrder = {
      id;
      projectId;
      description;
      additionalCost;
      status = #pending;
      createdBy = caller;
    };
    changeOrders.add(id, changeOrder);
    id;
  };

  public shared ({ caller }) func approveChangeOrder(changeOrderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve change orders");
    };

    switch (changeOrders.get(changeOrderId)) {
      case (null) { Runtime.trap("Change order does not exist") };
      case (?changeOrder) {
        let updatedChangeOrder = {
          changeOrder with
          status = #approved;
        };
        changeOrders.add(changeOrderId, updatedChangeOrder);

        // Update project value
        switch (projects.get(changeOrder.projectId)) {
          case (null) {};
          case (?project) {
            let updatedProject = {
              project with
              projectValue = project.projectValue + changeOrder.additionalCost;
            };
            projects.add(changeOrder.projectId, updatedProject);
          };
        };
      };
    };
  };

  public shared ({ caller }) func rejectChangeOrder(changeOrderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject change orders");
    };

    switch (changeOrders.get(changeOrderId)) {
      case (null) { Runtime.trap("Change order does not exist") };
      case (?changeOrder) {
        let updatedChangeOrder = {
          changeOrder with
          status = #rejected;
        };
        changeOrders.add(changeOrderId, updatedChangeOrder);
      };
    };
  };

  public query ({ caller }) func getPendingChangeOrders() : async [ChangeOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view change orders");
    };
    let ordersList = List.empty<ChangeOrder>();
    for (order in changeOrders.values()) {
      if (order.status == #pending) {
        ordersList.add(order);
      };
    };
    ordersList.toArray();
  };

  // Safety Incident Quick-Log
  public shared ({ caller }) func reportSafetyIncident(projectId : Nat, description : Text, reportedBy : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can report safety incidents");
    };
    let id = nextId;
    nextId += 1;
    let incident : SafetyIncident = {
      id;
      projectId;
      description;
      timestamp = Time.now();
      reportedBy = caller;
    };
    safetyIncidents.add(id, incident);
    id;
  };

  public query ({ caller }) func getSafetyIncidentsByProject(projectId : Nat) : async [SafetyIncident] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view safety incidents");
    };
    let incidentsList = List.empty<SafetyIncident>();
    for (incident in safetyIncidents.values()) {
      if (incident.projectId == projectId) {
        incidentsList.add(incident);
      };
    };
    incidentsList.toArray();
  };

  // Escalating Smart Reminders System (simplified)
  public shared ({ caller }) func sendSmartReminders() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can send smart reminders");
    };
    let today = Time.now();

    for (task in tasks.values()) {
      let daysUntilDue = (task.dueDate - today) / 86_400_000_000_000;
      if (daysUntilDue == 90 or daysUntilDue == 60 or daysUntilDue == 30 or daysUntilDue == 14 or daysUntilDue == 7 or daysUntilDue == 3 or daysUntilDue == 0) {
        Debug.print("Sending reminder for task " # task.id.toText() # ": " # task.description);
      };
    };
  };

  // Code Compliance Checklists (simplified)
  public shared ({ caller }) func verifyCodeCompliance(projectId : Nat, codeSection : Text, verifiedBy : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can verify code compliance");
    };
    Debug.print("Code compliance verified for project " # projectId.toText() # ": " # codeSection # " by " # verifiedBy);
  };

  // Get tasks by due date (sorted)
  public query ({ caller }) func getTasksByDueDate() : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tasks");
    };
    tasks.values().toArray().sort();
  };
};
