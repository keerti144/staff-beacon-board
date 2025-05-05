
export type StaffRole = "Chef" | "Server" | "Manager" | "Host" | "Bartender" | "Dishwasher";

export type StaffStatus = "Active" | "Inactive";

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  shiftStart: string;
  shiftEnd: string;
  status: StaffStatus;
}
