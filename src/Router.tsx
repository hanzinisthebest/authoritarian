import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage/Home.page';
import Root from './pages/HomePage/Root';
import Loginpage from './pages/LoginPage';
import AuthoritarianPage from './pages/AuthoritarianPage';
import ConfigPage from './pages/ConfigPage';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Loginpage/>

  },
  {
    path: "/root",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
  
      },
      {
        path: "poked",
        element: <AuthoritarianPage />,
  
      },
      {
        path: "config",
        element: <ConfigPage />,
  
      }

    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
