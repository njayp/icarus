.PHONY: build
build:
	go build -o output/icarus ./cmd/main.go
	
.PHONY: test
test:
# -timeout 10m
	go test -v ./...

.PHONY: gen
gen: gen-go

.PHONY: gen-go
gen-go:
	go get -u ./...
	go mod tidy
	go generate ./...
	
.PHONY: helm
helm: 
	helm install icarus ./charts/icarus

.PHONY: uhelm
uhelm: 
	helm uninstall icarus