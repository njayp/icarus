
type post = {
    path: string;
    blurb: string;
    title: string;
    url: string;
}


export const posts: post[] = [
    {
        title: "This Blog",
        blurb: "How I Created My Own Website",
        path: "this-blog",
        url: "https://raw.githubusercontent.com/njayp/icarus/main/BLOG.md",
    },
    {
        title: "gRPC Server Context Mutation",
        blurb: "Use an Interceptor to Mutate gRPC Server Contexts",
        path: "grpc-server-context-mutation",
        url: "https://raw.githubusercontent.com/njayp/gcm/main/BLOG.md",
    },
    {
        title: "gRPC Header Propagation in Rust",
        blurb: "Use Tower and Tonic to Propagate Headers from Request to Response and from Call to Call",
        path: "grpc-header-propagation-rust",
        url: "https://raw.githubusercontent.com/njayp/rust-tonic-header-propagation/main/BLOG.md",
    },
]