import React, { useState } from 'react';
import QueryBuilder from './QueryBuilder';
import StockTable from './StockTable';     

const ParentComponent = () => {
  const [queryConditions, setQueryConditions] = useState([]);

  const handleQueryChange = (conditions) => {
    setQueryConditions(conditions);
  };

  return (
    <div>
      <StockTable queryConditions={queryConditions} />
      <QueryBuilder onQueryChange={handleQueryChange} />
    </div>
  );
};

export default ParentComponent;