export type ProjectStatusType =
  | 'production'
  | 'prototype'
  | 'completed'
  | 'active_development'
  | 'concept';

export interface ArchitectureDetails {
  summary: string;
  frontend: string[];
  backend: string[];
  database: string[];
  devops: string[];
}

export interface KeyFeature {
  title: string;
  description: string;
  tag?: string;
}

export interface EngineeringChallenge {
  challenge: string;
  solution: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: ProjectStatusType;
  statusLabel: string;
  statusDescription: string;
  year: string;
  role: string;
  clientContext: string;
  timeline: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  problem: string;
  objectives: string[];
  architecture: ArchitectureDetails;
  keyFeatures: KeyFeature[];
  challenges: EngineeringChallenge[];
  techStack: string[];
  nextSlug: string;
  nextTitle: string;
  nextCategory: string;
}
