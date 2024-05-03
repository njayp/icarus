import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const random = () => Math.floor(Math.random() * 205) + 50;

const StyledCard = styled(Card)(({ theme }) => ({
    width: 200,
    height: 200,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: `rgb(${random()}, ${random()}, ${random()})`,
}));

// TODO get this automatically from files
const pages: { path: string, text: string, title: string }[] = [
    {
        title: "GRPC Header Propigation in Rust",
        text: "Use Tower and Tonic to Propigate Headers from Request to Response and from Call to Call.",
        path: "grpc-header-propigation-rust"
    },
]

export function HomePage() {
    return <Stack direction="row" flexWrap="wrap">
        {pages.map((page) => <Link to={`post/${page.path}`}>
            <StyledCard elevation={3} className="card">
                <CardHeader subheader={page.title} />
                <CardContent>
                    <Typography variant="body2">{page.text}</Typography>
                </CardContent>
            </StyledCard>
        </Link>)}
    </Stack>
}