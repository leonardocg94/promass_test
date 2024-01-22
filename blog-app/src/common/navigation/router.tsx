import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layout";
import {
  BlogEntryPage,
  BlogListPage,
  CreateBlogEntryPage,
} from "../../features/Blog/pages";
import { LoginPage } from "../../features/User/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <BlogListPage />,
      },
      {
        path: "createBlogEntry",
        element: <CreateBlogEntryPage />,
      },
      {
        path: "blogEntry/:blogEntryId",
        element: <BlogEntryPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
