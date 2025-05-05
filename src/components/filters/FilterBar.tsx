
import React from "react";
import { StaffFilters } from "@/types/filters";
import { StaffRole, StaffStatus } from "@/types/staff";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterChip from "./FilterChip";
import { Search, FilterX } from "lucide-react";

interface FilterBarProps {
  filters: StaffFilters;
  updateFilter: <K extends keyof StaffFilters>(key: K, value: StaffFilters[K]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  updateFilter, 
  resetFilters, 
  hasActiveFilters 
}) => {
  const staffRoles: (StaffRole | "All")[] = ["All", "Chef", "Server", "Manager", "Host", "Bartender", "Dishwasher"];
  const staffStatuses: (StaffStatus | "All")[] = ["All", "Active", "Inactive"];
  
  return (
    <div className="space-y-4 mb-6 border p-4 rounded-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Role filter */}
        <Select
          value={filters.role}
          onValueChange={(value) => updateFilter("role", value as StaffRole | "All")}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            {staffRoles.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Reset filters button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="whitespace-nowrap flex gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
      
      {/* Status filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm mr-2">Status:</span>
        <ToggleGroup 
          type="single" 
          value={filters.status} 
          onValueChange={(value) => {
            if (value) updateFilter("status", value as StaffStatus | "All");
          }}
        >
          {staffStatuses.map((status) => (
            <ToggleGroupItem 
              key={status} 
              value={status}
              variant="outline"
            >
              {status}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap mt-3">
          {filters.role !== "All" && (
            <FilterChip 
              label={`Role: ${filters.role}`}
              onRemove={() => updateFilter("role", "All")}
            />
          )}
          {filters.status !== "All" && (
            <FilterChip 
              label={`Status: ${filters.status}`}
              onRemove={() => updateFilter("status", "All")}
            />
          )}
          {filters.search && (
            <FilterChip 
              label={`Search: ${filters.search}`}
              onRemove={() => updateFilter("search", "")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
