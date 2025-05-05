
import { Staff } from "@/types/staff";

export const initialStaffData: Staff[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Chef",
    shiftStart: "08:00",
    shiftEnd: "16:00",
    status: "Active"
  },
  {
    id: "2",
    name: "Maria Garcia",
    role: "Server",
    shiftStart: "11:00",
    shiftEnd: "19:00",
    status: "Active"
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "Manager",
    shiftStart: "09:00",
    shiftEnd: "17:00",
    status: "Active"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    role: "Bartender",
    shiftStart: "16:00",
    shiftEnd: "00:00",
    status: "Active"
  },
  {
    id: "5",
    name: "Michael Brown",
    role: "Host",
    shiftStart: "17:00",
    shiftEnd: "23:00",
    status: "Inactive"
  }
];
