
import { Staff } from "@/types/staff";
import { StaffingAnalysis, StaffingRequirement, StaffingStatus, TimePeriod, timeToPeriod } from "@/types/staffing";
import { staffingRequirements } from "@/data/staffingRequirements";

// Determine staffing status based on actual vs required
export const determineStaffingStatus = (
  actual: number, 
  minRequired: number, 
  maxAllowed: number
): StaffingStatus => {
  if (actual < minRequired) return "understaffed";
  if (actual > maxAllowed) return "overstaffed";
  return "optimal";
};

// Count active staff for a given role and period
export const countActiveStaff = (
  staffList: Staff[], 
  role: string, 
  period: TimePeriod
): number => {
  return staffList.filter(staff => {
    // Skip inactive staff
    if (staff.status !== "Active") return false;
    
    // Check if role matches
    if (staff.role !== role) return false;
    
    // Check if shift overlaps with the period
    const startPeriod = timeToPeriod(staff.shiftStart);
    const endPeriod = timeToPeriod(staff.shiftEnd);
    
    // Simple overlap check (this could be made more sophisticated)
    return startPeriod === period || endPeriod === period;
  }).length;
};

// Analyze staffing levels for each period
export const analyzeStaffing = (staffList: Staff[]): StaffingAnalysis[] => {
  const periods: TimePeriod[] = ["morning", "afternoon", "evening", "night"];
  
  return periods.map(period => {
    const periodRequirements = staffingRequirements.filter(req => req.period === period);
    const requirementsByRole: StaffingAnalysis["requirements"] = {};
    
    periodRequirements.forEach(req => {
      const actualCount = countActiveStaff(staffList, req.role, period);
      const status = determineStaffingStatus(actualCount, req.minRequired, req.maxAllowed);
      
      requirementsByRole[req.role] = {
        required: req.minRequired,
        actual: actualCount,
        status
      };
    });
    
    // Determine overall status (worst case)
    let overall: StaffingStatus = "optimal";
    Object.values(requirementsByRole).forEach(roleAnalysis => {
      if (roleAnalysis.status === "understaffed") overall = "understaffed";
      else if (roleAnalysis.status === "overstaffed" && overall !== "understaffed") 
        overall = "overstaffed";
    });
    
    return {
      period,
      requirements: requirementsByRole,
      overall
    };
  });
};

// Analyze staffing for a specific role and time
export const analyzeStaffingForRole = (
  staffList: Staff[],
  role: string,
  time: string
): { status: StaffingStatus; message: string } => {
  const period = timeToPeriod(time);
  const requirement = staffingRequirements.find(req => req.role === role && req.period === period);
  
  if (!requirement) {
    return { 
      status: "optimal", 
      message: "No specific requirements for this role and time" 
    };
  }
  
  const actualCount = countActiveStaff(staffList, role, period);
  const status = determineStaffingStatus(actualCount, requirement.minRequired, requirement.maxAllowed);
  
  let message = "";
  switch (status) {
    case "understaffed":
      message = `Need ${requirement.minRequired - actualCount} more ${role}(s) during this period`;
      break;
    case "overstaffed":
      message = `${actualCount - requirement.maxAllowed} too many ${role}(s) during this period`;
      break;
    default:
      message = `Optimal staffing for ${role} during this period`;
  }
  
  return { status, message };
};
