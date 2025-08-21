import { useLocalStorage } from "./use-local-storage"

export interface SponsorTier {
  id: string
  name: string
  value: number
  color: string
  benefits: string[]
  eventId: string
}

export interface Sponsor {
  id: string
  company: string
  tierId: string
  contact: string
  email: string
  value: number
  benefits: string[]
  eventId: string
}

export function useSponsors(eventId: string) {
  const [sponsors, setSponsors] = useLocalStorage<Sponsor[]>(`sponsors_${eventId}`, [
    {
      id: "1",
      company: "TechCorp",
      tierId: "1",
      contact: "João Silva",
      email: "joao@techcorp.com",
      value: 50000,
      benefits: ["Logo no site", "Stand premium", "Palestra exclusiva"],
      eventId,
    },
  ])

  const [tiers, setTiers] = useLocalStorage<SponsorTier[]>(`sponsor_tiers_${eventId}`, [
    {
      id: "1",
      name: "Diamante",
      value: 50000,
      color: "#3B82F6",
      benefits: ["Logo no site", "Stand premium", "Palestra exclusiva"],
      eventId,
    },
    {
      id: "2",
      name: "Ouro",
      value: 30000,
      color: "#F59E0B",
      benefits: ["Logo no site", "Stand médio"],
      eventId,
    },
  ])

  const addSponsor = (sponsor: Omit<Sponsor, "id">) => {
    const newSponsor: Sponsor = {
      ...sponsor,
      id: Date.now().toString(),
    }
    setSponsors((prev) => [...prev, newSponsor])
    return newSponsor
  }

  const updateSponsor = (id: string, updates: Partial<Sponsor>) => {
    setSponsors((prev) => prev.map((sponsor) => (sponsor.id === id ? { ...sponsor, ...updates } : sponsor)))
  }

  const deleteSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== id))
  }

  const addTier = (tier: Omit<SponsorTier, "id">) => {
    const newTier: SponsorTier = {
      ...tier,
      id: Date.now().toString(),
    }
    setTiers((prev) => [...prev, newTier])
    return newTier
  }

  const updateTier = (id: string, updates: Partial<SponsorTier>) => {
    setTiers((prev) => prev.map((tier) => (tier.id === id ? { ...tier, ...updates } : tier)))
  }

  const deleteTier = (id: string) => {
    setTiers((prev) => prev.filter((tier) => tier.id !== id))
  }

  const getTier = (id: string) => {
    return tiers.find((tier) => tier.id === id)
  }

  return {
    sponsors,
    tiers,
    addSponsor,
    updateSponsor,
    deleteSponsor,
    addTier,
    updateTier,
    deleteTier,
    getTier,
  }
}
