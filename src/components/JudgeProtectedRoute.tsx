import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PageLoadingFallback } from './LoadingFallback';

interface JudgeProtectedRouteProps {
  children: ReactNode;
}

const JudgeProtectedRoute = ({ children }: JudgeProtectedRouteProps) => {
  const { user, session, userRole, isLoadingRole } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isJudge, setIsJudge] = useState(false);

  useEffect(() => {
    const checkJudgeRole = async () => {
      if (!user || !session) {
        setIsChecking(false);
        navigate('/');
        return;
      }

      // If role is already loaded from context
      if (!isLoadingRole && userRole) {
        if (userRole === 'judge') {
          setIsJudge(true);
        } else {
          // Redirect to appropriate dashboard based on role
          if (userRole === 'admin' || userRole === 'superadmin') {
            navigate('/admin');
          } else {
            navigate('/dashboard/student');
          }
        }
        setIsChecking(false);
        return;
      }

      // Fallback: check role from database
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'judge')
          .single();

        if (error || !data) {
          // Not a judge, redirect based on actual role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
          
          if (roleData?.role === 'admin' || roleData?.role === 'superadmin') {
            navigate('/admin');
          } else {
            navigate('/dashboard/student');
          }
          setIsJudge(false);
        } else {
          setIsJudge(true);
        }
      } catch (error) {
        console.error('Error checking judge role:', error);
        navigate('/dashboard/student');
        setIsJudge(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkJudgeRole();
  }, [user, session, userRole, isLoadingRole, navigate]);

  if (isChecking || isLoadingRole) {
    return <PageLoadingFallback />;
  }

  if (!user || !session || !isJudge) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default JudgeProtectedRoute;
