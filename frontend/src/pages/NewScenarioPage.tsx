import React from 'react';
import NewScenarioForm from '../components/scenarios/NewScenarioForm';

const NewScenarioPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-0 pb-2 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">Create New Scenario</h1>
      <NewScenarioForm />
    </div>
  );
};

export default NewScenarioPage; 