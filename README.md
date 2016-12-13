# parkMagnani

a [Sails](http://sailsjs.org) application


# Rotas API

######Cadastro de Estacionamento  
http://localhost:1337/estacionamento/create

POST

```json
{
  "nome": "Estacionamento do zé",
  "precoPorMinuto": 12,
  "pontos": [
    {
      "latitude": 12,
      "longitude": 12
    },
    {
      "latitude": 12,
      "longitude": 12
    }
  ]
}
```

######Cadastro de Veículo
http://localhost:1337/veiculo/create

POST

```json
{
  "placa": "MKH-3799"
}
```

######Cadastro de Pontos
http://localhost:1337/ponto/create

POST

```json
{
  "data": "2016-04-29 13:30:32",
  "posicao": {
    "latitude": "-32.0232",
    "longitude": "-132.0232"
  },
  "veiculo": "id_do_veiculo"
}
```
