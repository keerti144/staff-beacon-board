
import { Staff, StaffRole, StaffStatus } from "@/types/staff";
import { StaffFilters } from "@/types/filters";

// Filter by role
export const filterByRole = (role: StaffRole | "All") => (staff: Staff[]): Staff[] => {
  if (role === "All") return staff;
  return staff.filter(s => s.role === role);
};

// Filter by status
export const filterByStatus = (status: StaffStatus | "All") => (staff: Staff[]): Staff[] => {
  if (status === "All") return staff;
  return staff.filter(s => s.status === status);
};

// Filter by time range
export const filterByTimeRange = (timeRange: { start: string; end: string } | null) => (staff: Staff[]): Staff[] => {
  if (!timeRange) return staff;
  
  return staff.filter(s => {
    // Convert time strings to comparable values (minutes since midnight)
    const convertTimeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const shiftStart = convertTimeToMinutes(s.shiftStart);
    const shiftEnd = convertTimeToMinutes(s.shiftEnd);
    const rangeStart = convertTimeToMinutes(timeRange.start);
    const rangeEnd = convertTimeToMinutes(timeRange.end);
    
    // Check if shift overlaps with range
    return shiftStart <= rangeEnd && shiftEnd >= rangeStart;
  });
};

// Filter by search text
export const filterBySearch = (searchText: string) => (staff: Staff[]): Staff[] => {
  if (!searchText.trim()) return staff;
  const lowerSearch = searchText.toLowerCase();
  return staff.filter(s => 
    s.name.toLowerCase().includes(lowerSearch) || 
    s.role.toLowerCase().includes(lowerSearch)
  );
};

// Pipeline function that applies all filters
export const applyFilters = (staff: Staff[], filters: StaffFilters): Staff[] => {
  return [
    filterByRole(filters.role),
    filterByStatus(filters.status),
    filterByTimeRange(filters.timeRange),
    filterBySearch(filters.search)
  ].reduce((result, filterFn) => filterFn(result), staff);
};
