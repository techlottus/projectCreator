const grpc = require("@grpc/grpc-js");

const { grpc_server } = require("src/adapters");

function main() {
  grpc_server.bindAsync(
    "0.0.0.0:3000",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("Server listening in port 3000");
      grpc_server.start();
    }
  );
}

module.exports = main;