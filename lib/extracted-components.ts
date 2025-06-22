// Temporarily disabled to resolve compilation errors.

export interface ExtractedComponent {
  id: string;
  name: string;
  category: string;
  code: string;
  dependencies: string[];
  tags: string[];
  estimatedTokens: number;
  source: string;
}

export interface ComponentCategory {
  id:string;
  name: string;
  description: string;
  components: ExtractedComponent[];
}

export const ECOMMERCE_COMPONENTS: ExtractedComponent[] = [];
export const DASHBOARD_COMPONENTS: ExtractedComponent[] = [];
export const UI_COMPONENTS: ExtractedComponent[] = [];
export const STARTER_COMPONENTS: ExtractedComponent[] = [];
export const BUSINESS_COMPONENTS: ExtractedComponent[] = [];
export const EDUCATION_COMPONENTS: ExtractedComponent[] = [];
export const GAMING_COMPONENTS: ExtractedComponent[] = []; 