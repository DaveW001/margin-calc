import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, ChevronDown, ChevronUp, Star, Copy, ArrowLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Types for the summary view
interface ScenarioSummaryProps {
  scenarioId?: string;
}

// Mock data for demonstration
const MOCK_SCENARIO = {
  id: 'mock_id_1234567890',
  fullName: 'John Doe',
  roleTitle: 'Senior Developer',
  projectName: 'VA Modernization',
  staffType: 'W-2',
  clickUpLink: 'https://app.clickup.com/123456',
  workloadMode: 'Hours/Month',
  hours: 160,
  periodStartDate: new Date(2025, 0, 1), // Jan 1, 2025
  periodEndDate: new Date(2025, 11, 31), // Dec 31, 2025
  payableHoursOverride: undefined,
  salary: 150000,
  taxRate: 7.65,
  benefitsRate: 20,
  bonusRate: 10,
  hourlyRate: undefined,
  bonusType1099: undefined,
  bonusValue1099: undefined,
  billingType: 'Hourly',
  billableHours: 1800,
  billRate: 200,
  fixedFee: undefined,
  overhead: 15,
  hubzoneFee: 3,
  hubzoneResident: 'Yes',
  tags: ['proposal-ready', 'va-project'],
  scenarioGroup: 'VA Modernization Q3',
  // Calculated values
  monthlyRevenue: 36000,
  monthlyMargin: 9800,
  annualRevenue: 432000,
  annualMargin: 117600,
  annualMarginPercent: 27.2,
  // Advanced metrics
  unburdenedHourlyCost: 78.13,
  burdenDollarsPerHour: 28.13,
  burdenedHourlyCost: 106.26,
  profitPerHour: 93.74,
  profitPerHourWithHubzone: 87.74,
  requiredClientRateForTargetMargin: 141.67,
};

// Editable field component for inline editing
const EditableField: React.FC<{
  label: string;
  value: string | number;
  tooltip: string;
  prefix?: string;
  suffix?: string;
  onSave: (value: string | number) => void;
}> = ({ label, value, tooltip, prefix, suffix, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  
  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
    toast.success(`${label} updated successfully`);
  };
  
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{label}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-gray-400 cursor-help text-xs">?</span>
              </TooltipTrigger>
              <TooltipContent side="right" align="start" className="max-w-xs bg-background border text-foreground p-3">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            {prefix && (
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {prefix}
              </span>
            )}
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={cn(
                "w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors",
                prefix && "pl-7",
                suffix && "pr-7"
              )}
            />
            {suffix && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {suffix}
              </span>
            )}
          </div>
          <Button size="sm" onClick={handleSave}>Save</Button>
        </div>
      ) : (
        <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
          {prefix}{value}{suffix}
        </div>
      )}
    </div>
  );
};

// Metric display component
const MetricRow: React.FC<{
  label: string;
  value: string | number;
  tooltip: string;
  isPositive?: boolean;
  isHighlighted?: boolean;
}> = ({ label, value, tooltip, isPositive = true, isHighlighted = false }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-2">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-gray-400 cursor-help text-xs">?</span>
            </TooltipTrigger>
            <TooltipContent side="right" align="start" className="max-w-xs bg-background border text-foreground p-3">
              <p className="text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div 
        className={cn(
          "text-sm font-medium text-right px-3 py-1.5 rounded-md",
          isHighlighted && "border",
          isHighlighted && isPositive ? "bg-green-50 border-green-100" : "",
          isHighlighted && !isPositive ? "bg-red-50 border-red-100" : "",
          !isHighlighted && "bg-gray-50 border-gray-100"
        )}
      >
        {value}
      </div>
    </div>
  );
};

