export interface User {
  name: string
  avatarUrl?: string
  email: string
  phone: string
  nationality: string
  position: string[]
  preferredFoot: string
  currentClub: {
    name: string
    league: string
    country: string
    since: string
  }
  previousClubs: {
    name: string
    from: string
    to: string
  }[]
  careerStats: {
    appearances: number
    goals: number
    assists: number
    yellowCards: number
    redCards: number
  }
  bio: string
  socialLinks: {
    instagram?: string
    linkedin?: string
    website?: string
  }
  videos: {
    title: string
    url: string
  }[]
  agentContact: {
    name: string
    phone: string
    email: string
  },
  isAvailableForTransfer: boolean
  isAdmin: boolean
}
