import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";


export const PostPage = () => {
    const text = useLoaderData() as string;

    return (
        <div className="post">
            <ReactMarkdown children={text} />
        </div>
    );
};

