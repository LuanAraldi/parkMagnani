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
			estacionamentoAtual: ''
		};

		var query = "INSERT INTO ponto (data, area, veiculo) VALUES ('";
		query += ponto.data + "', ST_PointFromText('POINT (" + ponto.posicao.longitude + " " +  ponto.posicao.latitude + ")', 4326)," + ponto.veiculo + ")";
		query += "RETURNING id, area;"

		Ponto.query(query, [], function (err, rawResult) {
			ponto.id = rawResult.rows[0].id;
			ponto.area = rawResult.rows[0].area;
			query = "SELECT * FROM estacionamento WHERE ST_Contains('" + ponto.area + "', area)";
			Estacionamento.query(query, [], function(err, rawResult) {
				if (rawResult.rows > 0) {
					ponto.estacionamentoAtual = rawResult.rows[0].nome;
				}

				

				res.json({
					_id: ponto.id,
					data: ponto.data,
					posicao: ponto.posicao,
					veiculo: ponto.veiculo,
					estacionamentoAtual: ponto.estacionamentoAtual,
					velocidadeAbsoluta: 0
				})
			});
		});
	}

};
