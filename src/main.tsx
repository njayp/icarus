import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  //RouteObject
} from "react-router-dom";
import ErrorPage from './error.tsx';
import { HomePage } from './home.tsx';
import { PostPage } from './post.tsx';
import { posts } from './posts.ts';


const fourOhFour = new Response("", {
  status: 404,
  statusText: "Not Found",
});

async function loader(data: any) {
  const post = posts.find((post) => post.path === data.params.path)
  if (!post) {
    throw fourOhFour
  }

  const resp = await fetch(post.url)
  const text = await resp.text()
  if (text.startsWith("<!doctype html>")) {
    throw fourOhFour
  }

  return text
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // App should never throw err
    children: [
      {
        // loads errorElement in <App />'s <Outlet />
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: "post/:path",
            loader: loader,
            element: <PostPage />,
          },
          {
            // throw 404 for all unspecified routes
            path: "*",
            loader: async () => { throw fourOhFour }
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
