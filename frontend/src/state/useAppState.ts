import { useContext } from 'react';
import { AppContext, type AppState } from './appContext';

// Create a custom hook for using the context
export const useAppState = (): AppState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};