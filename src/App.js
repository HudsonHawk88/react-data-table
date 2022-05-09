import React, { useState } from 'react';
import './App.css';

import DataTable from './DataTable';
import datas from './datas';
import columns from './columns';

const App = () => {
  const [ data, setData ] = useState(datas);
  return (
    <div className="App">
      <DataTable bordered={true} columns={columns} datas={data} setDatas={setData} />
    </div>
  );
}

export default App;
