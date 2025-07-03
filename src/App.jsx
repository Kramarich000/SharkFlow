import { Suspense, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';

import { routes } from '@config/routes';
import { useResponsive, useSocket } from '@common/hooks';
import { PrivateRoute, PublicRoute } from '@common/route-auth';
import {
  Page,
  Loader,
  Header,
  Footer,
  BackToTop,
  ModalManager,
} from '@common/ui';
import { useAuthTokenRefresh, useAuthStore } from '@features/auth';

import { useUserStore, LogoutUserModal, getUser } from '@features/user';
import { blockedPublicPaths } from '@config/blockedPublicPaths';
import { FallbackComponent } from '@common/ui';
import { getThemeMode, applyTheme } from '@utils/theme/toggleTheme';
import { showToast } from '@utils/toast';

function App() {
  const { setUser } = useUserStore.getState();
  const { isAuthLoading } = useAuthTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setTwoFactorEnabled = useAuthStore(
    (state) => state.setTwoFactorEnabled,
  );

  // console.log(accessToken);
  // const greeted = useRef(false);

  useEffect(() => {
    applyTheme(getThemeMode());
  }, []);

  useEffect(() => {
    // if (!accessToken || greeted.current) return;
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const data = await getUser();
        // greeted.current = true;
        setUser({
          login: data.login,
          email: data.email,
          avatarUrl: data.avatarUrl,
          role: data.role,
        });
        setTwoFactorEnabled(data.twoFactorEnabled);
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
      <>
        <Header />

        <ErrorBoundary FallbackComponent={FallbackComponent}>
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
        </ErrorBoundary>
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
