const grpc = require("@grpc/grpc-js");

const { definition_proto } = require("config");
const services = require("src/services");

const grpc_server = new grpc.Server();

grpc_server.addService(definition_proto.Definition.service, services);

module.exports = grpc_server;