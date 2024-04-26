package config

import "github.com/codingconcepts/env"

type e struct {
	FileServerAddr string `env:"FILE_SERVER_ADDR"`
	FileServerPort int    `env:"FILE_SERVER_PORT" default:"8080"`
	FileServerDir  string `env:"FILE_SERVER_DIR" default:"files"`
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
