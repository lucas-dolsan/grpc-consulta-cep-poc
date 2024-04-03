// client.js
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('protos/consulta_cep.proto');
const consultaCepProto = grpc.loadPackageDefinition(packageDefinition).consulta_cep;


function exemploConsultaCidadePorCep(client) {
  const Cep = {
    valor: '89140-000'
  }

  client.consultaCidadePorCep(Cep, function(err, response) {
    const Cidade = response;

    console.log(`exemploConsultaCidadePorCep(${Cep.valor}) -> Cidade: ${Cidade.nome}`);
  });
}



function exemploConsultaCepPorCidade(client) {
  const Cidade = {
    nome: 'Presidente Getúlio'
  }

  client.consultaCepPorCidade(Cidade, function(err, response) {
    const Cep = response;

    console.log(`exemploConsultaCepPorCidade(${Cidade.nome}) -> CEP: ${Cep.valor}`);
  });
}

function main() {
  const client = new consultaCepProto.Consulta('server:50051', grpc.credentials.createInsecure());

  exemploConsultaCidadePorCep(client);
  exemploConsultaCepPorCidade(client);

}

main();
