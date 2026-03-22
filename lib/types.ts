export interface Company {
  slug: string
  name: string
  website: string
  linkedin: string
  logo_url: string
  stage: string
  sector: string[]
  city: string
  description: string
  careers_url: string
  founded_year?: number
  team_size?: string
}

export interface Job {
  id: string
  company_slug: string
  title: string
  company: string
  location: string
  job_type: string
  experience_level: string
  sector: string
  apply_url: string
  posted_date: string
  source: string
}
