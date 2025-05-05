
import { StaffRole } from "./staff";

// Define time periods for staffing requirements
export type TimePeriod = "morning" | "afternoon" | "evening" | "night";

// Define staffing requirements per role and time period
export interface StaffingRequirement {
  role: StaffRole;
  period: TimePeriod;
  minRequired: number;
  maxAllowed: number;
}

// Staffing level status
export type StaffingStatus = "understaffed" | "optimal" | "overstaffed";

// Staffing analysis result
export interface StaffingAnalysis {
  period: TimePeriod;
  requirements: {
    [key in StaffRole]?: {
      required: number;
      actual: number;
      status: StaffingStatus;
    };
  };
  overall: StaffingStatus;
}

// Helper to convert time string (HH:MM) to time period
export const timeToPeriod = (time: string): TimePeriod => {
  const hour = parseInt(time.split(":")[0]);
  
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
};
