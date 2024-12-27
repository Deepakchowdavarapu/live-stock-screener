import React, { useState } from 'react';

const operators = [
  { value: '>', label: 'Greater than' },
  { value: '<', label: 'Less than' },
  { value: '=', label: 'Equal to' },
];

const parameters = [
  { value: 'marketCap', label: 'Market Capitalization (B)' },
  { value: 'peRatio', label: 'P/E Ratio' },
  { value: 'roe', label: 'ROE (%)' },
  { value: 'debtToEquity', label: 'Debt-to-Equity Ratio' },
  { value: 'dividendYield', label: 'Dividend Yield (%)' },
  { value: 'revenueGrowth', label: 'Revenue Growth (%)' },
  { value: 'epsGrowth', label: 'EPS Growth (%)' },
  { value: 'currentRatio', label: 'Current Ratio' },
  { value: 'grossMargin', label: 'Gross Margin (%)' },
];

const ExampleQuery = () => (
  <div className="bg-custom-light-blue border border-custom-blue-transparent rounded-lg px-7 py-5">
    <h3 className="text-lg font-medium mb-2">Custom query example</h3>
    <pre className="font-mono text-base ">
      {'marketCap > 300 AND\npeRatio < 10 AND\nroe > 20'}
    </pre>
  </div>
);

const ParametersList = () => (
  <div className="bg-gray-50 p-4 rounded-lg mt-4">
    <h3 className="text-sm font-medium text-gray-800 mb-2">Available Parameters:</h3>
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
      {parameters.map(param => (
        <div key={param.value} className="font-mono">{param.value}</div>
      ))}
    </div>
  </div>
);

export default function QueryBuilder({ onQueryChange }) {
  const [queryText, setQueryText] = useState('');

  const handleQueryTextChange = (e) => {

    // Split by 'AND' and map each condition
    const conditions = queryText
      .split(/AND/i) // Split by 'AND' (case-insensitive)
      .map(chunk => chunk.split(/\s+/).filter(Boolean)) // Split by whitespace and filter out empty strings
      .map(conditionParts => {
        if (conditionParts.length !== 3) return null; // We need exactly 3 parts: param, operator, value

        const [param, op, value] = conditionParts;
        return { 
          parameter: param.trim(), 
          operator: op.trim(), 
          value: parseFloat(value.trim()) 
        };
      })
      .filter(condition => 
        condition && // Ensure it's not null
        parameters.some(p => p.value === condition.parameter) && // Validate parameter
        operators.some(o => o.value === condition.operator) && // Validate operator
        !isNaN(condition.value) // Ensure value is a number
      );

    onQueryChange(conditions);
  };

  return (
    <div className="space-y-4 py-2 px-3">
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold text-xl'>Search Query</h1>
        <p>You can customize the query below:</p>
        <h2 className='font-semibold mb-0 mt-2'>Query</h2>
      </div>
      <div className="relative flex justify-between">
        <textarea
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Enter your query here (e.g., 'marketCap > 200')"
          className="w-2/3 h-38 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono resize-none"
        />
        <div className="w-1/3 pl-5">
          <ExampleQuery/>
        </div>
      </div>
      <button className='bg-custom-indigo py-3 px-5 rounded text-white font-semibold inline-flex gap-2' onClick={handleQueryTextChange}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
        </svg>
        RUN THIS QUERY
      </button>
      
      <ParametersList />
    </div>
  );
}