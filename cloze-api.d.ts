/**
 * Cloze API Client TypeScript Definitions
 * @version 1.0.0
 */

// Common query parameters used across multiple endpoints
export interface BaseQueryParams {
  max?: number;
  cursor?: string;
  scope?: 'local' | 'team' | string; // hierarchy:/X/Y/Z or hierarchy:X/Y/Z/*
  team?: boolean;
  detailed?: boolean;
  includeauditedchanges?: boolean;
  sort?: 'lastchanged' | 'bestrelationship' | 'firstmet' | 'lasttalked' | 'wentquiet' | 
         'assigned' | 'duenext' | 'duepast' | 'first' | 'last' | 'nextstep' | 
         'distance' | 'value' | 'created' | 'start' | 'end' | 'name';
  group?: 'stage' | 'subteam';
  modifiedafter?: string;
  freeformquery?: string;
  stage?: 'lead' | 'future' | 'current' | 'past' | 'out' | 'none' | 'any';
  segment?: string;
  step?: string;
  assigned?: boolean;
  assignee?: string;
  location?: string; // lat,long format
}

// People specific params
export interface PeopleQueryParams extends BaseQueryParams {}

// Projects specific params
export interface ProjectsQueryParams extends BaseQueryParams {
  collaborator?: string;
  hidelostdone?: boolean;
}

// Companies specific params
export interface CompaniesQueryParams extends BaseQueryParams {}

// Data structures
export interface Person {
  uniqueid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string[];
  phone?: string[];
  company?: string;
  title?: string;
  address?: Address;
  customFields?: Record<string, any>;
  tags?: string[];
  stage?: string;
  segment?: string;
  step?: string;
  assigned?: boolean;
  assignee?: string;
  [key: string]: any;
}

export interface Project {
  uniqueid?: string;
  name?: string;
  description?: string;
  address?: Address;
  customFields?: Record<string, any>;
  tags?: string[];
  stage?: string;
  segment?: string;
  step?: string;
  assigned?: boolean;
  assignee?: string;
  collaborators?: string[];
  value?: number;
  [key: string]: any;
}

export interface Company {
  uniqueid?: string;
  name?: string;
  domain?: string;
  address?: Address;
  customFields?: Record<string, any>;
  tags?: string[];
  stage?: string;
  segment?: string;
  step?: string;
  assigned?: boolean;
  assignee?: string;
  [key: string]: any;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  [key: string]: any;
}

export interface Content {
  uniqueid?: string;
  subject?: string;
  body?: string;
  date?: string;
  relationId?: string;
  [key: string]: any;
}

export interface Todo {
  uniqueid?: string;
  subject?: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
  relationId?: string;
  [key: string]: any;
}

export interface Communication {
  uniqueid?: string;
  subject?: string;
  body?: string;
  date?: string;
  from?: string;
  to?: string[];
  [key: string]: any;
}

export interface TeamMember {
  uniqueid?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export interface TeamRole {
  id?: string;
  name?: string;
  [key: string]: any;
}

export interface TeamNode {
  id?: string;
  name?: string;
  parentId?: string;
  [key: string]: any;
}

export interface CustomField {
  id?: string;
  name?: string;
  type?: string;
  options?: any[];
  [key: string]: any;
}

export interface View {
  id?: string;
  name?: string;
  type?: string;
  [key: string]: any;
}

export interface Segment {
  id?: string;
  name?: string;
  [key: string]: any;
}

export interface Stage {
  id?: string;
  name?: string;
  [key: string]: any;
}

export interface Step {
  id?: string;
  name?: string;
  segmentId?: string;
  stageId?: string;
  [key: string]: any;
}

export interface AnalyticsQuery {
  max?: number;
  scale?: 'year' | 'quarter' | 'month' | 'week';
  tag?: string;
  measures?: string[];
  [key: string]: any;
}

export interface AnalyticsQueries {
  [queryName: string]: AnalyticsQuery;
}

export interface ApiResponse<T = any> {
  data?: T;
  cursor?: string;
  hasMore?: boolean;
  [key: string]: any;
}

export interface EmailOpen {
  messageId?: string;
  openDate?: string;
  recipient?: string;
  [key: string]: any;
}

// API Classes

/**
 * People API - Operations related to people/contacts
 */
export class PeopleAPI {
  constructor(client: Cloze);
  
