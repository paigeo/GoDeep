import type { PlanInput } from "./plan-details";

export const DEMO_PLAN: PlanInput = {
  id: "demo",
  name: "Yosemite Weekend",
  location: "Yosemite National Park, CA",
  startDate: "2026-05-16",
  endDate: "2026-05-18",
  events: [
    { id: "1", date: "2026-05-16", time: "14:00", title: "Drive up from SF" },
    { id: "2", date: "2026-05-16", time: "18:00", title: "Check in at cabin" },
    { id: "3", date: "2026-05-17", time: "07:00", title: "Sunrise hike · Half Dome" },
    { id: "4", date: "2026-05-17", time: "13:00", title: "Lunch at Yosemite Valley" },
    { id: "5", date: "2026-05-17", time: "19:00", title: "Group dinner at the cabin" },
    { id: "6", date: "2026-05-18", time: "09:00", title: "Valley floor walk" },
    { id: "7", date: "2026-05-18", time: "12:00", title: "Drive home" },
  ],
};

