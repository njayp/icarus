import { Button, ButtonGroup, Stack } from "@mui/material";
import blogTitle from './assets/title.svg'
import { Link } from "react-router-dom";

export function Header() {
    return <Stack direction="row" justifyContent="space-between" alignItems="center">
        <img src={blogTitle} className="logo" alt="Vite logo" />
        <ButtonGroup variant="text" aria-label="Basic button group">
            <Link to="/"><Button>Home</Button></Link>
            <Link to="/resume.pdf"><Button>Resume</Button></Link>
        </ButtonGroup>
    </Stack>
}