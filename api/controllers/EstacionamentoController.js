/**
 * EstacionamentoController
 *
 * @description :: Server-side logic for managing Estacionamentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createEstacionamento: function(req, res) {
		var teste = {
			nome : req.nome,
			precoPorMinuto : req.precoPorMinuto
		};
		res.json(req.body);
	}
};
