Apr 4, 2024

## This Blog

I finally found the time to make a website. Let's go through its creation.

### Hosting

Oracle OKE. It's managed, it's easy, it's FREE. This is a good [guide](https://me.mattscott.cloud/kubernetes-on-oracle-cloud-for-free/).

### Ingress

Instead of a traditional ingress, I decided to use Cloudflare Tunnel, as Cloudflare shields against common internet woes. It also removes the burden of a dedicated IP address. Lastly, it's managed, it's easy, it's FREE. This is a good [tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/many-cfd-one-tunnel/). I purchased my domain name through Cloudflare for easy integration.

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
This [blog post](https://hannadrehman.com/blog/enhancing-your-react-markdown-experience-with-syntax-highlighting) was truly a pleasure to find and utilize. I can only hope to be so helpful.

### Prometheus and Grafana
It was simple to include both as helm dependencies. Below is the `Chart.yaml` for this app. 

```yaml
apiVersion: v2
name: icarus
type: application
version: "0.0.1"
dependencies:
  # https://github.com/prometheus-community/helm-charts/blob/main/charts/prometheus/README.md
  - name: prometheus
    version: "^25"
    repository: https://prometheus-community.github.io/helm-charts
  # https://github.com/grafana/helm-charts/blob/main/charts/grafana/README.md
  - name: grafana
    version: "^7"
    repository: https://grafana.github.io/helm-charts
```

Then I added a `ServiceMonitor` for my cloudflare tunnel, and imported this [dashboard](https://grafana.com/grafana/dashboards/17457-cloudflare-tunnels-cloudflared/) into grafana