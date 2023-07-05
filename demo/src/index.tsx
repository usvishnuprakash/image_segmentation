// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContextProvider from "./components/hooks/context";
import App from "./App";
import ErrorPage from "./ErrorPage";

const container = document.getElementById("root");
const root = createRoot(container!);
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);
root.render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);
