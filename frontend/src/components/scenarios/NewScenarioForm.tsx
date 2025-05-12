import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import FormSection from './FormSection';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Checkbox } from "@/components/ui/checkbox";

// Helper component for form field with label and tooltip
const FormField = ({ 
  id, 
  label, 
  tooltip, 
  children 
}: { 
  id: string, 
  label: string, 
  tooltip: string, 
  children: React.ReactNode 
}) => (
  <div className="form-field">
    <div className="flex items-center gap-1.5 mb-2">
      <Label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-900"
      >
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="right" align="start" className="max-w-xs bg-white p-3 text-gray-800">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    {children}
  </div>
);

const NewScenarioForm: React.FC = () => {
  const [staffType, setStaffType] = useState<'W2' | '1099'>('W2');
  const [workloadMode, setWorkloadMode] = useState<'monthly' | 'yearly'>('monthly');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    {
      from: new Date(),
      to: undefined,
    }
  );
  // Compensation State
  const [salary, setSalary] = useState<string>(''); // W2
  const [taxRate, setTaxRate] = useState<string>(''); // W2 - Employer taxes like FICA/Medicare
  const [benefitsRate, setBenefitsRate] = useState<string>(''); // W2
  const [w2BonusRate, setW2BonusRate] = useState<string>(''); // W2
  const [hourlyRate, setHourlyRate] = useState<string>(''); // 1099
  const [bonusType1099, setBonusType1099] = useState<'percent' | 'fixed'>('percent'); // 1099
  const [bonusValue1099, setBonusValue1099] = useState<string>(''); // 1099
  // TODO: Add state for hours, payableHoursOverride, billingType, etc.
  const [hours, setHours] = useState<string>('');
  const [payableHoursOverride, setPayableHoursOverride] = useState<string>('');
  // Billing State
  const [billingType, setBillingType] = useState<'T&M' | 'FixedFee'>('T&M');
  const [billableRate, setBillableRate] = useState<string>('');
  const [fixedFeeAmount, setFixedFeeAmount] = useState<string>('');
  const [billableHoursOverride, setBillableHoursOverride] = useState<string>('');
  // Overhead & Fees State
  const [overheadAllocation, setOverheadAllocation] = useState<string>('');
  const [hubzoneFee, setHubzoneFee] = useState<string>('');
  const [isHubzoneResident, setIsHubzoneResident] = useState<boolean>(false);
  // Tags & Group State
  const [tags, setTags] = useState<string>(''); // Comma-separated for now
  const [scenarioGroup, setScenarioGroup] = useState<string>('');

  const getTooltipContent = (fieldName: string): string => {
    switch (fieldName) {
      // Person & Project Info
      case 'fullName': return "The full name of the person being modeled.";
      case 'role': return "The role or title for this person on the project.";
      case 'projectName': return "The name of the project or proposal.";
      case 'staffType': return "Select W-2 for employees or 1099 for contractors.";
      case 'clickupLink': return "Optional: Link to the relevant ClickUp task or ticket.";
      // Time & Performance
      case 'workloadMode': return "Calculate costs based on monthly or total annual hours.";
      case 'hours': return "The number of hours expected per month or year, based on Workload Mode.";
      case 'period': return "The start and end dates for the scenario analysis.";
      case 'payableHoursOverride': return "Optional: Enter a different number of hours used for cost calculation if it differs from the Workload hours.";
      // Compensation Inputs
      case 'salary': return "The annual base salary for the W-2 employee.";
      case 'taxRate': return "Employer-paid payroll taxes (e.g., FICA, Medicare) as a percentage of salary. Enter as a whole number (e.g., 7.65 for 7.65%).";
      case 'benefitsRate': return "Employer cost for benefits (health, retirement, etc.) as a percentage of salary. Enter as a whole number (e.g., 20 for 20%).";
      case 'w2BonusRate': return "Expected bonus as a percentage of salary for the W-2 employee. Enter as a whole number (e.g., 10 for 10%).";
      case 'hourlyRate': return "The hourly rate paid to the 1099 contractor.";
      case 'bonusType1099': return "Is the bonus for the 1099 contractor a percentage of their total compensation or a fixed dollar amount?";
      case 'bonusValue1099': return "Enter the bonus percentage (e.g., 5 for 5%) or the fixed dollar amount based on the selected Bonus Type.";
      // Billing Inputs
      case 'billingType': return "Select Time & Materials (T&M) or Fixed Fee.";
      case 'billableRate': return "The hourly rate charged to the client for T&M billing.";
      case 'fixedFeeAmount': return "The total fixed fee amount charged to the client.";
      case 'billableHoursOverride': return "Optional: Enter a different number of hours used for billing if it differs from Workload/Payable hours.";
      // Overhead & Fees
      case 'overheadAllocation': return "The percentage of general overhead costs allocated to this scenario. Enter as a whole number (e.g., 15 for 15%).";
      case 'hubzoneFee': return "Applicable HUBZone fee as a percentage. Enter as a whole number (e.g., 3 for 3%). Leave blank if not applicable.";
      case 'isHubzoneResident': return "Check this box if the person is a resident of a HUBZone.";
      // Tags & Group
      case 'tags': return "Enter comma-separated tags to categorize this scenario (e.g., proposal, backend, urgent).";
      case 'scenarioGroup': return "Assign this scenario to a specific group or initiative for organization.";
      default: return "Tooltip information missing.";
    }
  }

  return (
    <TooltipProvider>
      <form className="py-6">
        <FormSection title="Person & Project Info">
          <FormField 
            id="fullName" 
            label="Full Name" 
            tooltip={getTooltipContent('fullName')}
          >
            <Input 
              id="fullName" 
              placeholder="Enter full name" 
            />
          </FormField>

          <FormField 
            id="role" 
            label="Role/Title" 
            tooltip={getTooltipContent('role')}
          >
            <Input 
              id="role" 
              placeholder="Enter role or title" 
            />
          </FormField>

          <FormField 
            id="projectName" 
            label="Project Name" 
            tooltip={getTooltipContent('projectName')}
          >
            <Input 
              id="projectName" 
              placeholder="Enter project name" 
            />
          </FormField>

          <FormField 
            id="staffType" 
            label="Staff Type" 
            tooltip={getTooltipContent('staffType')}
          >
            <RadioGroup 
              defaultValue={staffType}
              onValueChange={(value: 'W2' | '1099') => setStaffType(value)}
              className="flex space-x-8 pt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="W2" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">W-2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1099" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">1099</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField 
            id="clickupLink" 
            label="ClickUp Link" 
            tooltip={getTooltipContent('clickupLink')}
          >
            <Input 
              id="clickupLink" 
              type="url" 
              placeholder="Optional: https://..." 
            />
          </FormField>
        </FormSection>

        <FormSection title="Time & Performance">
          <FormField 
            id="workloadMode" 
            label="Workload Mode" 
            tooltip={getTooltipContent('workloadMode')}
          >
            <RadioGroup 
              defaultValue={workloadMode}
              onValueChange={(value: 'monthly' | 'yearly') => setWorkloadMode(value)}
              className="flex space-x-8 pt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="wm1" />
                <Label htmlFor="wm1" className="cursor-pointer">Hours/Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="wm2" />
                <Label htmlFor="wm2" className="cursor-pointer">Hours/Year</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField 
            id="hours" 
            label="Hours" 
            tooltip={getTooltipContent('hours')}
          >
            <Input
              id="hours"
              type="number"
              placeholder={workloadMode === 'monthly' ? "Hours per month" : "Hours per year"}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </FormField>

          <FormField 
            id="period" 
            label="Period" 
            tooltip={getTooltipContent('period')}
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </FormField>
          
          <FormField 
            id="payableHoursOverride" 
            label="Payable Hours Override" 
            tooltip={getTooltipContent('payableHoursOverride')}
          >
            <Input
              id="payableHoursOverride"
              type="number"
              placeholder={`Optional: ${workloadMode === 'monthly' ? 'Hours/month' : 'Hours/year'}`}
              value={payableHoursOverride}
              onChange={(e) => setPayableHoursOverride(e.target.value)}
            />
          </FormField>
        </FormSection>

        <FormSection title="Compensation Inputs">
          {staffType === 'W2' ? (
            <>
              {/* W2 Compensation Fields */}
              <FormField 
                id="salary" 
                label="Annual Salary ($)" 
                tooltip={getTooltipContent('salary')}
              >
                <Input
                  id="salary"
                  type="number"
                  placeholder="e.g., 90000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </FormField>
              <FormField 
                id="taxRate" 
                label="Employer Tax Rate (%)" 
                tooltip={getTooltipContent('taxRate')}
              >
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="e.g., 7.65"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </FormField>
              <FormField 
                id="benefitsRate" 
                label="Benefits Rate (%)" 
                tooltip={getTooltipContent('benefitsRate')}
              >
                <Input
                  id="benefitsRate"
                  type="number"
                  placeholder="e.g., 20"
                  value={benefitsRate}
                  onChange={(e) => setBenefitsRate(e.target.value)}
                />
              </FormField>
              <FormField 
                id="w2BonusRate" 
                label="Bonus Rate (%)" 
                tooltip={getTooltipContent('w2BonusRate')}
              >
                <Input
                  id="w2BonusRate"
                  type="number"
                  placeholder="e.g., 10"
                  value={w2BonusRate}
                  onChange={(e) => setW2BonusRate(e.target.value)}
                />
              </FormField>
            </>
          ) : (
            <>
              {/* 1099 Compensation Fields */}
              <FormField 
                id="hourlyRate" 
                label="Hourly Rate ($)" 
                tooltip={getTooltipContent('hourlyRate')}
              >
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="e.g., 100"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </FormField>
              <FormField 
                id="bonusType1099" 
                label="Bonus Type (1099)" 
                tooltip={getTooltipContent('bonusType1099')}
              >
                <RadioGroup 
                  defaultValue={bonusType1099}
                  onValueChange={(value: 'percent' | 'fixed') => setBonusType1099(value)}
                  className="flex space-x-8 pt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percent" id="bt1" />
                    <Label htmlFor="bt1" className="cursor-pointer">Percent (%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="bt2" />
                    <Label htmlFor="bt2" className="cursor-pointer">Fixed ($)</Label>
                  </div>
                </RadioGroup>
              </FormField>
              <FormField 
                id="bonusValue1099" 
                label="Bonus Value (1099)" 
                tooltip={getTooltipContent('bonusValue1099')}
              >
                <Input
                  id="bonusValue1099"
                  type="number"
                  placeholder={bonusType1099 === 'percent' ? "e.g., 5" : "e.g., 1000"}
                  value={bonusValue1099}
                  onChange={(e) => setBonusValue1099(e.target.value)}
                />
              </FormField>
            </>
          )}
        </FormSection>

        <FormSection title="Client Billing Inputs">
          {/* Billing Type Radio */}
          <FormField 
            id="billingType" 
            label="Billing Type" 
            tooltip={getTooltipContent('billingType')}
          >
            <RadioGroup 
              defaultValue={billingType}
              onValueChange={(value: 'T&M' | 'FixedFee') => setBillingType(value)}
              className="flex space-x-8 pt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="T&M" id="btm1" />
                <Label htmlFor="btm1" className="cursor-pointer">Time & Materials</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FixedFee" id="btm2" />
                <Label htmlFor="btm2" className="cursor-pointer">Fixed Fee</Label>
              </div>
            </RadioGroup>
          </FormField>

          {/* Conditional Fields based on Billing Type */}
          {billingType === 'T&M' && (
            <FormField 
              id="billableRate" 
              label="Billable Rate ($/hr)" 
              tooltip={getTooltipContent('billableRate')}
            >
              <Input
                id="billableRate"
                type="number"
                placeholder="e.g., 150"
                value={billableRate}
                onChange={(e) => setBillableRate(e.target.value)}
              />
            </FormField>
          )}

          {billingType === 'FixedFee' && (
            <FormField 
              id="fixedFeeAmount" 
              label="Fixed Fee Amount ($)" 
              tooltip={getTooltipContent('fixedFeeAmount')}
            >
              <Input
                id="fixedFeeAmount"
                type="number"
                placeholder="e.g., 25000"
                value={fixedFeeAmount}
                onChange={(e) => setFixedFeeAmount(e.target.value)}
              />
            </FormField>
          )}

          {/* Billable Hours Override (Applies to T&M) */}
          {billingType === 'T&M' && (
            <FormField 
              id="billableHoursOverride" 
              label="Billable Hours Override" 
              tooltip={getTooltipContent('billableHoursOverride')}
            >
              <Input
                id="billableHoursOverride"
                type="number"
                placeholder={`Optional: ${workloadMode === 'monthly' ? 'Hours/month' : 'Hours/year'}`}
                value={billableHoursOverride}
                onChange={(e) => setBillableHoursOverride(e.target.value)}
              />
            </FormField>
          )}
        </FormSection>

        <FormSection title="Overhead & Fees">
          {/* Overhead Allocation (%) */}
          <FormField 
            id="overheadAllocation" 
            label="Overhead Allocation (%)" 
            tooltip={getTooltipContent('overheadAllocation')}
          >
            <Input
              id="overheadAllocation"
              type="number"
              placeholder="e.g., 15"
              value={overheadAllocation}
              onChange={(e) => setOverheadAllocation(e.target.value)}
            />
          </FormField>

          {/* HUBZone Fee (%) */}
          <FormField 
            id="hubzoneFee" 
            label="HUBZone Fee (%)" 
            tooltip={getTooltipContent('hubzoneFee')}
          >
            <Input
              id="hubzoneFee"
              type="number"
              placeholder="e.g., 3 or leave blank"
              value={hubzoneFee}
              onChange={(e) => setHubzoneFee(e.target.value)}
            />
          </FormField>

          {/* HUBZone Resident Checkbox */}
          <FormField 
            id="isHubzoneResident" 
            label="HUBZone Resident" 
            tooltip={getTooltipContent('isHubzoneResident')}
          >
            <div className="flex items-center space-x-2 h-10 pt-1">
              <Checkbox
                id="isHubzoneResident"
                checked={isHubzoneResident}
                onCheckedChange={(checked) => setIsHubzoneResident(Boolean(checked))}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor="isHubzoneResident" className="cursor-pointer">
                Yes
              </Label>
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Tags & Scenario Group">
          {/* Tags Input */}
          <FormField 
            id="tags" 
            label="Tags" 
            tooltip={getTooltipContent('tags')}
          >
            <Input
              id="tags"
              placeholder="e.g., proposal, backend, urgent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </FormField>

          {/* Scenario Group Input */}
          <FormField 
            id="scenarioGroup" 
            label="Scenario Group" 
            tooltip={getTooltipContent('scenarioGroup')}
          >
            <Input
              id="scenarioGroup"
              placeholder="e.g., Q3 Initiatives, Project Phoenix"
              value={scenarioGroup}
              onChange={(e) => setScenarioGroup(e.target.value)}
            />
          </FormField>
        </FormSection>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-4">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Save Scenario & View Summary</Button>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default NewScenarioForm; 