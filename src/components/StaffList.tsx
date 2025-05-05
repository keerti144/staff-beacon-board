
import React from "react";
import { Staff } from "@/types/staff";
import StaffCard from "./StaffCard";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface StaffListProps {
  staffList: Staff[];
  onAddStaff: () => void;
  onEditStaff: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staffList, onAddStaff, onEditStaff }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Staff List</h2>
        <Button onClick={onAddStaff} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Staff</span>
        </Button>
      </div>
      
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
        ) : (
          staffList.map((staff) => (
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
