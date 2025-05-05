
import React, { useState, useEffect } from "react";
import { Staff, StaffRole, StaffStatus } from "@/types/staff";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface StaffFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (staff: Staff) => void;
  staffToEdit?: Staff | null;
}

const roles: StaffRole[] = ["Chef", "Server", "Manager", "Host", "Bartender", "Dishwasher"];

const StaffForm: React.FC<StaffFormProps> = ({ open, setOpen, onSave, staffToEdit }) => {
  const [staff, setStaff] = useState<Staff>({
    id: "",
    name: "",
    role: "Server",
    shiftStart: "09:00",
    shiftEnd: "17:00",
    status: "Active"
  });

  useEffect(() => {
    if (staffToEdit) {
      setStaff(staffToEdit);
    } else {
      // Reset form when adding new staff
      setStaff({
        id: Date.now().toString(),
        name: "",
        role: "Server",
        shiftStart: "09:00",
        shiftEnd: "17:00",
        status: "Active"
      });
    }
  }, [staffToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(staff);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{staffToEdit ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={staff.name}
                onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                placeholder="Enter staff name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={staff.role}
                onValueChange={(value) => setStaff({ ...staff, role: value as StaffRole })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shiftStart">Shift Start</Label>
                <Input
                  id="shiftStart"
                  type="time"
                  value={staff.shiftStart}
                  onChange={(e) => setStaff({ ...staff, shiftStart: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shiftEnd">Shift End</Label>
                <Input
                  id="shiftEnd"
                  type="time"
                  value={staff.shiftEnd}
                  onChange={(e) => setStaff({ ...staff, shiftEnd: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status">Status (Active)</Label>
              <Switch
                id="status"
                checked={staff.status === "Active"}
                onCheckedChange={(checked) =>
                  setStaff({ ...staff, status: checked ? "Active" : "Inactive" })
                }
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">{staffToEdit ? "Update" : "Add"} Staff</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffForm;
