import { useLocalStorage } from "./use-local-storage"

export interface Activity {
  id: string
  title: string
  type: string
  speaker: string
  location: string
  startTime: string
  endTime: string
  description: string
  eventId: string
}

export function useActivities(eventId: string) {
  const [activities, setActivities] = useLocalStorage<Activity[]>(`activities_${eventId}`, [
    {
      id: "1",
      title: "Abertura do Evento",
      type: "Palestra",
      speaker: "Dr. João Silva",
      location: "Auditório Principal",
      startTime: "09:00",
      endTime: "10:00",
      description: "Palestra de abertura sobre as tendências do mercado.",
      eventId,
    },
    {
      id: "2",
      title: "Workshop de Inovação",
      type: "Workshop",
      speaker: "Maria Santos",
      location: "Sala 1",
      startTime: "10:30",
      endTime: "12:00",
      description: "Workshop prático sobre metodologias de inovação.",
      eventId,
    },
  ])

  const addActivity = (activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    }
    setActivities((prev) => [...prev, newActivity])
    return newActivity
  }

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setActivities((prev) => prev.map((activity) => (activity.id === id ? { ...activity, ...updates } : activity)))
  }

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id))
  }

  const getActivity = (id: string) => {
    return activities.find((activity) => activity.id === id)
  }

  return {
    activities,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivity,
  }
}
