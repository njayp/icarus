import { Button, ButtonBase, ButtonGroup, Stack } from "@mui/material";
import blogTitle from './assets/title.svg'
import { Link } from "react-router-dom";

export function Header() {
    const domain = "http://grafana.njayp.net"
    const path = "/public-dashboards/71bbf8240a624de2adc7e25810d6aba2";

    return <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: "1em" }}>
        <Link to="/" >
            <ButtonBase sx={{ marginLeft: "4em" }}>
                <img src={blogTitle} className="logo" />
            </ButtonBase>
        </Link>
        <ButtonGroup variant="text" aria-label="Basic button group" sx={{ marginRight: "1em" }}>
            <Link to="/">
                <Button>Home</Button>
            </Link>
            <Button href={`${domain}${path}`}>Metrics</Button>
        </ButtonGroup>
    </Stack >
}