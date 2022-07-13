#FROM golang:1.15 as builder
# `skaffold debug` sets SKAFFOLD_GO_GCFLAGS to disable compiler optimizations
#ARG SKAFFOLD_GO_GCFLAGS
#RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /app main.go

FROM node
COPY index.js .
COPY package.json .
COPY package-lock.json .
COPY keycloak.json .
COPY keycloak-utils.js .
# copy folder recursively
COPY keycloak-connect keycloak-connect
# Define GOTRACEBACK to mark this container as using the Go language runtime
# for `skaffold debug` (https://skaffold.dev/docs/workflows/debug/).
#ENV GOTRACEBACK=single
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm install -g cnpm
RUN cnpm ci
CMD ["npm", "start"]
#COPY --from=builder /app .
