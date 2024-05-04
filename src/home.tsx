import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { posts } from "./posts";

const random = () => Math.floor(Math.random() * 205) + 50;

const StyledCard = styled(Card)(({ theme }) => ({
    width: 200,
    height: 200,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: `rgb(${random()}, ${random()}, ${random()})`,
}));

export function HomePage() {
    return <Stack direction="row" flexWrap="wrap">
        {posts.map((page) => <Link to={`post/${page.path}`}>
            <StyledCard elevation={3} className="card">
                <CardHeader subheader={page.title} />
                <CardContent>
                    <Typography variant="body2">{page.blurb}</Typography>
                </CardContent>
            </StyledCard>
        </Link>)}
    </Stack>
}