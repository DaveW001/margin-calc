import React from 'react';
import NewScenarioForm from '../components/scenarios/NewScenarioForm';

const NewScenarioPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Scenario</h1>
      <NewScenarioForm />
    </div>
  );
};

export default NewScenarioPage; 