export interface Company {
  slug: string
  name: string
  website: string
  linkedin: string
  stage: string
  sector: string[]
  city: string
  description: string
  careers_url: string
  logo_override?: string
  founded_year?: number
  team_size?: string
  founders?: string
  total_raised?: string
  last_round_date?: string
}

export type JobFunction =
  | "engineering"
  | "product"
  | "design"
  | "sales"
  | "marketing"
  | "operations"
  | "people"
  | "finance"
  | "other"

export type Seniority = "intern" | "entry" | "mid" | "senior"

export interface Job {
  id: string
  company_slug: string
  title: string
  company: string
  location: string
  job_type: string
  experience_level: Seniority
  function: JobFunction
  sector: string
  apply_url: string
  posted_date: string
  source: string
}
