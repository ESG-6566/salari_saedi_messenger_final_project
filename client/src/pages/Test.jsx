import { useEffect, useState } from 'react';
import Axios from 'axios'
import React from "react";
import ReactDOM from "react-dom";


function App() {
  return (
    <div className="App">
      <input type="file" id="files" class="hidden"/>
<label for="files">Select file</label>

    </div>
  );
}



export default App;