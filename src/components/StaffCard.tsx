
import React from "react";
import { Staff } from "@/types/staff";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface StaffCardProps {
  staff: Staff;
  onEdit: (staff: Staff) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff, onEdit }) => {
  return (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onEdit(staff)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{staff.name}</h3>
              <p className="text-muted-foreground text-sm">{staff.role}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {staff.shiftStart} - {staff.shiftEnd}
              </span>
            </div>
            <Badge 
              variant={staff.status === "Active" ? "default" : "outline"}
              className={staff.status === "Active" ? "bg-green-500 hover:bg-green-600" : "text-muted-foreground"}
            >
              {staff.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;
