
import React from "react";
import { StaffingStatus } from "@/types/staffing";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface StaffingStatusCardProps {
  status: StaffingStatus;
  message: string;
}

const StaffingStatusCard: React.FC<StaffingStatusCardProps> = ({ status, message }) => {
  const getIcon = () => {
    switch (status) {
      case "understaffed":
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      case "overstaffed":
        return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case "optimal":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case "understaffed":
        return "bg-red-50";
      case "overstaffed":
        return "bg-amber-50";
      case "optimal":
        return "bg-green-50";
    }
  };

  return (
    <Card className={`${getBgColor()} border-0`}>
      <CardContent className="flex items-center p-4 gap-3">
        {getIcon()}
        <div>
          <p className="font-medium">
            {status === "understaffed" && "Understaffed"} 
            {status === "overstaffed" && "Overstaffed"}
            {status === "optimal" && "Optimal Staffing"}
          </p>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffingStatusCard;
