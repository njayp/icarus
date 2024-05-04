Apr 4, 2024

## This Blog

I finally found the time to make a website. Let's go through its creation.

### Hosting

Oracle OKE. It's managed. It's easy. It's FREE. [This](https://me.mattscott.cloud/kubernetes-on-oracle-cloud-for-free/) is a good tutorial.

### Ingress

Cloudflare Tunnel. It's managed. It's easy. It's FREE. Follow [this](https://developers.cloudflare.com/cloudflare-one/tutorials/many-cfd-one-tunnel/). Purchase your domain name through Cloudflare for easy integration.

### Routing

`react-router-dom` v6 is surprisingly different from previous versions. Instead of `<Route />` elements, there is a route object -- I like it. Here is my route object.

```ts
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
```

### Markdown Highlighting
[This](https://hannadrehman.com/blog/enhancing-your-react-markdown-experience-with-syntax-highlighting) blog post was truly a pleasure to find and utilize. I can only hope to be so helpful.