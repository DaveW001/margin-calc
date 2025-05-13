import { z } from 'zod';

// Basic validation schema - conditional logic (W2/1099, Hourly/Fixed) will be added later using refine/superRefine
export const scenarioSchema = z.object({
  // Section 1: Person & Project Info
  fullName: z.string().min(1, { message: "Full name is required" }),
  roleTitle: z.string().min(1, { message: "Role/Title is required" }),
  projectName: z.string().min(1, { message: "Project name is required" }),
  staffType: z.enum(["W-2", "1099"], { required_error: "Staff type must be selected" }),
  clickUpLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')), // Optional, but if entered, must be a URL

  // Section 2: Time & Performance
  workloadMode: z.enum(["Hours/Month", "Hours/Year"], { required_error: "Workload mode must be selected" }),
  hours: z.number({ required_error: "Hours are required"}).positive({ message: "Hours must be positive" }),
  periodStartDate: z.date({ required_error: "Start date is required" }),
  periodEndDate: z.date({ required_error: "End date is required" }),
  payableHoursOverride: z.number().positive({ message: "Override hours must be positive" }).optional(),

  // Section 3: Compensation Inputs (Initial optional definitions)
  salary: z.number().positive({ message: "Salary must be positive" }).optional(),
  taxRate: z.number().min(0, { message: "Tax rate cannot be negative" }).max(100, { message: "Tax rate cannot exceed 100" }).optional(),
  benefitsRate: z.number().min(0, { message: "Benefits rate cannot be negative" }).max(100, { message: "Benefits rate cannot exceed 100" }).optional(),
  bonusRate: z.number().min(0, { message: "Bonus rate cannot be negative" }).max(100, { message: "Bonus rate cannot exceed 100" }).optional(),
  hourlyRate: z.number().positive({ message: "Hourly rate must be positive" }).optional(),
  bonusType1099: z.enum(["%", "$"]).optional(), // Removed required_error here, will be handled by superRefine
  bonusValue1099: z.number().positive({ message: "Bonus value must be positive" }).optional(),

  // Section 4: Client Billing Inputs (Initial optional definitions)
  billingType: z.enum(["Hourly", "Fixed Price"], { required_error: "Billing type must be selected" }),
  billableHours: z.number({ required_error: "Billable hours are required"}).positive({ message: "Billable hours must be positive" }),
  billRate: z.number().positive({ message: "Bill rate must be positive" }).optional(),
  fixedFee: z.number().positive({ message: "Fixed fee must be positive" }).optional(),

  // Section 5: Overhead & Fees
  overhead: z.number({ required_error: "Overhead is required" }).min(0, { message: "Overhead cannot be negative" }),
  hubzoneFee: z.number({ required_error: "HUBZone fee is required" }).min(0, { message: "HUBZone fee cannot be negative" }),
  hubzoneResident: z.enum(["Yes", "No", "TBD"]).optional(), // Removed required_error here, will be handled by superRefine
  employerTaxes: z.number().min(0).max(100).optional(),
  benefits: z.number().min(0).max(100).optional(),
  targetMargin: z.number().min(0).max(100).optional(),

  // Section 6: Tags & Scenario Group
  tags: z.any().optional(), // Changed to z.any() for now to match RHF register("tags" as any)
  scenarioGroup: z.string().optional(),

})
.superRefine((data, ctx) => {
  // W-2 Conditional Logic
  if (data.staffType === "W-2") {
    if (data.salary === undefined || data.salary === null || data.salary <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Salary is required for W-2 staff and must be positive.",
        path: ["salary"],
      });
    }
    if (data.taxRate === undefined || data.taxRate === null || data.taxRate < 0) { // Allow 0 but not negative
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tax rate is required for W-2 staff.",
        path: ["taxRate"],
      });
    }
    if (data.benefitsRate === undefined || data.benefitsRate === null || data.benefitsRate < 0) { // Allow 0 but not negative
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Benefits rate is required for W-2 staff.",
        path: ["benefitsRate"],
      });
    }
    // bonusRate is optional for W-2 per wireframe (no explicit required indicator)
    if (!data.hubzoneResident) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "HUBZone residency status is required for W-2 staff.",
        path: ["hubzoneResident"],
      });
    }
  }

  // 1099 Conditional Logic
  if (data.staffType === "1099") {
    if (data.hourlyRate === undefined || data.hourlyRate === null || data.hourlyRate <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Hourly rate is required for 1099 staff and must be positive.",
        path: ["hourlyRate"],
      });
    }
    if (data.bonusType1099 && (data.bonusValue1099 === undefined || data.bonusValue1099 === null || data.bonusValue1099 <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bonus value is required if Bonus Type is selected for 1099 staff, and must be positive.",
        path: ["bonusValue1099"],
      });
    }
    if (!data.bonusType1099 && data.bonusValue1099) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Bonus type must be selected if a bonus value is entered.",
            path: ["bonusType1099"],
        });
    }
  }

  // Billing Type Conditional Logic
  if (data.billingType === "Hourly") {
    if (data.billRate === undefined || data.billRate === null || data.billRate <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bill rate is required for Hourly billing type and must be positive.",
        path: ["billRate"],
      });
    }
  } else if (data.billingType === "Fixed Price") {
    if (data.fixedFee === undefined || data.fixedFee === null || data.fixedFee <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fixed fee is required for Fixed Price billing type and must be positive.",
        path: ["fixedFee"],
      });
    }
  }

  // Date Validation
  if (data.periodStartDate && data.periodEndDate && data.periodEndDate < data.periodStartDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Period end date cannot be before the start date.",
      path: ["periodEndDate"], 
    });
  }
});

// We can infer the TypeScript type from the schema
export type ScenarioFormData = z.infer<typeof scenarioSchema>; 