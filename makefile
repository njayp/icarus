.PHONY: build
build: build-go build-ts

.PHONY: build-go
build-go:
	go build -o output/icarus ./cmd/main.go

.PHONY: build-ts
build-ts:
	npm run build
		
.PHONY: test-go
test-go:
# -timeout 10m
	go test -v ./...

.PHONY: test-ts
test-ts:
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

.PHONY: secret
secret:
	kubectl create secret generic tunnel-credentials --from-file=credentials.json=${HOME}/.cloudflared/${CLOUDFLARE_TUNNEL_ID}.json

.PHONY: image-file_server
image-file_server:
	docker build -t njpowell/file_server -f ./docker/file_server/Dockerfile .

.PHONY: image-blog
image-blog:
	docker build -t njpowell/blog -f ./docker/blog/Dockerfile .

.PHONY: images
images: image-blog image-file_server

.PHONY: push-images
push-images: images
	docker push njpowell/file_server
	docker push njpowell/blog