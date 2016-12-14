/**
 * EstacionamentoController
 *
 * @description :: Server-side logic for managing Estacionamentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var estacionamento = {
			nome : req.param('nome'),
			precoPorMinuto : req.param('precoPorMinuto'),
			pontos : req.param('pontos')
		};


		var query = "INSERT INTO estacionamento (nome, precoPorMinuto, area) VALUES('" + estacionamento.nome + "'," + estacionamento.precoPorMinuto + ",";
		query += "ST_PolygonFromText('POLYGON((";

		for (var i = 0; i < estacionamento.pontos.length; i++) {
			var aux = estacionamento.pontos[i];
			query += aux.longitude + " " + aux.latitude;
			if (i < (estacionamento.pontos.length - 1)) {
				query += ",";
			}
		}

		query += "))', 4326)) RETURNING id;"

		Estacionamento.query(query, [], function (err, rawResult) {
			if (err) {
			}else{
				if (rawResult.rowCount > 0) {
					estacionamento['id'] = rawResult.rows[0].id;
					res.json(estacionamento);
				}
			}
		})
	},

	proximos: function (req, res){
		var ponto = {
			latitude : req.param('latitude'),
			longitude : req.param('longitude')
		}

		var query = "SELECT nome as estacionamento,precoPorMinuto as precoPorMinuto, ST_Distance_Sphere(area,  ST_GeomFromText('POINT(" + ponto.longitude + " " + ponto.latitude + ")', 4326)) as distanciaEmMetros FROM estacionamento ORDER BY distanciaEmMetros DESC;";

		Ponto.query(query, [], function (err, rawResult) {
			res.json(rawResult.rows);
		});

	}
};
