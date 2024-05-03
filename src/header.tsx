import { Button, ButtonGroup, Stack } from "@mui/material";
import blogTitle from './assets/title.svg'
import { Link } from "react-router-dom";

export function Header() {
    return <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link to="/" >
            <Button>
                <img src={blogTitle} className="logo" />
            </Button>
        </Link>
        <ButtonGroup variant="text" aria-label="Basic button group">
            <Link to="/">
                <Button>Home</Button>
            </Link>
            <a href="/resume.pdf">
                <Button>Résumé</Button>
            </a>
            <a href="https://github.com/njayp">
                <Button>GitHub</Button>
            </a>
        </ButtonGroup>
    </Stack>
}