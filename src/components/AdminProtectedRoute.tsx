import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PageLoadingFallback } from './LoadingFallback';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, session, userRole, isLoadingRole } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user || !session) {
        setIsChecking(false);
        navigate('/');
        return;
      }

      // If role is already loaded from context
      if (!isLoadingRole && userRole) {
        if (userRole === 'admin' || userRole === 'superadmin') {
          setIsAdmin(true);
        } else {
          // Redirect to appropriate dashboard
          if (userRole === 'judge') {
            navigate('/dashboard/judge');
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
          .in('role', ['admin', 'superadmin'])
          .single();

        if (error || !data) {
          // Not an admin, redirect based on actual role
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
          
          if (roleData?.role === 'judge') {
            navigate('/dashboard/judge');
          } else {
            navigate('/dashboard/student');
          }
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        navigate('/dashboard/student');
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAdminRole();
  }, [user, session, userRole, isLoadingRole, navigate]);

  if (isChecking || isLoadingRole) {
    return <PageLoadingFallback />;
  }

  if (!user || !session || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
