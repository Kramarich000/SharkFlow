import { Suspense, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import Page from './common/ui/Page';
import Loader from './common/ui/Loader';
import { ToastContainer } from 'react-toastify';
import { useResponsive } from './common/hooks/useResponsive';
import PrivateRoute from './common/route-auth/PrivateRoute';
import { PublicRoute } from 'common/route-auth/PublicRoute';
import Header from './common/ui/Header';
import Footer from './common/ui/Footer';
import { useAuthTokenRefresh } from 'features/auth/hooks/useAuthTokenRefresh';
import { useSocket } from 'common/hooks/useSocket';
import { useAuthStore } from 'features/auth/store/authStore';
import BackToTop from 'common/ui/BackToTop';
import { getUser } from 'features/user/api/getUser';
import LogoutUserModal from 'features/user/modals/LogoutUserModal';
import { blockedPublicPaths } from '@config/blockedPublicPaths';
import useUserStore from 'features/user/store/userStore';
import ModalManager from './common/ui/ModalManager';

function App() {
  const { setUser } = useUserStore.getState();
  const { isAuthLoading } = useAuthTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);

  const greeted = useRef(false);

  useEffect(() => {
    if (!accessToken || greeted.current) return;

    const fetchData = async () => {
      try {
        const data = await getUser();
        greeted.current = true;
        console.log('ivan', data);
        setUser({ login: data.login, email: data.email });
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  // useSocket(accessToken);

  const { isMobile } = useResponsive();

  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <Router>
      {/* <ErrorBoundary FallbackComponent={FallbackComponent}></ErrorBoundary> */}
      <>
        <Header />
        <main className="p-5 w-full max-w-[1280px] mx-auto grow">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    {route.private ? (
                      <>
                        <PrivateRoute>
                          <Page
                            component={route.component}
                            title={route.title}
                            description={route.description}
                          />
                        </PrivateRoute>
                      </>
                    ) : blockedPublicPaths.includes(route.path) ? (
                      <PublicRoute>
                        <Page
                          component={route.component}
                          title={route.title}
                          description={route.description}
                        />
                      </PublicRoute>
                    ) : (
                      <Page
                        component={route.component}
                        title={route.title}
                        description={route.description}
                      />
                    )}
                  </>
                }
              />
            ))}
          </Routes>
          <BackToTop />
        </main>
        <Footer />
      </>
      <Suspense fallback={<Loader />}>
        <ToastContainer
          toastClassName={`mx-auto mt-4 max-w-[90vw]`}
          // newestOnTop
          limit={isMobile ? 2 : 10}
        />
      </Suspense>
      <ModalManager />
    </Router>
  );
}

export default App;
