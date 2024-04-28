package config

import "github.com/codingconcepts/env"

type e struct {
	FileServerAddr string `env:"ICARUS_ADDR"`
	FileServerPort int    `env:"ICARUS_PORT" default:"8080"`
	FileServerDir  string `env:"ICARUS_DIR" default:"files"`
}

func loadEnv() e {
	var e e
	err := env.Set(&e)
	if err != nil {
		panic(err)
	}
	return e
}

var Env = loadEnv()
