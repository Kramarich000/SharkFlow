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
import { useThemeStore } from '@store/themeStore';
import { getWarnings } from '@utils/browser/browserWarningsMap';
import { detectBrowserInfo } from '@utils/browser/detectBrowserInfo';
import React from 'react';
import { generateDeviceId } from '@utils/generators/generateDeviceId';

function App() {
  const { setUser } = useUserStore.getState();
  const { isAuthLoading } = useAuthTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setDeviceId = useAuthStore((state) => state.setDeviceId);

  useEffect(() => {
    let isMounted = true;

    const hasWarned = sessionStorage.getItem('browserWarningShown');
    if (hasWarned) return;

    async function checkBrowser() {
      const browserInfo = await detectBrowserInfo();
      if (!isMounted) return;

      const warnings = getWarnings(browserInfo);
      if (warnings.length > 0) {
        showToast(warnings[0], 'warning', 10000);
        sessionStorage.setItem('browserWarningShown', true);
      }
    }

    checkBrowser();

    return () => {
      isMounted = false;
      sessionStorage.removeItem('browserWarningShown');
    };
  }, []);

  const mode = useThemeStore((state) => state.mode);
  const initAutoMode = useThemeStore((state) => state.initAutoMode);

  useEffect(() => {
    applyTheme(getThemeMode());
  }, []);

  useEffect(() => {
    if (mode === 'auto') {
      initAutoMode();
    }
  }, [mode, initAutoMode]);

  useEffect(() => {
    const deviceId = generateDeviceId();
    setDeviceId(deviceId);
  }, [setDeviceId]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const data = await getUser();
        setUser({
          login: data.login,
          email: data.email,
          googleEmail: data.googleEmail,
          avatarUrl: data.avatarUrl,
          role: data.role,
          twoFactorEnabled: data.twoFactorEnabled,
          googleOAuthEnabled: data.googleOAuthEnabled,
          telegramEnabled: data.telegramEnabled,
          githubOAuthEnabled: data.githubOAuthEnabled,
          githubEmail: data.githubEmail,
        });
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
              {routes.map((route) => {
                let Wrapper = React.Fragment;
                if (route.private) Wrapper = PrivateRoute;
                else if (blockedPublicPaths.includes(route.path))
                  Wrapper = PublicRoute;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Wrapper>
                        <Page
                          component={route.component}
                          title={route.title}
                          description={route.description}
                        />
                      </Wrapper>
                    }
                  />
                );
              })}
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
