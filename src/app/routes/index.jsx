import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// COMMON COMPONENTS
import GlobalLoader from 'containers/common/GlobalLoader';

// PAGES
const ChatBox = lazy(() => import('containers/pages/chatBox'));
const SelectLanguage = lazy(() => import('containers/pages/selectLanguage'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="chat" element={<ChatBox />} />

            <Route index element={<SelectLanguage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
