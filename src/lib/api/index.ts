/**
 * Centralized API Integration Layer for Joseph Mensah's Portfolio
 * Connects to the NestJS backend preserving exact DTOs and HTTP contracts.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dev-joseph.me/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface AboutInfo {
  id: string;
  about_text: string;
  resume_url?: string;
  profile_image_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github_link?: string;
  image_url: string;
  tags?: string;
  order_index?: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  image_url: string;
  order_index?: number;
  created_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  image_url: string;
  issue_date?: string;
  order_index?: number;
  created_at?: string;
}

export interface ContactNotification {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface ReorderUpdate {
  id: string;
  order_index: number;
}

/**
 * Generic fetch wrapper with timeout, json parsing, and error normalization
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = `HTTP ${response.status} ${response.statusText}`;
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.message || errorJson.error || errorDetail;
    } catch {
      // Body was not json
    }
    throw new Error(errorDetail);
  }

  return response.json() as Promise<T>;
}

// -------------------------------------------------------------
// Health Check
// -------------------------------------------------------------
export async function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>('/health');
}

// -------------------------------------------------------------
// About Management
// -------------------------------------------------------------
export async function getAboutInfo(): Promise<ApiResponse<AboutInfo>> {
  return apiFetch<ApiResponse<AboutInfo>>('/about/info');
}

export async function updateAboutInfo(
  formData: FormData,
  token: string
): Promise<ApiResponse<AboutInfo>> {
  return apiFetch<ApiResponse<AboutInfo>>('/about', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

// -------------------------------------------------------------
// Projects Management
// -------------------------------------------------------------
export async function getProjects(): Promise<ApiResponse<Project[]>> {
  return apiFetch<ApiResponse<Project[]>>('/projects');
}

export async function addProject(
  formData: FormData,
  token: string
): Promise<ApiResponse<Project>> {
  return apiFetch<ApiResponse<Project>>('/projects', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function updateProject(
  id: string,
  formData: FormData,
  token: string
): Promise<ApiResponse<Project>> {
  return apiFetch<ApiResponse<Project>>(`/projects/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteProject(
  id: string,
  token: string
): Promise<ApiResponse<Project>> {
  return apiFetch<ApiResponse<Project>>(`/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function reorderProjects(
  updates: ReorderUpdate[],
  token: string
): Promise<{ success: boolean; message: string }> {
  return apiFetch<{ success: boolean; message: string }>('/projects/reorder', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updates }),
  });
}

// -------------------------------------------------------------
// Skills Management
// -------------------------------------------------------------
export async function getSkills(): Promise<ApiResponse<Skill[]>> {
  return apiFetch<ApiResponse<Skill[]>>('/skills');
}

export async function addSkill(
  formData: FormData,
  token: string
): Promise<ApiResponse<Skill>> {
  return apiFetch<ApiResponse<Skill>>('/skills', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function updateSkill(
  id: string,
  formData: FormData,
  token: string
): Promise<ApiResponse<Skill>> {
  return apiFetch<ApiResponse<Skill>>(`/skills/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteSkill(
  id: string,
  token: string
): Promise<ApiResponse<Skill>> {
  return apiFetch<ApiResponse<Skill>>(`/skills/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function reorderSkills(
  updates: ReorderUpdate[],
  token: string
): Promise<{ success: boolean; message: string }> {
  return apiFetch<{ success: boolean; message: string }>('/skills/reorder', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updates }),
  });
}

// -------------------------------------------------------------
// Certificates Management
// -------------------------------------------------------------
export async function getCertificates(): Promise<ApiResponse<Certificate[]>> {
  return apiFetch<ApiResponse<Certificate[]>>('/certificates');
}

export async function addCertificate(
  formData: FormData,
  token: string
): Promise<ApiResponse<Certificate>> {
  return apiFetch<ApiResponse<Certificate>>('/certificates', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function updateCertificate(
  id: string,
  formData: FormData,
  token: string
): Promise<ApiResponse<Certificate>> {
  return apiFetch<ApiResponse<Certificate>>(`/certificates/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteCertificate(
  id: string,
  token: string
): Promise<ApiResponse<Certificate>> {
  return apiFetch<ApiResponse<Certificate>>(`/certificates/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function reorderCertificates(
  updates: ReorderUpdate[],
  token: string
): Promise<{ success: boolean; message: string }> {
  return apiFetch<{ success: boolean; message: string }>('/certificates/reorder', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updates }),
  });
}

// -------------------------------------------------------------
// Contact & Notifications
// -------------------------------------------------------------
export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(
  data: ContactSubmission
): Promise<ApiResponse<ContactNotification>> {
  return apiFetch<ApiResponse<ContactNotification>>('/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function getNotifications(
  token: string
): Promise<ApiResponse<ContactNotification[]>> {
  return apiFetch<ApiResponse<ContactNotification[]>>('/notifications', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
