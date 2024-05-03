import { useLoaderData } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export const PostPage = () => {
    const text = useLoaderData() as string;

    return (
        <MarkdownRenderer className="post">{text}</MarkdownRenderer>
    );
};

// https://hannadrehman.com/blog/enhancing-your-react-markdown-experience-with-syntax-highlighting
type MarkdownRendererProps = {
    children: string;
    className?: string;
};

function MarkdownRenderer({ children: markdown, className }: MarkdownRendererProps) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className={className}
            components={{
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (
                        <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {markdown}
        </Markdown>
    );
}