  /**
   * Find people matching query criteria
   * @param params - Query parameters for filtering people
   */
  find(params?: PeopleQueryParams): Promise<ApiResponse>;
  
  /**
   * Get a specific person by unique ID
   * @param uniqueid - The unique identifier for the person
   * @param team - Whether to get team or local relation
   */
  get(uniqueid: string, team?: boolean): Promise<Person>;
  
  /**
   * Create a new person
   * @param personData - The person data to create
   */
  create(personData: Partial<Person>): Promise<Person>;
  
  /**
   * Update an existing person
   * @param personData - The person data to update (must include uniqueid)
   */
  update(personData: Partial<Person>): Promise<Person>;
  
  /**
   * Delete a person
   * @param uniqueid - The unique identifier for the person
   * @param team - Whether to delete team or local relation
   */
  delete(uniqueid: string, team?: boolean): Promise<void>;
  
  /**
   * Get batch of people changes using feed API
   * @param params - Query parameters for the feed
   */
  feed(params?: PeopleQueryParams): Promise<ApiResponse>;
}

/**
 * Projects API - Operations related to projects/deals
 */
export class ProjectsAPI {
  constructor(client: Cloze);
  
  /**
   * Find projects matching query criteria
   * @param params - Query parameters for filtering projects
   */
  find(params?: ProjectsQueryParams): Promise<ApiResponse>;
  
  /**
   * Get a specific project by unique ID
   * @param uniqueid - The unique identifier for the project
   * @param team - Whether to get team or local relation
   */
  get(uniqueid: string, team?: boolean): Promise<Project>;
  
  /**
   * Create a new project
   * @param projectData - The project data to create
   */
  create(projectData: Partial<Project>): Promise<Project>;
  
  /**
   * Update an existing project
   * @param projectData - The project data to update (must include uniqueid)
   */
  update(projectData: Partial<Project>): Promise<Project>;
  
  /**
   * Delete a project
   * @param uniqueid - The unique identifier for the project
   * @param team - Whether to delete team or local relation
   */
  delete(uniqueid: string, team?: boolean): Promise<void>;
  
  /**
   * Get batch of project changes using feed API
   * @param params - Query parameters for the feed
   */
  feed(params?: ProjectsQueryParams): Promise<ApiResponse>;
}

/**
 * Companies API - Operations related to companies
 */
export class CompaniesAPI {
  constructor(client: Cloze);
  
  /**
   * Find companies matching query criteria
   * @param params - Query parameters for filtering companies
   */
  find(params?: CompaniesQueryParams): Promise<ApiResponse>;
  
  /**
   * Get a specific company by unique ID
   * @param uniqueid - The unique identifier for the company
   * @param team - Whether to get team or local relation
   */
  get(uniqueid: string, team?: boolean): Promise<Company>;
  
  /**
   * Create a new company
   * @param companyData - The company data to create
   */
  create(companyData: Partial<Company>): Promise<Company>;
  
  /**
   * Update an existing company
   * @param companyData - The company data to update (must include uniqueid)
   */
  update(companyData: Partial<Company>): Promise<Company>;
  
  /**
   * Delete a company
   * @param uniqueid - The unique identifier for the company
   * @param team - Whether to delete team or local relation
   */
  delete(uniqueid: string, team?: boolean): Promise<void>;
  
  /**
   * Get batch of company changes using feed API
   * @param params - Query parameters for the feed
   */
  feed(params?: CompaniesQueryParams): Promise<ApiResponse>;
}

/**
 * Team API - Operations related to team management
 */
export class TeamAPI {
  constructor(client: Cloze);
  
  /**
   * Get list of team members
   * @param params - Query parameters
   */
  members(params?: any): Promise<ApiResponse<TeamMember[]>>;
  
