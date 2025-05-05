
import { StaffingRequirement } from "@/types/staffing";

// Define staffing requirements for each role and time period
export const staffingRequirements: StaffingRequirement[] = [
  // Morning requirements (breakfast)
  { role: "Chef", period: "morning", minRequired: 1, maxAllowed: 2 },
  { role: "Server", period: "morning", minRequired: 2, maxAllowed: 4 },
  { role: "Host", period: "morning", minRequired: 1, maxAllowed: 1 },
  { role: "Manager", period: "morning", minRequired: 1, maxAllowed: 1 },
  
  // Afternoon requirements (lunch)
  { role: "Chef", period: "afternoon", minRequired: 2, maxAllowed: 3 },
  { role: "Server", period: "afternoon", minRequired: 3, maxAllowed: 5 },
  { role: "Host", period: "afternoon", minRequired: 1, maxAllowed: 2 },
  { role: "Bartender", period: "afternoon", minRequired: 1, maxAllowed: 2 },
  { role: "Manager", period: "afternoon", minRequired: 1, maxAllowed: 1 },
  
  // Evening requirements (dinner)
  { role: "Chef", period: "evening", minRequired: 2, maxAllowed: 4 },
  { role: "Server", period: "evening", minRequired: 4, maxAllowed: 8 },
  { role: "Host", period: "evening", minRequired: 1, maxAllowed: 2 },
  { role: "Bartender", period: "evening", minRequired: 2, maxAllowed: 3 },
  { role: "Manager", period: "evening", minRequired: 1, maxAllowed: 1 },
  { role: "Dishwasher", period: "evening", minRequired: 1, maxAllowed: 2 },
  
  // Night requirements (late service)
  { role: "Chef", period: "night", minRequired: 1, maxAllowed: 2 },
  { role: "Server", period: "night", minRequired: 2, maxAllowed: 4 },
  { role: "Bartender", period: "night", minRequired: 1, maxAllowed: 2 },
  { role: "Manager", period: "night", minRequired: 0, maxAllowed: 1 },
];
