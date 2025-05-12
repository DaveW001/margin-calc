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
      <form className="space-y-8">
        <FormSection title="Person & Project Info">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="fullName">Full Name</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('fullName')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input id="fullName" placeholder="Enter full name" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="role">Role/Title</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('role')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input id="role" placeholder="Enter role or title" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="projectName">Project Name</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('projectName')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input id="projectName" placeholder="Enter project name" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center mb-2">
              <Label>Staff Type</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('staffType')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup 
              defaultValue={staffType}
              onValueChange={(value: 'W2' | '1099') => setStaffType(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="W2" id="r1" />
                <Label htmlFor="r1">W-2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1099" id="r2" />
                <Label htmlFor="r2">1099</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="clickupLink">ClickUp Link</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('clickupLink')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input id="clickupLink" type="url" placeholder="Optional: https://..." />
          </div>
        </FormSection>

        <FormSection title="Time & Performance">
          <div className="space-y-2">
            <div className="flex items-center mb-2">
              <Label>Workload Mode</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('workloadMode')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup 
              defaultValue={workloadMode}
              onValueChange={(value: 'monthly' | 'yearly') => setWorkloadMode(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="wm1" />
                <Label htmlFor="wm1">Hours/Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="wm2" />
                <Label htmlFor="wm2">Hours/Year</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="hours">Hours</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('hours')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="hours"
              type="number"
              placeholder={workloadMode === 'monthly' ? "Hours per month" : "Hours per year"}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className={cn("grid gap-2")}>
            <div className="flex items-center">
              <Label>Period</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('period')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
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
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="payableHoursOverride">Payable Hours Override</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('payableHoursOverride')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="payableHoursOverride"
              type="number"
              placeholder={`Optional: ${workloadMode === 'monthly' ? 'Hours/month' : 'Hours/year'}`}
              value={payableHoursOverride}
              onChange={(e) => setPayableHoursOverride(e.target.value)}
            />
          </div>
        </FormSection>

        <FormSection title="Compensation Inputs">
          {staffType === 'W2' ? (
            <>
              {/* W2 Compensation Fields */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="salary">Annual Salary ($)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('salary')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="salary"
                  type="number"
                  placeholder="e.g., 90000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="taxRate">Employer Tax Rate (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('taxRate')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="e.g., 7.65"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="benefitsRate">Benefits Rate (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('benefitsRate')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="benefitsRate"
                  type="number"
                  placeholder="e.g., 20"
                  value={benefitsRate}
                  onChange={(e) => setBenefitsRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="w2BonusRate">Bonus Rate (%)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('w2BonusRate')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="w2BonusRate"
                  type="number"
                  placeholder="e.g., 10"
                  value={w2BonusRate}
                  onChange={(e) => setW2BonusRate(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              {/* 1099 Compensation Fields */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('hourlyRate')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="e.g., 100"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center mb-2">
                  <Label>Bonus Type (1099)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('bonusType1099')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <RadioGroup 
                  defaultValue={bonusType1099}
                  onValueChange={(value: 'percent' | 'fixed') => setBonusType1099(value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percent" id="bt1" />
                    <Label htmlFor="bt1">Percent (%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="bt2" />
                    <Label htmlFor="bt2">Fixed ($)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="bonusValue1099">Bonus Value (1099)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getTooltipContent('bonusValue1099')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="bonusValue1099"
                  type="number"
                  placeholder={bonusType1099 === 'percent' ? "e.g., 5" : "e.g., 1000"}
                  value={bonusValue1099}
                  onChange={(e) => setBonusValue1099(e.target.value)}
                />
              </div>
            </>
          )}
        </FormSection>

        <FormSection title="Client Billing Inputs">
          {/* Billing Type Radio */}
          <div className="space-y-2">
            <div className="flex items-center mb-2">
              <Label>Billing Type</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('billingType')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup 
              defaultValue={billingType}
              onValueChange={(value: 'T&M' | 'FixedFee') => setBillingType(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="T&M" id="btm1" />
                <Label htmlFor="btm1">Time & Materials</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FixedFee" id="btm2" />
                <Label htmlFor="btm2">Fixed Fee</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Fields based on Billing Type */}
          {billingType === 'T&M' && (
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="billableRate">Billable Rate ($/hr)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getTooltipContent('billableRate')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="billableRate"
                type="number"
                placeholder="e.g., 150"
                value={billableRate}
                onChange={(e) => setBillableRate(e.target.value)}
              />
            </div>
          )}

          {billingType === 'FixedFee' && (
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="fixedFeeAmount">Fixed Fee Amount ($)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getTooltipContent('fixedFeeAmount')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="fixedFeeAmount"
                type="number"
                placeholder="e.g., 25000"
                value={fixedFeeAmount}
                onChange={(e) => setFixedFeeAmount(e.target.value)}
              />
            </div>
          )}

          {/* Billable Hours Override (Applies to T&M) */}
          {billingType === 'T&M' && (
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="billableHoursOverride">Billable Hours Override</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getTooltipContent('billableHoursOverride')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="billableHoursOverride"
                type="number"
                placeholder={`Optional: ${workloadMode === 'monthly' ? 'Hours/month' : 'Hours/year'}`}
                value={billableHoursOverride}
                onChange={(e) => setBillableHoursOverride(e.target.value)}
              />
            </div>
          )}
        </FormSection>
        <FormSection title="Overhead & Fees">
          {/* Overhead Allocation (%) */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="overheadAllocation">Overhead Allocation (%)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('overheadAllocation')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="overheadAllocation"
              type="number"
              placeholder="e.g., 15"
              value={overheadAllocation}
              onChange={(e) => setOverheadAllocation(e.target.value)}
            />
          </div>

          {/* HUBZone Fee (%) */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="hubzoneFee">HUBZone Fee (%)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('hubzoneFee')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="hubzoneFee"
              type="number"
              placeholder="e.g., 3 or leave blank"
              value={hubzoneFee}
              onChange={(e) => setHubzoneFee(e.target.value)}
            />
          </div>

          {/* HUBZone Resident Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isHubzoneResident"
              checked={isHubzoneResident}
              onCheckedChange={(checked) => setIsHubzoneResident(Boolean(checked))}
            />
            <div className="flex items-center">
              <Label htmlFor="isHubzoneResident" className="cursor-pointer">
                HUBZone Resident
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('isHubzoneResident')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </FormSection>
        <FormSection title="Tags & Scenario Group">
          {/* Tags Input */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="tags">Tags</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('tags')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="tags"
              placeholder="e.g., proposal, backend, urgent"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Scenario Group Input */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="scenarioGroup">Scenario Group</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTooltipContent('scenarioGroup')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="scenarioGroup"
              placeholder="e.g., Q3 Initiatives, Project Phoenix"
              value={scenarioGroup}
              onChange={(e) => setScenarioGroup(e.target.value)}
            />
          </div>
        </FormSection>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Scenario & View Summary</Button>
        </div>
      </form>
    </TooltipProvider>
  );
};

export default NewScenarioForm; 