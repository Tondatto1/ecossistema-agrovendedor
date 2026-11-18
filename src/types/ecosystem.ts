export type DeliveryCategory = 'ai' | 'program' | 'methodology' | 'platform' | 'mentorship';

export interface DeliverableDetail {
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface DeliveryItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  category: DeliveryCategory;
  shortDescription: string;
  fullDescription: string;
  color: {
    primary: string; // e.g., '#0ea5e9'
    accent: string;  // e.g., '#10b981'
    badgeBg: string;
    glow: string;
  };
  iconName: string;
  metrics: MetricItem[];
  keyFeatures: string[];
  deliverables: DeliverableDetail[];
  synergies: string[]; // ids of related deliveries
  idealFor: string;
  businessImpact: string;
  redirectUrl: string;
  isFlagship?: boolean;
  flagshipLabel?: string;
  // Canvas positioning defaults (percentages relative to center)
  orbitPosition: { x: number; y: number };
  pipelinePosition: { x: number; y: number };
  synapsePosition: { x: number; y: number };
}

export type LayoutMode = 'orbit' | 'pipeline' | 'synapse';
