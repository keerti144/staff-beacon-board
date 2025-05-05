
import { StaffRole, StaffStatus } from "./staff";

export interface StaffFilters {
  role: StaffRole | "All";
  status: StaffStatus | "All";
  timeRange: {
    start: string;
    end: string;
  } | null;
  search: string;
}

export const defaultFilters: StaffFilters = {
  role: "All",
  status: "All",
  timeRange: null,
  search: ""
};
