import { Suspense } from 'react';
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
import { useAuthTokenRefresh } from '@hooks/useAuthTokenRefresh';
import { useSocket } from '@hooks/useSocket';
import { useAuthStore } from '@store/authStore';
import BackToTop from '@components/main-components/BackToTop';

function App() {
  const blockedPublicPaths = ['/login', '/register'];
  useAuthTokenRefresh();
  const accessToken = useAuthStore((state) => state.accessToken);
  // useSocket(accessToken);

  const { isMobile } = useResponsive();

  return (
    <Router>
      {/* <ErrorBoundary FallbackComponent={FallbackComponent}></ErrorBoundary> */}
      <Suspense fallback={<Loader />}>
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
          <BackToTop />
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
