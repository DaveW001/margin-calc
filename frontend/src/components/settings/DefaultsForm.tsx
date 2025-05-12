import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, DollarSign, Percent } from 'lucide-react';
import { cn } from "@/lib/utils";

// Reusing FormField helper might be better imported from a shared location later
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

const DefaultsForm: React.FC = () => {
  // State for default values
  const [payableHours, setPayableHours] = useState<string>(\'\');
  const [billableHours, setBillableHours] = useState<string>(\'\');
  const [billingModel, setBillingModel] = useState<\'Hourly\' | \'Fixed Price\' | \'\'>(\'\');
  const [bonusPercent, setBonusPercent] = useState<string>(\'\');
  const [employerTaxesPercent, setEmployerTaxesPercent] = useState<string>(\'\');
  const [benefitsPercent, setBenefitsPercent] = useState<string>(\'\');
  const [overheadPercent, setOverheadPercent] = useState<string>(\'\');
  const [targetMarginPercent, setTargetMarginPercent] = useState<string>(\'\');

  // TODO: Add useEffect hook here later to fetch defaults from API
  // useEffect(() => { fetchDefaults(); }, []);

  // TODO: Add save handler later
  const handleSave = () => {
    console.log(\"Saving defaults...", { payableHours, billableHours, /* etc */ });
    // Call API to save defaults
  };

  const getTooltipContent = (fieldName: string): string => {
    switch (fieldName) {
      case \'payableHours\': return \"Default monthly hours used for staff cost calculations.\";
      case \'billableHours\': return \"Default monthly hours billed to the client.\";
      case \'billingModel\': return \"Default billing model for new scenarios (Hourly or Fixed Price).\";
      case \'bonusPercent\': return \"Default bonus percentage assumed for W-2 staff.\";
      case \'employerTaxes\': return \"Default employer taxes (e.g., FICA) percentage.\";
      case \'benefitsPercent\': return \"Default benefits cost as a percentage of salary.\";
      case \'overheadPercent\': return \"Default overhead allocation percentage.\";
      case \'targetMargin\': return \"Default target profit margin percentage.\";
      default: return \"Tooltip missing.\";
    }
  }

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Default Financial Assumptions</CardTitle> */}
        {/* <CardDescription>Set the baseline values for new scenarios.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          
          <FormField 
            id=\"payableHours\" 
            label=\"Staff Payable Hours/Month\" 
            tooltip={getTooltipContent(\'payableHours\')}
          >
            <Input 
              id=\"payableHours\" 
              type=\"number\" 
              placeholder=\"e.g., 160\" 
              value={payableHours}
              onChange={(e) => setPayableHours(e.target.value)}
            />
          </FormField>

          <FormField 
            id=\"billableHours\" 
            label=\"Client Billable Hours/Month\" 
            tooltip={getTooltipContent(\'billableHours\')}
          >
            <Input 
              id=\"billableHours\" 
              type=\"number\" 
              placeholder=\"e.g., 160\" 
              value={billableHours}
              onChange={(e) => setBillableHours(e.target.value)}
            />
          </FormField>

          <FormField 
            id=\"billingModel\" 
            label=\"Billing Model\" 
            tooltip={getTooltipContent(\'billingModel\')}
          >
             <Select 
              value={billingModel} 
              onValueChange={(value: \'Hourly\' | \'Fixed Price\' | \'\') => setBillingModel(value)}
             >
              <SelectTrigger id=\"billingModel\">
                <SelectValue placeholder=\"Select default model\" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=\"Hourly\">Hourly</SelectItem>
                <SelectItem value=\"Fixed Price\">Fixed Price</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          
          <FormField 
            id=\"bonusPercent\" 
            label=\"Bonus %\" 
            tooltip={getTooltipContent(\'bonusPercent\')}
          >
            <div className=\"relative\">
              <Input 
                id=\"bonusPercent\" 
                type=\"number\" 
                placeholder=\"e.g., 5\" 
                value={bonusPercent}
                onChange={(e) => setBonusPercent(e.target.value)}
                className=\"pr-7\"
              />
              <span className=\"absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground\">%</span>
            </div>
          </FormField>

          <FormField 
            id=\"employerTaxes\" 
            label=\"Employer Taxes %\" 
            tooltip={getTooltipContent(\'employerTaxes\')}
          >
            <div className=\"relative\">
              <Input 
                id=\"employerTaxes\" 
                type=\"number\" 
                placeholder=\"e.g., 7.65\" 
                value={employerTaxesPercent}
                onChange={(e) => setEmployerTaxesPercent(e.target.value)}
                className=\"pr-7\"
              />
              <span className=\"absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground\">%</span>
            </div>
          </FormField>

          <FormField 
            id=\"benefitsPercent\" 
            label=\"Benefits %\" 
            tooltip={getTooltipContent(\'benefitsPercent\')}
          >
            <div className=\"relative\">
              <Input 
                id=\"benefitsPercent\" 
                type=\"number\" 
                placeholder=\"e.g., 15\" 
                value={benefitsPercent}
                onChange={(e) => setBenefitsPercent(e.target.value)}
                className=\"pr-7\"
              />
              <span className=\"absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground\">%</span>
            </div>
          </FormField>

           <FormField 
            id=\"overheadPercent\" 
            label=\"Overhead %\" 
            tooltip={getTooltipContent(\'overheadPercent\')}
          >
            <div className=\"relative\">
              <Input 
                id=\"overheadPercent\" 
                type=\"number\" 
                placeholder=\"e.g., 20\" 
                value={overheadPercent}
                onChange={(e) => setOverheadPercent(e.target.value)}
                className=\"pr-7\"
              />
              <span className=\"absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground\">%</span>
            </div>
          </FormField>

          <FormField 
            id=\"targetMargin\" 
            label=\"Target Margin %\" 
            tooltip={getTooltipContent(\'targetMargin\')}
          >
            <div className=\"relative\">
              <Input 
                id=\"targetMargin\" 
                type=\"number\" 
                placeholder=\"e.g., 25\" 
                value={targetMarginPercent}
                onChange={(e) => setTargetMarginPercent(e.target.value)}
                className=\"pr-7\"
              />
              <span className=\"absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground\">%</span>
            </div>
          </FormField>

        </div>
        <div className=\"flex justify-end pt-6\"><Button onClick={handleSave}>Save Defaults</Button></div>
      </CardContent>
    </Card>
  );
};

export default DefaultsForm; 