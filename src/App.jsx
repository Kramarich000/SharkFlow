import { useState, useEffect, Suspense } from 'react';
import { useAuthStore } from '@store/authStore';
import api from '@api/api';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import Page from './components/main-components/Page';
import Loader from './components/main-components/Loader';
import { ToastContainer } from 'react-toastify';
import { useResponsive } from './hooks/useResponsive';
import PrivateRoute from './components/main-components/PrivateRoute';
import { PublicRoute } from '@components/main-components/PublicRoute';
import Header from './components/main-components/Header';
import Footer from './components/main-components/Footer';

function App() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const accessToken = useAuthStore((state) => state.accessToken);
  const blockedPublicPaths = ['/login', '/register'];
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await api.post('/refresh');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        console.log('[REFRESH] Token восстановлен при монтировании');
      } catch (err) {
        console.warn(
          '[REFRESH] Ошибка при первичном восстановлении токена:',
          err,
        );
        setAccessToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    refreshToken();
  }, [setAccessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const refreshToken = async () => {
      try {
        const response = await api.post('/refresh');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        console.log('[REFRESH] Token обновлён по таймеру');
      } catch (err) {
        console.warn('[REFRESH] Ошибка автообновления токена:', err);
        setAccessToken(null);
      }
    };

    const jitter = Math.floor(Math.random() * 120_000);
    const refreshInterval = 14 * 60 * 1000 + jitter;

    const intervalId = setInterval(() => {
      refreshToken();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [accessToken, setAccessToken]);

  const { isMobile } = useResponsive();

  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <Router>
      {/* <ErrorBoundary FallbackComponent={FallbackComponent}></ErrorBoundary> */}
      <Suspense fallback={<Loader />}>
        <Header />
        <main className="p-5 max-w-[1280px] mx-auto grow">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    {route.private ? (
                      <PrivateRoute>
                        <Page
                          component={route.component}
                          title={route.title}
                          description={route.description}
                        />
                      </PrivateRoute>
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
        </main>
        <Footer />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ToastContainer
          toastClassName={`mx-auto mt-4 max-w-[90vw]`}
          // newestOnTop
          limit={isMobile ? 1 : 10}
        />
      </Suspense>
    </Router>
  );
}

export default App;
