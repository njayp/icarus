.PHONY: gen
gen: gen-go gen-ts gen-helm

.PHONY: gen-ts
gen-ts:
	npm i
	npm run build

.PHONY: gen-go
gen-go:
	go get -u ./...
	go mod tidy
	go generate ./...
	go test -v ./...
	go build -o output/icarus ./cmd/main.go

.PHONY: run
run: gen-go
	./output/icarus

.PHONY: start
start: gen-ts
	npm run dev

.PHONY: gen-helm
gen-helm:
	helm dependency update ./charts/icarus
	helm dependency build ./charts/icarus

.PHONY: helm
helm: gen-helm
	helm install icarus ./charts/icarus

.PHONY: uhelm
uhelm: gen-helm
	helm upgrade icarus ./charts/icarus

.PHONY: secret
secret:
	kubectl create secret generic tunnel-credentials --from-file=credentials.json=${HOME}/.cloudflared/${CLOUDFLARE_TUNNEL_ID}.json

# gets grafana password
# username is admin
.PHONY: password
password:
	kubectl get secret --namespace default icarus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

REGISTRY=njpowell
BLOG_IMAGE=${REGISTRY}/blog
FILES_IMAGE=${REGISTRY}/files

.PHONY: image-files
image-files:
	docker build -t ${FILES_IMAGE} -f ./docker/files/Dockerfile .

.PHONY: image-blog
image-blog:
	docker build -t ${BLOG_IMAGE} -f ./docker/blog/Dockerfile .

.PHONY: images
images: image-blog image-files

.PHONY: push-files
push-files: image-files
	docker push ${FILES_IMAGE}

.PHONY: push-blog
push-blog: image-blog
	docker push ${BLOG_IMAGE}

.PHONY: push-images
push-images: images push-files push-blog