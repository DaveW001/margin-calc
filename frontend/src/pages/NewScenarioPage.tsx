import React from 'react';
import NewScenarioForm from '../components/scenarios/NewScenarioForm';

const NewScenarioPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Create New Scenario</h1>
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <NewScenarioForm />
      </div>
    </div>
  );
};

export default NewScenarioPage; 