import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="px-6 py-6 border-b border-gray-200 last:border-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">{title}</h2>
      <div className="form-grid">
        {children}
      </div>
    </div>
  );
};

export default FormSection; 