import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error.tsx';
import { HomePage } from './home.tsx';
import { PostPage } from './post.tsx';


const fourOhFour = new Response("", {
  status: 404,
  statusText: "Not Found",
});

async function loader(data: any) {
  //const contact = await getContact(params.contactId);
  // return params provided by route
  const resp = await fetch(`/${data.params.path}.md`)
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
    // App should never throw router err
    // errorElement: <ErrorPage />,
    children: [
      {
        // catches errors while routing child paths
        errorElement: <ErrorPage />,
        // all routes are child routes
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
