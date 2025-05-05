
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
  return (
    <Badge 
      variant="secondary" 
      className="flex items-center gap-1 px-3 py-1 mr-2 mb-2"
    >
      <span>{label}</span>
      <X 
        className="h-3 w-3 cursor-pointer" 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </Badge>
  );
};

export default FilterChip;
