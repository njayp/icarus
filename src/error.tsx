import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <img src={"/src/assets/fof.png"} alt="404 dragon" />
            <p>React router has encountered an error.</p>
            <p>
                <i>{error.status && `${error.status}: `}{error.statusText || error.message}</i>
            </p>
        </div>
    );
}