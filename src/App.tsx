import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {StompRequiredRoute} from './modules/api'
import ConnectionPage from './pages/connection.page'
import NotFound from './pages/not-found'
import Dashboard from './pages/dashboard.page'
import SeedPage from './pages/seed.page'
import PageLayout from './layouts/page-layout'

const App:React.FC = () => {

  return (
    <Router>
      <PageLayout>
        <Switch>
          <Route exact path="/"><Redirect to="/seed" /></Route>
          <StompRequiredRoute exact path="/seed"><SeedPage /></StompRequiredRoute>
          <StompRequiredRoute exact path="/dashboard"><Dashboard /></StompRequiredRoute>
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/connect-api" component={ConnectionPage} />
          {/* For any other non-mapped route, lets sho the 404 page. (don't redirect user, we want the url to stay the same)*/}
          <Route><Redirect to="/404" /></Route>
        </Switch>
      </PageLayout>
    </Router>
  )
}

export default App
