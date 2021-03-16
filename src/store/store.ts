import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'


export default function configureAppStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
    enhancers: []
  })

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export type RootState = ReturnType<typeof rootReducer>
