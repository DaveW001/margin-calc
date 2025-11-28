import React from 'react';
import { useParams } from 'react-router-dom';
import ScenarioSummaryView from '../components/scenarios/ScenarioSummaryView';

const ScenarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto px-4 pt-0 pb-2 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">Scenario Summary</h1>
      <ScenarioSummaryView scenarioId={id} />
    </div>
  );
};

export default ScenarioPage; 