const ScenarioSummaryView: React.FC<ScenarioSummaryProps> = ({ scenarioId }) => {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(MOCK_SCENARIO);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real implementation, this would fetch the scenario data
  useEffect(() => {
    console.log(`Fetching scenario data for ID: ${scenarioId}`);
    // For now, we're using mock data
  }, [scenarioId]);
  
  const handleEdit = () => {
    // Navigate to the edit form
    navigate(`/scenarios/${scenarioId}/edit`);
  };
  
  const handleDuplicate = () => {
    toast.success("Scenario duplicated!");
    // This would create a new scenario and navigate to it
  };
  
  const handleUpdateScenario = (field: string, value: any) => {
    setScenario(prev => ({
      ...prev,
      [field]: value
    }));
    
    // In a real implementation, this would send a PATCH request to update the field
    console.log(`Updating ${field} to ${value}`);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  
  // Format dates for display
  const formatDateRange = () => {
    if (!scenario.periodStartDate || !scenario.periodEndDate) return 'N/A';
    return `${format(scenario.periodStartDate, 'MMM d, yyyy')} - ${format(scenario.periodEndDate, 'MMM d, yyyy')}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleFavorite}
            className={cn(
              "flex items-center gap-1",
              isFavorite ? "text-yellow-500" : "text-gray-400"
            )}
          >
            <Star className="h-4 w-4 fill-current" />
            {isFavorite ? "Favorited" : "Favorite"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDuplicate}
            className="flex items-center gap-1"
          >
            <Copy className="h-4 w-4" /> Duplicate
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleEdit}
          >
            Edit Scenario
          </Button>
        </div>
      </div>
      
      {/* Scenario Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Scenario Details</CardTitle>
          <CardDescription>
            Basic information about the scenario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <EditableField 
                label="Full Name"
                value={scenario.fullName}
                tooltip="The full name of the person being modeled."
                onSave={(value) => handleUpdateScenario('fullName', value)}
              />
              
              <EditableField 
                label="Role/Title"
                value={scenario.roleTitle}
                tooltip="The role or title of the person being modeled."
                onSave={(value) => handleUpdateScenario('roleTitle', value)}
              />
              
              <EditableField 
                label="Project Name"
                value={scenario.projectName}
                tooltip="The name of the project or proposal."
                onSave={(value) => handleUpdateScenario('projectName', value)}
              />
              
              <div className="mb-4">
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-medium">Staff Type</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                  {scenario.staffType}
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-medium">Period</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                  {formatDateRange()}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-medium">HUBZone Resident</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                  {scenario.hubzoneResident}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-medium">Tags</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {scenario.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-medium">Scenario Group</span>
                </div>
                <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                  {scenario.scenarioGroup}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Financial Inputs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Financial Inputs</CardTitle>
          <CardDescription>
            Key financial parameters for this scenario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {scenario.staffType === 'W-2' && (
              <>
                <EditableField 
                  label="Annual Salary"
                  value={scenario.salary!}
                  tooltip="The annual base salary for the W-2 employee."
                  prefix="$"
                  onSave={(value) => handleUpdateScenario('salary', Number(value))}
                />
                
                <EditableField 
                  label="Tax Rate"
                  value={scenario.taxRate!}
                  tooltip="Employer-paid payroll taxes as a percentage of salary."
                  suffix="%"
                  onSave={(value) => handleUpdateScenario('taxRate', Number(value))}
                />
                
                <EditableField 
                  label="Benefits Rate"
                  value={scenario.benefitsRate!}
                  tooltip="Employer cost for benefits as a percentage of salary."
                  suffix="%"
                  onSave={(value) => handleUpdateScenario('benefitsRate', Number(value))}
                />
                
                <EditableField 
                  label="Bonus Rate"
                  value={scenario.bonusRate!}
                  tooltip="Expected bonus as a percentage of salary for the W-2 employee."
                  suffix="%"
                  onSave={(value) => handleUpdateScenario('bonusRate', Number(value))}
                />
              </>
            )}
            
            {scenario.staffType === '1099' && (
              <>
                <EditableField 
                  label="Hourly Rate"
                  value={scenario.hourlyRate!}
                  tooltip="The hourly rate paid to the 1099 contractor."
                  prefix="$"
                  onSave={(value) => handleUpdateScenario('hourlyRate', Number(value))}
                />
                
                <div className="mb-4">
                  <div className="flex items-baseline mb-1">
                    <span className="text-sm font-medium">Bonus Type</span>
                  </div>
                  <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                    {scenario.bonusType1099 === '%' ? '% of Total Comp' : 'Fixed Dollar Amount'}
                  </div>
                </div>
                
                <EditableField 
                  label="Bonus Value"
                  value={scenario.bonusValue1099!}
                  tooltip="The bonus percentage or fixed dollar amount for the 1099 contractor."
                  prefix={scenario.bonusType1099 === '$' ? '$' : ''}
                  suffix={scenario.bonusType1099 === '%' ? '%' : ''}
                  onSave={(value) => handleUpdateScenario('bonusValue1099', Number(value))}
                />
              </>
            )}
            
            <EditableField 
              label="Billable Hours"
              value={scenario.billableHours}
              tooltip="The total number of hours that can be billed to the client over the full period."
              onSave={(value) => handleUpdateScenario('billableHours', Number(value))}
            />
            
            {scenario.billingType === 'Hourly' ? (
              <EditableField 
                label="Bill Rate"
                value={scenario.billRate!}
                tooltip="The hourly rate charged to the client under the hourly billing model."
                prefix="$"
                onSave={(value) => handleUpdateScenario('billRate', Number(value))}
              />
            ) : (
              <EditableField 
                label="Fixed Fee"
                value={scenario.fixedFee!}
                tooltip="The total fixed fee amount charged to the client under the fixed price billing model."
                prefix="$"
                onSave={(value) => handleUpdateScenario('fixedFee', Number(value))}
              />
            )}
            
            <EditableField 
              label="Overhead"
              value={scenario.overhead}
              tooltip="Percentage for general overhead costs allocated."
              suffix="%"
              onSave={(value) => handleUpdateScenario('overhead', Number(value))}
            />
            
            <EditableField 
              label="HUBZone Fee"
              value={scenario.hubzoneFee}
              tooltip="Applicable HUBZone fee as a percentage."
              suffix="%"
              onSave={(value) => handleUpdateScenario('hubzoneFee', Number(value))}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Financial Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Financial Results</CardTitle>
          <CardDescription>
            Calculated margin and revenue metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Monthly Metrics</h3>
              <MetricRow 
                label="Monthly Revenue"
                value={`$${scenario.monthlyRevenue.toLocaleString()}`}
                tooltip="Monthly revenue from the client."
              />
              <MetricRow 
                label="Monthly Margin"
                value={`$${scenario.monthlyMargin.toLocaleString()}`}
                tooltip="Monthly profit after all costs."
                isHighlighted={true}
                isPositive={scenario.monthlyMargin > 0}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Annual Metrics</h3>
              <MetricRow 
                label="Annual Revenue"
                value={`$${scenario.annualRevenue.toLocaleString()}`}
                tooltip="Annual revenue from the client."
              />
              <MetricRow 
                label="Annual Margin"
                value={`$${scenario.annualMargin.toLocaleString()}`}
                tooltip="Annual profit after all costs."
                isHighlighted={true}
                isPositive={scenario.annualMargin > 0}
              />
              <MetricRow 
                label="Annual Margin %"
                value={`${scenario.annualMarginPercent.toFixed(1)}%`}
                tooltip="Annual margin as a percentage of annual revenue."
                isHighlighted={true}
                isPositive={scenario.annualMarginPercent > 20}
              />
            </div>
            
            <div>
              <Button
                variant="ghost"
                className="flex items-center gap-1 -ml-2 text-blue-600"
                onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              >
                {showAdvancedMetrics ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Advanced Metrics
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show Advanced Metrics
                  </>
                )}
              </Button>
              
              {showAdvancedMetrics && (
                <div className="pt-2 space-y-4 border-t mt-2">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Per-Hour Metrics</h3>
                    <MetricRow 
                      label="Unburdened Hourly Cost"
                      value={`$${scenario.unburdenedHourlyCost.toFixed(2)}`}
                      tooltip="Basic hourly cost before adding any overhead or benefits."
                    />
                    <MetricRow 
                      label="Burden Dollars Per Hour"
                      value={`$${scenario.burdenDollarsPerHour.toFixed(2)}`}
                      tooltip="Additional costs per hour from taxes, benefits, etc."
                    />
                    <MetricRow 
                      label="Burdened Hourly Cost"
                      value={`$${scenario.burdenedHourlyCost.toFixed(2)}`}
                      tooltip="Total hourly cost including all overhead and benefits."
                    />
                    <MetricRow 
                      label="Profit Per Hour"
                      value={`$${scenario.profitPerHour.toFixed(2)}`}
                      tooltip="Hourly profit before HUBZone fees."
                      isHighlighted={true}
                      isPositive={scenario.profitPerHour > 0}
                    />
                    <MetricRow 
                      label="Profit Per Hour (w/HUBZone)"
                      value={`$${scenario.profitPerHourWithHubzone.toFixed(2)}`}
                      tooltip="Hourly profit after HUBZone fees."
                      isHighlighted={true}
                      isPositive={scenario.profitPerHourWithHubzone > 0}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Target Metrics</h3>
                    <MetricRow 
                      label="Required Bill Rate for Target Margin"
                      value={`$${scenario.requiredClientRateForTargetMargin.toFixed(2)}`}
                      tooltip="The bill rate required to achieve the target margin percentage."
                      isHighlighted={scenario.billRate! < scenario.requiredClientRateForTargetMargin}
                      isPositive={scenario.billRate! >= scenario.requiredClientRateForTargetMargin}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioSummaryView; 