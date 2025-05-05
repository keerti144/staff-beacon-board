
import React from "react";
import { StaffingAnalysis, TimePeriod } from "@/types/staffing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegendContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Cell 
} from "recharts";

interface StaffingChartProps {
  staffingAnalysis: StaffingAnalysis[];
}

const periodLabels: Record<TimePeriod, string> = {
  morning: "Morning (5-12)",
  afternoon: "Afternoon (12-17)",
  evening: "Evening (17-22)",
  night: "Night (22-5)"
};

const statusColors = {
  understaffed: "#ef4444", // red
  optimal: "#22c55e",      // green
  overstaffed: "#f59e0b"   // amber
};

const StaffingChart: React.FC<StaffingChartProps> = ({ staffingAnalysis }) => {
  // Transform the data for the chart
  const chartData = staffingAnalysis.map(analysis => {
    const roleData: Record<string, number> = {};
    
    Object.entries(analysis.requirements).forEach(([role, data]) => {
      roleData[role] = data.actual;
    });
    
    return {
      name: periodLabels[analysis.period],
      period: analysis.period,
      overall: analysis.overall,
      ...roleData
    };
  });

  // Get all role names from the analysis
  const roles = Array.from(
    new Set(
      staffingAnalysis.flatMap(analysis => 
        Object.keys(analysis.requirements)
      )
    )
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Staffing Analysis by Time Period</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer 
          config={{}}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend 
                content={<ChartLegendContent />} 
                verticalAlign="top"
              />
              {roles.map((role, index) => (
                <Bar 
                  key={role} 
                  dataKey={role} 
                  stackId="a" 
                  name={role}
                >
                  {chartData.map((entry, index) => {
                    const status = entry.overall;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={statusColors[status]} 
                        opacity={0.7 + (index * 0.1)} 
                      />
                    );
                  })}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs">Understaffed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs">Optimal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span className="text-xs">Overstaffed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffingChart;
