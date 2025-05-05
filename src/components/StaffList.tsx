
import React from "react";
import { Staff } from "@/types/staff";
import StaffCard from "./StaffCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import FilterBar from "./filters/FilterBar";
import { StaffFilters } from "@/types/filters";

interface StaffListProps {
  staffList: Staff[];
  filteredStaff: Staff[];
  filters: StaffFilters;
  updateFilter: <K extends keyof StaffFilters>(key: K, value: StaffFilters[K]) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  onAddStaff: () => void;
  onEditStaff: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({ 
  staffList, 
  filteredStaff,
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  onAddStaff, 
  onEditStaff 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff List</h2>
        <Button onClick={onAddStaff} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Staff</span>
        </Button>
      </div>

      <FilterBar 
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />
      
      <div className="space-y-4">
        {staffList.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-muted-foreground">No staff members yet</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={onAddStaff}
            >
              Add your first staff member
            </Button>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-muted-foreground">No staff members match your filters</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredStaff.map((staff) => (
            <StaffCard 
              key={staff.id} 
              staff={staff} 
              onEdit={onEditStaff} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StaffList;
