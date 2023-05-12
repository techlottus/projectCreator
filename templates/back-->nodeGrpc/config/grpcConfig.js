const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTOS_PATH = ["src/adapters/grpc/definition.proto"];

const definitionOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTOS_PATH, definitionOptions);
const definition_proto =
  grpc.loadPackageDefinition(packageDefinition).packageDefinition;

module.exports = { definition_proto };