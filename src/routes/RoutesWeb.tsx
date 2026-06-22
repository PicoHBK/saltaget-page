import Header from "@/components/Header";
import Home from "@/pages/home/Home";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// La página de chat es pesada (IA + iconos): se carga bajo demanda
const AIChat = lazy(() => import("@/pages/AIChat"));

const ChatFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-300">
    <div className="h-10 w-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
  </div>
);

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <h1>FAIL HOME</h1>,
      },
      {
        path: "/chat",
        element: (
          <Suspense fallback={<ChatFallback />}>
            <AIChat />
          </Suspense>
        ),
        errorElement: <h1>FAIL LOGIN</h1>,
      },
    ],
  },
]);

function RoutesWeb() {
  return <RouterProvider router={routers} />;
}

export default RoutesWeb;
