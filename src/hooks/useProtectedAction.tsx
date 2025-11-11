import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PendingAction {
  type: 'apply_internship' | 'register_event' | 'register_workshop' | 'register_hackathon' | 'apply_placement' | 'apply_mentorship' | 'apply_research';
  data?: any;
}

export const useProtectedAction = () => {
  const { user, session } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const executeProtectedAction = useCallback((
    actionType: PendingAction['type'],
    actionData: any,
    callback: () => void
  ) => {
    if (!user || !session) {
      // Store the pending action
      setPendingAction({ type: actionType, data: actionData });
      setShowAuthModal(true);
      
      // Store in localStorage for persistence across page refreshes
      localStorage.setItem('pendingAction', JSON.stringify({ type: actionType, data: actionData }));
    } else {
      // User is authenticated, execute the action immediately
      callback();
    }
  }, [user, session]);

  const completePendingAction = useCallback((callback: (action: PendingAction) => void) => {
    // Check for pending action in localStorage
    const storedAction = localStorage.getItem('pendingAction');
    if (storedAction) {
      try {
        const action = JSON.parse(storedAction) as PendingAction;
        localStorage.removeItem('pendingAction');
        callback(action);
      } catch (error) {
        console.error('Failed to parse pending action:', error);
        localStorage.removeItem('pendingAction');
      }
    } else if (pendingAction) {
      callback(pendingAction);
      setPendingAction(null);
    }
  }, [pendingAction]);

  const clearPendingAction = useCallback(() => {
    setPendingAction(null);
    localStorage.removeItem('pendingAction');
    setShowAuthModal(false);
  }, []);

  return {
    showAuthModal,
    setShowAuthModal,
    pendingAction,
    executeProtectedAction,
    completePendingAction,
    clearPendingAction,
  };
};
