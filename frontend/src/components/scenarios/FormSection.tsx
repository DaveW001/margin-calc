import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
      {/* Restore grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection; 