.PHONY: build
build: build-go build-ts

.PHONY: build-go
build-go:
	go build -o output/icarus ./cmd/main.go

.PHONY: build-ts
build-ts:
	npm run build
		
.PHONY: test-go
test:
# -timeout 10m
	go test -v ./...

.PHONY: test-ts
test:
	npm test

.PHONY: test
test: test-go test-ts

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