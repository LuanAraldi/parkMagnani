/**
 * EstacionamentoController
 *
 * @description :: Server-side logic for managing Estacionamentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var estacionamento = {
			nome : req.nome,
			precoPorMinuto : req.precoPorMinuto
		};
		res.json(req.body);
	}
};
