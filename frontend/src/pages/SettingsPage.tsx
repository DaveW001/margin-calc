import React from 'react';
import DefaultsForm from '../components/settings/DefaultsForm';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-0 pb-2 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">Application Default Settings</h1>
      <p className="text-muted-foreground mb-6">
        Configure the default values that will pre-fill new scenarios. These can be overridden on a per-scenario basis.
      </p>
      <DefaultsForm />
    </div>
  );
};

export default SettingsPage; 