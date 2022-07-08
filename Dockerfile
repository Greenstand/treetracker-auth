#FROM golang:1.15 as builder
# `skaffold debug` sets SKAFFOLD_GO_GCFLAGS to disable compiler optimizations
#ARG SKAFFOLD_GO_GCFLAGS
#RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /app main.go

FROM node
COPY index.js .
COPY package.json .
COPY package-lock.json .
# Define GOTRACEBACK to mark this container as using the Go language runtime
# for `skaffold debug` (https://skaffold.dev/docs/workflows/debug/).
#ENV GOTRACEBACK=single
RUN npm ci
CMD ["npm", "start"]
#COPY --from=builder /app .
