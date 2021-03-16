import React from 'react'
import { useApis, useUpdateApiParams } from './api/contexts/provider'

function App() {
  const {connectionParams} = useApis()
  const updateApiParams = useUpdateApiParams()
  const [port, setPort] = React.useState<string>(connectionParams.port)
  const [prefix, setPrefix] = React.useState<string>(connectionParams.pathPrefix)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={(e) => {
          updateApiParams('localhost', port, false, prefix)
          e.stopPropagation()
          e.preventDefault()
        }}>
          <label>
            Port:
            <input onChange={(e) => setPort(e.target.value)} value={port} type="text" name="port" />
          </label>
          <label>
            prefix:
            <input onChange={(e) => setPrefix(e.target.value)} value={prefix} type="text" name="prefix" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  )
}

export default App
