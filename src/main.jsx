import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import App from "./App.jsx";

import { config } from "./utils/wagmi.ts";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home/Home.jsx";
import Explore from "./routes/explore/Explore.jsx";
import Rent from "./routes/rent/Rent.jsx";
import Buy from "./routes/buy/Buy.jsx";
import Manage from "./routes/manage/Manage.jsx";
import { ConnectKitProvider } from "connectkit";
import Overview from "./routes/manage/pages/overview/Overview.jsx";
import Properties from "./routes/manage/pages/overview/pages/Properties.jsx";

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
        path: "rent",
        element: <Rent />,
      },
      {
        path: "buy",
        element: <Buy />,
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
                index: true,
                element: <Properties propertyType={"rent"} />,
              },
              {
                path: "purchase",
                index: true,
                element: <Properties propertyType={"purchase"} />,
              },
            ],
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
