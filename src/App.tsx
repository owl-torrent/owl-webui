import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import React from 'react'
import { useApis } from './api/contexts/provider'
import ConnectionPage from './pages/connection.page'

const App:React.FC = () => {
  const {apis: { isConnected }, disconnect} = useApis()

  return (
    <div>
      <header>
        header
      </header>
      <main>
        <Container maxWidth="sm">
          {isConnected
            ? <div><span>connected&nbsp;</span><Button onClick={disconnect} variant="contained">Disconnect</Button></div>
            : <ConnectionPage />
          }
        </Container>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
