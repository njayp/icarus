import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

// TODO get this automatically from files
const pages: { path: string }[] = [
    {
        path: "testo"
    }
]

export function HomePage() {
    return <>
        {pages.map((page) => {
            return <Link to={`post/${page.path}`}><DemoPaper>{page.path}</DemoPaper></Link>
        })}
    </>
}