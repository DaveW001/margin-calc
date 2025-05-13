import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scenarioSchema, ScenarioFormData } from '@/lib/schema/scenarioSchema';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'sonner';

// Helper component for form field with label and tooltip
const FormField = ({ 
  id, 
  label, 
  tooltip, 
  children,
  className,
  error
}: { 
  id: string, 
  label: string, 
  tooltip: string, 
  children: React.ReactNode,
  className?: string,
  error?: string
}) => (
  <div className={cn("form-field space-y-2", className)}>
    <div className="flex items-baseline gap-1.5">
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
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const NewScenarioForm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ScenarioFormData>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: {
      fullName: '',
      roleTitle: '',
      projectName: '',
      staffType: 'W-2',
      clickUpLink: '',
      workloadMode: 'Hours/Month',
      hours: undefined,
      periodStartDate: new Date(),
      periodEndDate: undefined,
      payableHoursOverride: undefined,
      salary: undefined,
      taxRate: undefined,
      benefitsRate: undefined,
      bonusRate: undefined,
      hourlyRate: undefined,
      bonusType1099: undefined,
      bonusValue1099: undefined,
      billingType: 'Hourly',
      billableHours: undefined,
      billRate: undefined,
      fixedFee: undefined,
      overhead: undefined,
      hubzoneFee: undefined,
      hubzoneResident: undefined,
      tags: [],
      scenarioGroup: '',
    }
  });

  const watchedStaffType = watch('staffType');
  const watchedBillingType = watch('billingType');
  const watchedBonusType1099 = watch('bonusType1099');

  // Mock API call function
  const mockSaveScenarioApi = async (data: ScenarioFormData): Promise<{ id: string }> => {
    console.log("Mock API: Saving data...", data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a 50/50 chance of success or error for testing
        if (Math.random() > 0.5) {
          console.log("Mock API: Save successful!");
          resolve({ id: `mock_id_${Date.now()}` }); // Return a mock scenario ID
        } else {
          console.error("Mock API: Save failed!");
          reject(new Error("Simulated API error: Failed to save scenario."));
        }
      }, 1500); // Simulate 1.5 seconds network delay
    });
  };

  const onSubmit = async (data: ScenarioFormData) => { // Make onSubmit async
    // 1. Parse Tags: Convert comma-separated string to array of strings
    //    Trims whitespace and filters out empty strings.
    const parsedTags = typeof data.tags === 'string' 
      ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
      : []; // Default to empty array if tags are not a string (e.g. already an array or undefined)

    // 2. Prepare data for API (including parsed tags and numeric conversions)
    const apiData = {
      ...data,
      // Ensure numeric fields are numbers (valueAsNumber in register helps, but good to be sure)
      hours: data.hours,
      payableHoursOverride: data.payableHoursOverride ? Number(data.payableHoursOverride) : undefined,
      salary: data.salary ? Number(data.salary) : undefined,
      taxRate: data.taxRate ? Number(data.taxRate) : undefined,
      benefitsRate: data.benefitsRate ? Number(data.benefitsRate) : undefined,
      bonusRate: data.bonusRate ? Number(data.bonusRate) : undefined,
      hourlyRate: data.hourlyRate ? Number(data.hourlyRate) : undefined,
      bonusValue1099: data.bonusValue1099 ? Number(data.bonusValue1099) : undefined,
      billableHours: data.billableHours,
      billRate: data.billRate ? Number(data.billRate) : undefined,
      fixedFee: data.fixedFee ? Number(data.fixedFee) : undefined,
      overhead: data.overhead,
      hubzoneFee: data.hubzoneFee,
      hubzoneResident: data.hubzoneResident,
      tags: parsedTags, // Use the parsed array of tags
    };

    console.log("Submitting to API with (mocked):", apiData);

    try {
      // 3. Call Mock API
      const result = await mockSaveScenarioApi(apiData);
      console.log("Scenario saved successfully with mock ID:", result.id);
      toast.success("Scenario saved successfully!");
      // TODO: Phase 4: Show SUCCESS toast notification - DONE
      navigate(`/scenarios/${result.id}`); // Navigate on success
      // TODO: Phase 4: Navigate to scenario summary view (e.g., /scenarios/${result.id}) - DONE (placeholder)
    } catch (error) {
      console.error("Failed to save scenario:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save scenario. Please try again.");
      // TODO: Phase 4: Show ERROR toast notification - DONE
    }
    // isSubmitting is automatically handled by RHF resolver
  };

  const getTooltipContent = (fieldName: string): string => {
    switch (fieldName) {
      case 'fullName': return "The full name of the person being modeled.";
      case 'roleTitle': return "The role or title of the person being modeled.";
      case 'projectName': return "The name of the project or proposal.";
      case 'staffType': return "Select W-2 for employees or 1099 for contractors.";
      case 'clickUpLink': return "Optional: Link to the relevant ClickUp task or ticket for this scenario.";
      case 'workloadMode': return "Specify if hours are entered per month or for the entire year.";
      case 'hours': return "The number of hours expected per month or year, based on Workload Mode.";
      case 'period': return "The start and end dates for the scenario analysis.";
      case 'payableHoursOverride': return "Optional: Enter a different total number of payable hours for the period if it differs from calculated hours.";
      case 'salary': return "The annual base salary for the W-2 employee.";
      case 'taxRate': return "Employer-paid payroll taxes (e.g., FICA, Medicare) as a percentage of salary. Enter as a whole number (e.g., 7.65 for 7.65%). Leave blank to use default.";
      case 'benefitsRate': return "Employer cost for benefits (health, retirement, etc.) as a percentage of salary. Enter as a whole number (e.g., 20 for 20%). Leave blank to use default.";
      case 'bonusRate': return "Expected bonus as a percentage of salary for the W-2 employee. Enter as a whole number (e.g., 10 for 10%). Leave blank for no bonus.";
      case 'hourlyRate': return "The hourly rate paid to the 1099 contractor.";
      case 'bonusType1099': return "Is the bonus for the 1099 contractor a percentage of their total compensation or a fixed dollar amount?";
      case 'bonusValue1099': return "Enter the bonus percentage (e.g., 5 for 5%) or the fixed dollar amount based on the selected Bonus Type.";
      case 'billingType': return "Select how the client will be billed: hourly or a fixed price for the engagement.";
      case 'billableHours': return "The total number of hours that can be billed to the client over the full period.";
      case 'billRate': return "The hourly rate charged to the client under the hourly billing model.";
      case 'fixedFee': return "The total fixed fee amount charged to the client under the fixed price billing model.";
      case 'overhead': return "Percentage or fixed dollar amount for general overhead costs allocated. Use default if blank.";
      case 'hubzoneFee': return "Applicable HUBZone fee as a percentage or fixed dollar amount. Use default if blank.";
      case 'hubzoneResident': return "Specify if the W-2 employee resides in a HUBZone (Yes/No/TBD).";
      case 'tags': return "Add comma-separated tags for easy filtering and organization (e.g., proposal, key-hire, Q3-review).";
      case 'scenarioGroup': return "Assign this scenario to a group for comparison.";
      default: return "Tooltip information missing.";
    }
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                  id="fullName"
                  label="Full Name"
                  tooltip={getTooltipContent('fullName')}
                  error={errors.fullName?.message}
                >
                  <Input 
                    id="fullName" 
                    placeholder="e.g., John Doe" 
                    {...register("fullName")}
                  />
                </FormField>
                
                <FormField 
                  id="roleTitle"
                  label="Role/Title"
                  tooltip={getTooltipContent('roleTitle')}
                  error={errors.roleTitle?.message}
                >
                  <Input 
                    id="roleTitle" 
                    placeholder="e.g., Senior Developer" 
                    {...register("roleTitle")}
                  />
                </FormField>

                <FormField 
                  id="projectName" 
                  label="Project Name" 
                  tooltip={getTooltipContent('projectName')}
                  error={errors.projectName?.message}
                >
                  <Input 
                    id="projectName" 
                    placeholder="e.g., Project Phoenix" 
                    {...register("projectName")}
                  />
                </FormField>

                <FormField
                  id="staffType"
                  label="Staff Type"
                  tooltip={getTooltipContent('staffType')}
                  error={errors.staffType?.message}
                >
                  <Controller
                    name="staffType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger id="staffType">
                          <SelectValue placeholder="Select staff type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="W-2">W-2</SelectItem>
                          <SelectItem value="1099">1099</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>

                <FormField
                  id="clickUpLink"
                  label="ClickUp Link (Optional)"
                  tooltip={getTooltipContent('clickUpLink')}
                  error={errors.clickUpLink?.message}
                >
                  <Input
                    id="clickUpLink"
                    type="url"
                    placeholder="https://app.clickup.com/..."
                    {...register("clickUpLink")}
                  />
                </FormField>

                <FormField 
                  id="tags" 
                  label="Tags (comma-separated)" 
                  tooltip={getTooltipContent('tags')}
                  error={errors.tags?.message as string | undefined}
                >
                  <Input 
                    id="tags" 
                    placeholder="e.g., proposal, key-hire, Q3-review"
                    {...register("tags" as any)}
                  />
                </FormField>

                <FormField 
                  id="scenarioGroup" 
                  label="Scenario Group" 
                  tooltip={getTooltipContent('scenarioGroup')}
                  error={errors.scenarioGroup?.message}
                  className="pt-4 md:col-span-2"
                >
                  <Input 
                    id="scenarioGroup" 
                    placeholder="e.g., Project Phoenix Q3" 
                    {...register("scenarioGroup")}
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField 
                  id="salary" 
                  label="Annual Salary" 
                  tooltip={getTooltipContent('salary')}
                  error={errors.salary?.message}
                >
                  <div className="relative">
                    <Input 
                      id="salary" 
                      type="number" 
                      placeholder="e.g., 80000" 
                      {...register("salary", { valueAsNumber: true })}
                      className="pl-7"
                    />
                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormField>
                <FormField 
                  id="taxRate" 
                  label="Tax Rate" 
                  tooltip={getTooltipContent('taxRate')}
                  error={errors.taxRate?.message}
                >
                  <div className="relative">
                    <Input 
                      id="taxRate" 
                      type="number" 
                      placeholder="e.g., 7.65" 
                      {...register("taxRate", { valueAsNumber: true })}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="benefitsRate" 
                  label="Benefits Rate" 
                  tooltip={getTooltipContent('benefitsRate')}
                  error={errors.benefitsRate?.message}
                >
                  <div className="relative">
                    <Input 
                      id="benefitsRate" 
                      type="number" 
                      placeholder="e.g., 20" 
                      {...register("benefitsRate", { valueAsNumber: true })}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="bonusRate" 
                  label="Bonus Rate" 
                  tooltip={getTooltipContent('bonusRate')}
                  error={errors.bonusRate?.message}
                >
                  <div className="relative">
                    <Input 
                      id="bonusRate" 
                      type="number" 
                      placeholder="e.g., 10" 
                      {...register("bonusRate", { valueAsNumber: true })}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
                <FormField 
                  id="hourlyRate" 
                  label="Hourly Rate" 
                  tooltip={getTooltipContent('hourlyRate')}
                  error={errors.hourlyRate?.message}
                >
                  <div className="relative">
                    <Input 
                      id="hourlyRate" 
                      type="number" 
                      placeholder="e.g., 100" 
                      {...register("hourlyRate", { valueAsNumber: true })}
                      className="pl-7"
                    />
                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormField>
                <FormField 
                  id="bonusType1099" 
                  label="Bonus Type" 
                  tooltip={getTooltipContent('bonusType1099')}
                  error={errors.bonusType1099?.message}
                >
                  <Controller
                    name="bonusType1099"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger id="bonusType1099">
                          <SelectValue placeholder="Select bonus type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="%">% of Total Comp</SelectItem>
                          <SelectItem value="$">Fixed Dollar Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>
                <FormField 
                  id="bonusValue1099" 
                  label="Bonus Value" 
                  tooltip={getTooltipContent('bonusValue1099')}
                  error={errors.bonusValue1099?.message}
                  className="md:col-span-2"
                >
                  <div className="relative">
                    {watchedBonusType1099 === '$' && <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />} 
                    <Input 
                      id="bonusValue1099" 
                      type="number" 
                      step="0.01"
                      placeholder={watchedBonusType1099 === '%' ? "e.g., 5" : "e.g., 5000"} 
                      {...register("bonusValue1099", { valueAsNumber: true })}
                      className={cn(watchedBonusType1099 === '$' ? 'pl-7' : 'pr-7')} 
                    />
                    {watchedBonusType1099 === '%' && <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>}
                  </div>
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Time & Performance</CardTitle>
              </div>
              <CardDescription>Define the time period and workload.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <FormField
                  id="workloadMode"
                  label="Workload Mode"
                  tooltip={getTooltipContent('workloadMode')}
                  error={errors.workloadMode?.message}
                >
                  <Controller
                    name="workloadMode"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger id="workloadMode">
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hours/Month">Hours/Month</SelectItem>
                          <SelectItem value="Hours/Year">Hours/Year</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>

                <FormField 
                  id="hours" 
                  label={watch('workloadMode') === 'Hours/Year' ? 'Total Hours/Year' : 'Hours/Month'} 
                  tooltip={getTooltipContent('hours')}
                  error={errors.hours?.message}
                >
                  <Input 
                    id="hours" 
                    type="number" 
                    placeholder={watch('workloadMode') === 'Hours/Year' ? "e.g., 1920" : "e.g., 160"}
                    {...register("hours", { valueAsNumber: true })}
                  />
                </FormField>

                <FormField
                  id="periodStartDate"
                  label="Period Start Date"
                  tooltip={getTooltipContent('period')}
                  error={errors.periodStartDate?.message}
                >
                  <Controller
                    name="periodStartDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </FormField>

                <FormField
                  id="periodEndDate"
                  label="Period End Date"
                  tooltip={getTooltipContent('period')}
                  error={errors.periodEndDate?.message}
                >
                  <Controller
                    name="periodEndDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </FormField>

                <FormField 
                  id="payableHoursOverride" 
                  label="Payable Hours Override (Optional)" 
                  tooltip={getTooltipContent('payableHoursOverride')}
                  error={errors.payableHoursOverride?.message}
                  className="md:col-span-2"
                >
                  <Input 
                    id="payableHoursOverride" 
                    type="number" 
                    placeholder="e.g., 1880 (Total hours for the period)"
                    {...register("payableHoursOverride", { valueAsNumber: true })}
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>

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
                      {...register("employerTaxes")}
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
                      {...register("benefits")}
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
                      {...register("overhead")}
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
                      {...register("targetMargin")}
                      className="pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <FormField 
                id="clickUpLink" 
                label="ClickUp URL" 
                tooltip={getTooltipContent('clickUpLink')}
              >
                <Input 
                  id="clickUpLink" 
                  type="url" 
                  placeholder="https://app.clickup.com/..." 
                  {...register("clickUpLink")}
                />
              </FormField>
              <FormField 
                id="tags" 
                label="Tags (comma-separated)" 
                tooltip={getTooltipContent('tags')}
                error={errors.tags?.message as string | undefined}
              >
                <Input 
                  id="tags" 
                  placeholder="e.g., proposal, key-hire, Q3-review"
                  {...register("tags" as any)}
                />
              </FormField>
            </div>
            <FormField 
              id="scenarioGroup" 
              label="Scenario Group" 
              tooltip={getTooltipContent('scenarioGroup')}
              error={errors.scenarioGroup?.message}
            >
              <Input 
                id="scenarioGroup" 
                placeholder="e.g., Project Phoenix Q3" 
                {...register("scenarioGroup")}
              />
            </FormField>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Client Billing Inputs</CardTitle>
            </div>
            <CardDescription>Define how the client is billed for this work.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
               <FormField 
                 id="billingType" 
                 label="Billing Type" 
                 tooltip={getTooltipContent('billingType')}
                 error={errors.billingType?.message}
               >
                  <Controller
                   name="billingType"
                   control={control}
                   render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                       <SelectTrigger id="billingType">
                         <SelectValue placeholder="Select billing type" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Hourly">Hourly</SelectItem>
                         <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                       </SelectContent>
                     </Select>
                   )}
                 />
               </FormField>
               
               <FormField 
                 id="billableHours" 
                 label="Total Billable Hours (Period)" 
                 tooltip={getTooltipContent('billableHours')}
                 error={errors.billableHours?.message}
               >
                 <Input 
                   id="billableHours" 
                   type="number" 
                   placeholder="e.g., 1800"
                   {...register("billableHours", { valueAsNumber: true })}
                 />
               </FormField>

               {watchedBillingType === 'Hourly' ? (
                 <FormField 
                   id="billRate" 
                   label="Client Bill Rate ($/hr)" 
                   tooltip={getTooltipContent('billRate')}
                   error={errors.billRate?.message}
                   className="md:col-span-2"
                 >
                   <div className="relative">
                     <Input 
                       id="billRate" 
                       type="number" 
                       step="0.01"
                       placeholder="e.g., 200" 
                       {...register("billRate", { valueAsNumber: true })}
                       className="pl-7"
                     />
                     <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   </div>
                 </FormField>
               ) : (
                 <FormField 
                   id="fixedFee" 
                   label="Client Fixed Fee (Total)" 
                   tooltip={getTooltipContent('fixedFee')}
                   error={errors.fixedFee?.message}
                    className="md:col-span-2"
                 >
                   <div className="relative">
                     <Input 
                       id="fixedFee" 
                       type="number" 
                       step="0.01"
                       placeholder="e.g., 250000" 
                       {...register("fixedFee", { valueAsNumber: true })}
                       className="pl-7"
                     />
                     <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   </div>
                 </FormField>
               )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Overhead & Fees</CardTitle>
            </div>
            <CardDescription>Company-wide overhead and specific fees.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField 
                id="overhead" 
                label="Overhead (% or $)"
                tooltip={getTooltipContent('overhead')}
                error={errors.overhead?.message}
              >
                <Input 
                  id="overhead" 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 15 (for 15% or $15)" 
                  {...register("overhead", { valueAsNumber: true })}
                />
              </FormField>
              
              <FormField 
                id="hubzoneFee" 
                label="HUBZone Fee (% or $)"
                tooltip={getTooltipContent('hubzoneFee')}
                error={errors.hubzoneFee?.message}
              >
                <Input 
                  id="hubzoneFee" 
                  type="number" 
                  step="0.01"
                  placeholder="e.g., 3 (for 3% or $3)" 
                  {...register("hubzoneFee", { valueAsNumber: true })}
                />
              </FormField>

              {watchedStaffType === 'W-2' && (
                <FormField 
                  id="hubzoneResident" 
                  label="HUBZone Resident?" 
                  tooltip={getTooltipContent('hubzoneResident')}
                  error={errors.hubzoneResident?.message}
                >
                   <Controller
                    name="hubzoneResident"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <SelectTrigger id="hubzoneResident">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="TBD">TBD</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end mt-8 space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            disabled={isSubmitting}
          >
            Cancel
          </Button> 
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Scenario & View Summary'}
          </Button> 
        </div>
      </form>
    </TooltipProvider>
  );
};

export default NewScenarioForm; 