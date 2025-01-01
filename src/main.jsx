import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import App from "./App.jsx";

import { config } from "./utils/wagmi.ts";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import Explore from "./routes/explore/Explore.jsx";
import Manage from "./routes/manage/Manage.jsx";
import { ConnectKitProvider } from "connectkit";
import Overview from "./routes/manage/pages/overview/Overview.jsx";
import Properties from "./routes/manage/pages/overview/pages/Properties.jsx";
import NewProperty from "./routes/manage/pages/overview/pages/newProperty/NewProperty.jsx";
import Property from "./routes/property/Property.jsx";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "property",
        index: true,
        element: <Property />,
      },
      {
        path: "manage",
        element: <Manage />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "properties",
            element: <Overview />,
            children: [
              {
                index: true,
                element: <Properties />,
              },
              {
                path: "rent",
                element: <Properties propertyType={"rent"} />,
              },
              {
                path: "purchase",
                element: <Properties propertyType={"purchase"} />,
              },
            ],
          },
          {
            path: "new",
            index: true,
            element: <NewProperty />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <RouterProvider router={router} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
