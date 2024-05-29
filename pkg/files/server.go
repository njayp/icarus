package files

import (
	"fmt"
	"net/http"

	"github.com/njayp/icarus/pkg/config"
)

func Start() error {
	url := fmt.Sprintf("%s:%v", config.Env.FileServerAddr, config.Env.FileServerPort)
	return http.ListenAndServe(url, http.FileServer(http.Dir(config.Env.FileServerDir)))
}
