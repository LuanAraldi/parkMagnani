/**
 * PontoController
 *
 * @description :: Server-side logic for managing Pontoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var ponto = {
			data : req.param('data'),
			posicao:req.param('posicao'),
			veiculo: req.param('veiculo'),
			id: 0,
			area: '',
			estacionamentoAtual: '',
			velocidade: 0
		};

		var query = "INSERT INTO ponto (data, area, veiculo) VALUES ('";
		query += ponto.data + "', ST_PointFromText('POINT (" + ponto.posicao.longitude + " " +  ponto.posicao.latitude + ")', 4326)," + ponto.veiculo + ")";
		query += "RETURNING id, area;"

		Ponto.query(query, [], function (err, rawResult) {
			if (rawResult.rowCount > 0) {
				ponto.id = rawResult.rows[0].id;
				ponto.area = rawResult.rows[0].area;
				// Verifica se o ponto está em um estacionamento
				query = "SELECT * FROM estacionamento WHERE ST_Contains('" + ponto.area + "', area)";
				Estacionamento.query(query, [], function(err, rawResult) {
					var estacionado = false;
					query = "SELECT ((ST_Distance_Sphere(area,  ST_GeomFromText('POINT(" + ponto.posicao.longitude +" " + ponto.posicao.latitude +")', 4326)) / EXTRACT(MINUTE FROM ('" + ponto.data + "' - data)) * 60) * 3.6)"
					query += " as velocidade FROM ponto WHERE veiculo = " + ponto.veiculo + "AND id != " + ponto.id + " ORDER BY data DESC LIMIT 1";
					if (rawResult.rowCount > 0) {
						ponto.estacionamentoAtual = rawResult.rows[0].nome;
					}
					Ponto.query(query, [], function(err, rawResult) {
						if (err) {
						}else{
							if (rawResult.rowCount > 0) {
								ponto.velocidade = rawResult.rows[0].velocidade
							}
						}
						res.json({
							_id: ponto.id,
							data: ponto.data,
							posicao: ponto.posicao,
							veiculo: ponto.veiculo,
							estacionamentoAtual: ponto.estacionamentoAtual,
							velocidadeAbsoluta: ponto.velocidade
						})
					});
				});
			}
		});
	}

};
