import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// COMMON COMPONENTS
import GlobalLoader from 'containers/common/GlobalLoader';

// PAGES
const SelectLanguage = lazy(() => import('containers/pages/selectLanguage'));
const ChatPage = lazy(() => import('containers/pages/chat'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="chat" element={<ChatPage />} />

            <Route index element={<SelectLanguage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
