const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('protos/consulta_cep.proto');
const consultaCepProto = grpc.loadPackageDefinition(packageDefinition).consulta_cep;

const cepStorage = {
  "89140-000": "Ibirama",
  "89150-000": "Presidente Getúlio",
  "88010-000": "Florianópolis",
  "88330-000": "Balneário Camboriú",
  "89201-000": "Joinville",
  "89010-000": "Blumenau",
  "88015-700": "São José",
  "88750-000": "Tubarão",
  "89500-000": "Caçador",
  "89801-000": "Chapecó",
  "88780-000": "Laguna",
  "88340-000": "Itajaí",
  "89240-000": "São Francisco do Sul",
  "88101-000": "Palhoça",
  "88400-000": "Lages",
  "88701-000": "Criciúma",
  "89260-000": "Jaraguá do Sul",
  "88070-000": "Biguaçu",
  "89160-000": "Rio do Sul",
  "89900-000": "São Miguel do Oeste"
}
const cepStorageReverse = {}
Object.entries(cepStorage).forEach(([key, value]) => {
  cepStorageReverse[value] = key; 
});

function consultaCidadePorCep(call, callback) {
  const Cep = call.request

  const nomeCidade = cepStorage[Cep.valor];

  const Cidade = {
    nome: nomeCidade
  }

  callback(null, Cidade);
}

function consultaCepPorCidade(call, callback) {
  const Cidade = call.request;

  const cepValor = cepStorageReverse[Cidade.nome];

  const Cep = {
    valor:  cepValor
  }

  callback(null, Cep);
}

function main() {
  const server = new grpc.Server();

  server.addService(consultaCepProto.Consulta.service, { consultaCepPorCidade, consultaCidadePorCep });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  console.log('Server running at http://0.0.0.0:50051');
  server.start();
}

main();