  /**
   * Get team roles
   */
  roles(): Promise<TeamRole[]>;
  
  /**
   * Get team hierarchy nodes
   */
  nodes(): Promise<TeamNode[]>;
  
  /**
   * Update a team member
   * @param memberData - The member data to update
   */
  updateMember(memberData: Partial<TeamMember>): Promise<TeamMember>;
}

/**
 * Timeline API - Operations related to timeline items (content, todos, communications)
 */
export class TimelineAPI {
  constructor(client: Cloze);
  
  /**
   * Create a content record (note, etc.)
   * @param contentData - The content data to create
   */
  createContent(contentData: Partial<Content>): Promise<Content>;
  
  /**
   * Create a todo
   * @param todoData - The todo data to create
   */
  createTodo(todoData: Partial<Todo>): Promise<Todo>;
  
  /**
   * Create a communication record (email, call, etc.)
   * @param communicationData - The communication data to create
   */
  createCommunication(communicationData: Partial<Communication>): Promise<Communication>;
  
  /**
   * Get email opens
   * @param from - Optional date to get opens from
   */
  getOpens(from?: string): Promise<EmailOpen[]>;
}

/**
 * Analytics API - Operations related to analytics and reporting
 */
export class AnalyticsAPI {
  constructor(client: Cloze);
  
  /**
   * Query team activity data
   * @param queries - Map of query definitions
   */
  queryTeamActivity(queries: AnalyticsQueries): Promise<any>;
  
  /**
   * Update team activity (refresh analytics data)
   * @param params - Update parameters (tag, wait, skip)
   */
  updateTeamActivity(params?: { tag?: string; wait?: number; skip?: boolean }): Promise<any>;
  
  /**
   * Query user activity data
   * @param queries - Map of query definitions
   */
  queryUserActivity(queries: AnalyticsQueries): Promise<any>;
  
  /**
   * Query project/deal pipeline data
   * @param queries - Map of query definitions
   */
  queryProjectData(queries: AnalyticsQueries): Promise<any>;
  
  /**
   * Query lead qualification data
   * @param queries - Map of query definitions
   */
  queryLeadQualificationData(queries: AnalyticsQueries): Promise<any>;
  
  /**
   * Query funnel data
   * @param queries - Map of query definitions
   */
  queryFunnelData(queries: AnalyticsQueries): Promise<any>;
}

/**
 * Account API - Operations related to account settings and metadata
 */
export class AccountAPI {
  constructor(client: Cloze);
  
  /**
   * Get user profile information
   */
  getProfile(): Promise<any>;
  
  /**
   * Get custom fields for a relation type
   * @param relationtype - Type of relation (people, projects, companies)
   */
  getCustomFields(relationtype: string): Promise<CustomField[]>;
  
  /**
   * Get views and audiences
   */
  getViews(): Promise<View[]>;
  
  /**
   * Get people and company stages
   */
  getContactStages(): Promise<Stage[]>;
  
  /**
   * Get project stages
   */
  getProjectStages(): Promise<Stage[]>;
  
  /**
   * Get people and company segments
   */
  getContactSegments(): Promise<Segment[]>;
  
  /**
   * Get project segments
   */
  getProjectSegments(): Promise<Segment[]>;
  
  /**
   * Get steps
   * @param segment - Optional segment filter
   * @param stage - Optional stage filter
   */
  getSteps(segment?: string, stage?: string): Promise<Step[]>;
}

/**
 * Main Cloze API client class
 */
export default class Cloze {
  public people: PeopleAPI;
  public projects: ProjectsAPI;
  public companies: CompaniesAPI;
  public team: TeamAPI;
  public timeline: TimelineAPI;
  public analytics: AnalyticsAPI;
  public account: AccountAPI;
  
  public apiKey: string;
  public backend: 'fetch' | 'postMessage';
  public baseUrl: string;

  /**
   * Create a new Cloze API client
   * @param apiKey - The bearer token API key (when running in an iframe inside Cloze, this can be omitted)
   */
  constructor(apiKey?: string);
}
