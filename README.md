# parkMagnani

a [Sails](http://sailsjs.org) application


# Rotas API

Cadastro de Estacionamento  
http://localhost:1337/api/createEstacionamento

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
