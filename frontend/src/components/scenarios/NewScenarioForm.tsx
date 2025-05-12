import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Info, 
  Building, 
  User, 
  Clock, 
  DollarSign, 
  SlidersHorizontal, 
  Tags as TagsIcon, 
  FileText, 
  Percent 
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Helper component for form field with label and tooltip
const FormField = ({ 
  id, 
  label, 
  tooltip, 
  children,
  className
}: { 
  id: string, 
  label: string, 
  tooltip: string, 
  children: React.ReactNode,
  className?: string
}) => (
  <div className={cn("form-field", className)}>
    <div className="flex items-center gap-1.5 mb-2">
      <Label 
        htmlFor={id} 
        className="text-sm font-medium"
      >
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="right" align="start" className="max-w-xs bg-background border text-foreground p-3">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    {children}
  </div>
);

const NewScenarioForm: React.FC = () => {
  const [staffType, setStaffType] = useState<'W-2' | '1099'>('W-2');
  const [workloadMode, setWorkloadMode] = useState<'monthly' | 'yearly'>('monthly');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    {
      from: new Date(),
      to: undefined,
    }
  );
  // Compensation State
  const [salary, setSalary] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [benefitsRate, setBenefitsRate] = useState<string>('');
  const [w2BonusRate, setW2BonusRate] = useState<string>('');
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [bonusType1099, setBonusType1099] = useState<'percent' | 'fixed'>('percent');
  const [bonusValue1099, setBonusValue1099] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [payableHoursOverride, setPayableHoursOverride] = useState<string>('');
  // Billing State
  const [billingType, setBillingType] = useState<'Hourly' | 'Fixed Price'>('Hourly');
  const [billableRate, setBillableRate] = useState<string>('');
  const [fixedFeeAmount, setFixedFeeAmount] = useState<string>('');
  const [billableHoursOverride, setBillableHoursOverride] = useState<string>('');
  const [billableHours, setBillableHours] = useState<string>('160');
  // Financial Assumptions (Overrides) State - NEW
  const [employerTaxesPercent, setEmployerTaxesPercent] = useState<string>('');
  const [benefitsPercent, setBenefitsPercent] = useState<string>('');
  const [overheadPercent, setOverheadPercent] = useState<string>('');
  const [targetMarginPercent, setTargetMarginPercent] = useState<string>('');
  // Overhead & Fees State (old, may need review based on new section)
  const [overheadAllocation, setOverheadAllocation] = useState<string>('');
  const [hubzoneFee, setHubzoneFee] = useState<string>('');
  const [hubzoneResidence, setHubzoneResidence] = useState<'Yes' | 'No' | 'TBD' | ''>('');
  // Tags & Group State / Metadata State - NEW
  const [tags, setTagsValue] = useState<string>('');
  const [scenarioGroup, setScenarioGroup] = useState<string>('');
  const [clickupLink, setClickupLinkValue] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  // Added missing state from wireframe Section 1
  const [scenarioName, setScenarioName] = useState<string>('');
  const [personName, setPersonName] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [roleTitle, setRoleTitle] = useState<string>('');

  const getTooltipContent = (fieldName: string): string => {
    switch (fieldName) {
      // Scenario Details (was Person & Project Info)
      case 'scenarioName': return "Optional: A descriptive name for this scenario (e.g., John Doe - Project X - High Rate).";
      case 'personName': return "The full name of the person being modeled.";
      case 'projectName': return "The name of the project or proposal.";
      // Staff Configuration (was part of Person & Project Info + Compensation)
      case 'staffType': return "Select W-2 for employees or 1099 for contractors.";
      case 'hubzoneResidence': return "Specify if the W-2 employee resides in a HUBZone.";
      case 'salary': return "The annual base salary for the W-2 employee.";
      // Hours & Billing (was Time & Performance + Client Billing Inputs)
      case 'payableHours': return "The number of hours the staff member will be paid for per month."; 
      case 'billableHours': return "The number of hours that can be billed to the client per month."; 
      case 'billingModel': return "Select how the client will be billed: hourly or a fixed price for the engagement."; 
      case 'billRate': return "The hourly rate charged to the client under the hourly billing model."; 
      case 'fixedFee': return "The total fixed fee amount charged to the client under the fixed price billing model."; 
      // Financial Assumptions (Overrides) - NEW
      case 'employerTaxes': return "Override default employer-paid payroll taxes (e.g., FICA, Medicare) as a percentage of salary. Enter as a whole number (e.g., 7.65 for 7.65%). Leave blank for default.";
      case 'benefits': return "Override default employer cost for benefits (health, retirement, etc.) as a percentage of salary. Enter as a whole number (e.g., 20 for 20%). Leave blank for default.";
      case 'overhead': return "Override default percentage of general overhead costs allocated to this scenario. Enter as a whole number (e.g., 15 for 15%). Leave blank for default.";
      case 'targetMargin': return "Specify a target profit margin for this scenario as a percentage. This can be used for 'what-if' analysis. Enter as a whole number (e.g., 25 for 25%). Leave blank if not needed.";
      // Metadata (Optional) - NEW
      case 'clickupUrl': return "Optional: Link to the relevant ClickUp task or ticket for this scenario.";
      case 'tags': return "Add comma-separated tags for easy filtering and organization (e.g., proposal, key-hire, Q3-review).";
      case 'notes': return "Add any additional notes, comments, or context about this scenario.";
      
      // ---- Old Tooltips to review/remove ----
      case 'workloadMode': return "Calculate costs based on monthly or total annual hours.";
      case 'hours': return "The number of hours expected per month or year, based on Workload Mode.";
      case 'period': return "The start and end dates for the scenario analysis.";
      case 'payableHoursOverride': return "Optional: Enter a different number of hours used for cost calculation if it differs from the Workload hours.";
      case 'taxRate': return "Employer-paid payroll taxes (e.g., FICA, Medicare) as a percentage of salary. Enter as a whole number (e.g., 7.65 for 7.65%).";
      case 'benefitsRate': return "Employer cost for benefits (health, retirement, etc.) as a percentage of salary. Enter as a whole number (e.g., 20 for 20%).";
      case 'w2BonusRate': return "Expected bonus as a percentage of salary for the W-2 employee. Enter as a whole number (e.g., 10 for 10%).";
      case 'bonusType1099': return "Is the bonus for the 1099 contractor a percentage of their total compensation or a fixed dollar amount?";
      case 'bonusValue1099': return "Enter the bonus percentage (e.g., 5 for 5%) or the fixed dollar amount based on the selected Bonus Type.";
      case 'billableHoursOverride': return "Optional: Enter a different number of hours used for billing if it differs from Workload/Payable hours.";
      case 'overheadAllocation': return "The percentage of general overhead costs allocated to this scenario. Enter as a whole number (e.g., 15 for 15%).";
      case 'hubzoneFee': return "Applicable HUBZone fee as a percentage. Enter as a whole number (e.g., 3 for 3%). Leave blank if not applicable.";
      default: return "Tooltip information missing.";
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Grid container for first row of cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Scenario Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Scenario Details</CardTitle>
              </div>
              <CardDescription>
                Basic information to identify this scenario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Internal grid for fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                  id="scenarioName" 
                  label="Scenario Name (Optional)" 
                  tooltip={getTooltipContent('scenarioName')}
                >
                  <Input 
                    id="scenarioName" 
                    placeholder="e.g., John Doe - Project X - High Rate" 
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                  />
                </FormField>
                
                <FormField 
                  id="personName" 
                  label="Person Name" 
                  tooltip={getTooltipContent('personName')}
                >
                  <Input 
                    id="personName" 
                    placeholder="e.g., John Doe" 
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                  />
                </FormField>

                <FormField 
                  id="projectName" 
                  label="Project Name" 
                  tooltip={getTooltipContent('projectName')}
                >
                  <Input 
                    id="projectName" 
                    placeholder="e.g., Project Phoenix" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Staff Configuration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Staff Configuration</CardTitle>
              </div>
              <CardDescription>
                Details about the staff member's employment and role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Internal grid for fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                  id="staffType" 
                  label="Staff Type" 
                  tooltip={getTooltipContent('staffType')}
                >
                  <Select 
                    value={staffType} 
                    onValueChange={(value: 'W-2' | '1099') => setStaffType(value)}
                  >
                    <SelectTrigger id="staffType">
                      <SelectValue placeholder="Select staff type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="W-2">W-2</SelectItem>
                      <SelectItem value="1099">1099</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                {staffType === 'W-2' && (
                  <FormField 
                    id="hubzoneResidence"
                    label="HUBZone Residence"
                    tooltip={getTooltipContent('hubzoneResidence')}
                  >
                    <Select 
                       value={hubzoneResidence}
                       onValueChange={(value: 'Yes' | 'No' | 'TBD' | '') => setHubzoneResidence(value)}
                    >
                      <SelectTrigger id="hubzoneResidence">
                        <SelectValue placeholder="Select HUBZone residence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="TBD">TBD</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
                 {staffType === '1099' && <div className="md:block hidden"></div>} 

                {staffType === 'W-2' ? (
                  <>
                    <FormField 
                      id="salary" 
                      label="Annual Salary" 
                      tooltip={getTooltipContent('salary')}
                    >
                      <div className="relative">
                        <Input 
                          id="salary" 
                          type="number" 
                          placeholder="e.g., 80000" 
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="pl-7"
                        />
                         <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormField>
                    <FormField 
                      id="bonusPercentage" 
                      label="Bonus Percentage (Optional)" 
                      tooltip={getTooltipContent('w2BonusRate')}
                    >
                       <div className="relative">
                          <Input 
                            id="bonusPercentage" 
                            type="number" 
                            placeholder="e.g., 5" 
                            value={w2BonusRate}
                            onChange={(e) => setW2BonusRate(e.target.value)}
                            className="pr-7"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                    </FormField>
                  </>
                ) : (
                  <>
                    <FormField 
                      id="hourlyRate" 
                      label="Hourly Rate" 
                      tooltip={getTooltipContent('hourlyRate')}
                    >
                       <div className="relative">
                          <Input 
                            id="hourlyRate" 
                            type="number" 
                            placeholder="e.g., 100" 
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            className="pl-7"
                          />
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       </div>
                    </FormField>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid container for second row of cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 3: Hours & Billing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Hours & Billing</CardTitle>
              </div>
              <CardDescription>
                Define payable hours, billable hours, and client billing structure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Internal grid for fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                    id="payableHours" 
                    label="Payable Hours/Month" 
                    tooltip={getTooltipContent('payableHours')}
                  >
                    <Input 
                      id="payableHours" 
                      type="number" 
                      placeholder="160" 
                      value={hours}
                      onChange={(e) => setHours(e.target.value)} 
                    />
                  </FormField>
                   <FormField 
                    id="billableHours" 
                    label="Client Billable Hours/Month" 
                    tooltip={getTooltipContent('billableHours')}
                  >
                    <Input 
                      id="billableHours" 
                      type="number" 
                      placeholder="160" 
                      value={billableHours}
                      onChange={(e) => setBillableHours(e.target.value)}
                    />
                  </FormField>
                   <FormField 
                    id="billingModel" 
                    label="Billing Model" 
                    tooltip={getTooltipContent('billingModel')}
                  >
                     <Select 
                      value={billingType} 
                      onValueChange={(value: 'Hourly' | 'Fixed Price') => setBillingType(value)}
                     >
                      <SelectTrigger id="billingModel">
                        <SelectValue placeholder="Select billing model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  {billingType === 'Hourly' ? (
                    <FormField 
                      id="billRate" 
                      label="Client Bill Rate ($/hr)" 
                      tooltip={getTooltipContent('billRate')}
                    >
                       <div className="relative">
                          <Input 
                            id="billRate" 
                            type="number" 
                            placeholder="e.g., 150" 
                            value={billableRate}
                            onChange={(e) => setBillableRate(e.target.value)}
                            className="pl-7"
                          />
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </FormField>
                  ) : (
                    <FormField 
                      id="fixedFee" 
                      label="Client Fixed Fee" 
                      tooltip={getTooltipContent('fixedFee')}
                    >
                       <div className="relative">
                          <Input 
                            id="fixedFee" 
                            type="number" 
                            placeholder="e.g., 10000" 
                            value={fixedFeeAmount}
                            onChange={(e) => setFixedFeeAmount(e.target.value)}
                             className="pl-7"
                          />
                           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </FormField>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Financial Assumptions (Overrides) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Financial Assumptions (Overrides)</CardTitle>
              </div>
              <CardDescription>
                Override default financial percentages for this specific scenario if needed. Leave blank to use current app defaults (shown as placeholder).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Internal grid for fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                  id="employerTaxes" 
                  label="Employer Taxes %" 
                  tooltip={getTooltipContent('employerTaxes')}
                >
                  <div className="relative">
                    <Input 
                      id="employerTaxes" 
                      type="number" 
                      placeholder="7.65" 
                      value={employerTaxesPercent}
                      onChange={(e) => setEmployerTaxesPercent(e.target.value)}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="benefits" 
                  label="Benefits %" 
                  tooltip={getTooltipContent('benefits')}
                >
                  <div className="relative">
                    <Input 
                      id="benefits" 
                      type="number" 
                      placeholder="15" 
                      value={benefitsPercent}
                      onChange={(e) => setBenefitsPercent(e.target.value)}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="overhead" 
                  label="Overhead %" 
                  tooltip={getTooltipContent('overhead')}
                >
                  <div className="relative">
                    <Input 
                      id="overhead" 
                      type="number" 
                      placeholder="20" 
                      value={overheadPercent}
                      onChange={(e) => setOverheadPercent(e.target.value)}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="targetMargin" 
                  label="Target Margin %" 
                  tooltip={getTooltipContent('targetMargin')}
                >
                  <div className="relative">
                    <Input 
                      id="targetMargin" 
                      type="number" 
                      placeholder="25" 
                      value={targetMarginPercent}
                      onChange={(e) => setTargetMarginPercent(e.target.value)}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 5: Metadata (Optional) - Remains full width */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Metadata (Optional)</CardTitle>
            </div>
            <CardDescription>
              Additional information for tracking and organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Internal grid for first row of metadata fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                <FormField 
                  id="clickupUrl" 
                  label="ClickUp URL" 
                  tooltip={getTooltipContent('clickupUrl')}
                >
                  <Input 
                    id="clickupUrl" 
                    type="url" 
                    placeholder="https://app.clickup.com/..." 
                    value={clickupLink}
                    onChange={(e) => setClickupLinkValue(e.target.value)}
                  />
                </FormField>
                <FormField 
                  id="tags" 
                  label="Tags" 
                  tooltip={getTooltipContent('tags')}
                >
                  <Input 
                    id="tags" 
                    placeholder="e.g., proposal, key-hire" 
                    value={tags}
                    onChange={(e) => setTagsValue(e.target.value)}
                  />
                </FormField>
            </div>
             {/* Notes field below the grid */}
            <FormField 
              id="notes" 
              label="Notes" 
              tooltip={getTooltipContent('notes')}
            >
              <Textarea 
                id="notes" 
                placeholder="Enter notes here..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </FormField>
          </CardContent>
        </Card>
        
        {/* Buttons remain full width */}
        <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button">Cancel</Button> 
            <Button type="submit">Create Scenario</Button> 
        </div>

      </div>
    </TooltipProvider>
  );
};

export default NewScenarioForm; 