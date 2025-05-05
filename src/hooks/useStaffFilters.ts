
import { useState, useCallback, useMemo } from "react";
import { Staff } from "@/types/staff";
import { StaffFilters, defaultFilters } from "@/types/filters";
import { applyFilters } from "@/utils/filterPipeline";

export function useStaffFilters(staffList: Staff[]) {
  const [filters, setFilters] = useState<StaffFilters>(defaultFilters);
  
  // Update specific filter
  const updateFilter = useCallback(<K extends keyof StaffFilters>(
    key: K, 
    value: StaffFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);
  
  // Apply filters to staff list
  const filteredStaff = useMemo(() => {
    return applyFilters(staffList, filters);
  }, [staffList, filters]);
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.role !== "All" ||
      filters.status !== "All" ||
      filters.timeRange !== null ||
      filters.search !== ""
    );
  }, [filters]);
  
  return {
    filters,
    updateFilter,
    resetFilters,
    filteredStaff,
    hasActiveFilters
  };
}
