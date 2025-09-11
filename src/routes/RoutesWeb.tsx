import Header from '@/components/Header';
import AIChat from '@/pages/AIChat';
import Home from '@/pages/home/Home';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

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
          path:"/",
          element:<Home />,
          errorElement: <h1>FAIL HOME</h1>
        },
        {
          path:"/chat",
          element:<AIChat />,
          errorElement: <h1>FAIL LOGIN</h1>
        },

      ]
    }
  ]);
  
  
  function RoutesWeb() {
    return (
      <RouterProvider router={routers} />
    )
  }
  
  export default RoutesWeb