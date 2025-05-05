
import React from "react";
import { StaffingAnalysis, TimePeriod } from "@/types/staffing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StaffingTableProps {
  staffingAnalysis: StaffingAnalysis[];
}

const periodLabels: Record<TimePeriod, string> = {
  morning: "Morning (5-12)",
  afternoon: "Afternoon (12-17)",
  evening: "Evening (17-22)",
  night: "Night (22-5)"
};

const StaffingTable: React.FC<StaffingTableProps> = ({ staffingAnalysis }) => {
  // Get all unique roles across all periods
  const allRoles = Array.from(
    new Set(
      staffingAnalysis.flatMap(analysis => 
        Object.keys(analysis.requirements)
      )
    )
  ).sort();

  const renderStatusBadge = (status: string) => {
    const variant = 
      status === "understaffed" ? "destructive" :
      status === "overstaffed" ? "warning" :
      "secondary";
    
    return (
      <Badge variant={variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Time Period</TableHead>
            {allRoles.map(role => (
              <TableHead key={role}>{role}</TableHead>
            ))}
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffingAnalysis.map(analysis => (
            <TableRow key={analysis.period}>
              <TableCell className="font-medium">{periodLabels[analysis.period]}</TableCell>
              
              {allRoles.map(role => {
                const data = analysis.requirements[role];
                return (
                  <TableCell key={`${analysis.period}-${role}`}>
                    {data ? (
                      <div className="flex flex-col">
                        <span className={`text-sm ${
                          data.status === "understaffed" ? "text-red-500" :
                          data.status === "overstaffed" ? "text-amber-500" :
                          "text-green-500"
                        }`}>
                          {data.actual}/{data.required}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                );
              })}
              
              <TableCell>
                {renderStatusBadge(analysis.overall)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffingTable;
