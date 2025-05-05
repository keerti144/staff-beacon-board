
import React, { useState, useEffect } from "react";
import { Staff } from "@/types/staff";
import StaffList from "@/components/StaffList";
import StaffForm from "@/components/StaffForm";
import { initialStaffData } from "@/data/staffData";
import { useToast } from "@/components/ui/use-toast";
import { useStaffFilters } from "@/hooks/useStaffFilters";

const Index = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState<Staff | null>(null);
  const { toast } = useToast();
  
  // Setup filter system
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredStaff,
    hasActiveFilters
  } = useStaffFilters(staffList);

  // Load initial data
  useEffect(() => {
    setStaffList(initialStaffData);
  }, []);

  const handleAddStaff = () => {
    setStaffToEdit(null);
    setFormOpen(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setStaffToEdit(staff);
    setFormOpen(true);
  };

  const handleSaveStaff = (staff: Staff) => {
    if (staffToEdit) {
      // Update existing staff
      setStaffList(
        staffList.map((item) => (item.id === staff.id ? staff : item))
      );
      toast({
        title: "Staff updated",
        description: `${staff.name}'s information has been updated.`,
      });
    } else {
      // Add new staff
      setStaffList([...staffList, { ...staff, id: Date.now().toString() }]);
      toast({
        title: "Staff added",
        description: `${staff.name} has been added to your team.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Staff Beacon Board</h1>
        <p className="text-muted-foreground mt-1">Manage your restaurant staff schedule effectively</p>
      </header>

      <main>
        <StaffList 
          staffList={staffList}
          filteredStaff={filteredStaff}
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
          onAddStaff={handleAddStaff} 
          onEditStaff={handleEditStaff} 
        />
      </main>

      <StaffForm
        open={formOpen}
        setOpen={setFormOpen}
        onSave={handleSaveStaff}
        staffToEdit={staffToEdit}
      />
    </div>
  );
};

export default Index;
