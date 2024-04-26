package fileserver

import (
	"fmt"
	"net/http"

	"github.com/njayp/icarus/pkg/config"
)

func Start() {
	url := fmt.Sprintf("%s:%v", config.Env.FileServerAddr, config.Env.FileServerPort)
	http.ListenAndServe(url, http.FileServer(http.Dir(config.Env.FileServerDir)))
}
