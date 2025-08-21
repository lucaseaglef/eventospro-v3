interface Sponsor {
  id: string
  name: string
  logo: string
  tier: "platinum" | "gold" | "silver" | "bronze"
  website?: string
}

interface EventSponsorsProps {
  sponsors: Sponsor[]
}

const tierConfig = {
  platinum: {
    title: "Patrocinador Platinum",
    logoSize: "h-16 w-auto",
  },
  gold: {
    title: "Patrocinador Gold",
    logoSize: "h-12 w-auto",
  },
  silver: {
    title: "Patrocinador Silver",
    logoSize: "h-10 w-auto",
  },
  bronze: {
    title: "Patrocinador Bronze",
    logoSize: "h-8 w-auto",
  },
}

export function EventSponsors({ sponsors }: EventSponsorsProps) {
  if (!sponsors || sponsors.length === 0) {
    return null
  }

  const sponsorsByTier = sponsors.reduce(
    (acc, sponsor) => {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = []
      }
      acc[sponsor.tier].push(sponsor)
      return acc
    },
    {} as Record<string, Sponsor[]>,
  )

  const tierOrder: (keyof typeof tierConfig)[] = ["platinum", "gold", "silver", "bronze"]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Patrocinadores</h2>
        <p className="text-gray-600">Empresas que apoiam este evento</p>
      </div>

      {tierOrder.map((tier) => {
        const tierSponsors = sponsorsByTier[tier]
        if (!tierSponsors || tierSponsors.length === 0) return null

        const config = tierConfig[tier]

        return (
          <div key={tier} className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-800">{config.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tierSponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex items-center justify-center min-h-[80px]">
                  {sponsor.website ? (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                    >
                      <img
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        className={`${config.logoSize} object-contain mx-auto`}
                      />
                    </a>
                  ) : (
                    <img
                      src={sponsor.logo || "/placeholder.svg"}
                      alt={sponsor.name}
                      className={`${config.logoSize} object-contain hover:opacity-80 transition-opacity duration-200 mx-auto`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
