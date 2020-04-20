
var mysql = require('mysql');
const { Op } = require("sequelize");
const modelCarro = require("./models/carro");
var con = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SD',
    insecureAuth: true
};

var connection = mysql.createConnection(con);
connection.connect();

module.exports = {

    insert: async function (req) {
        return new Promise(
            async function (resolve, reject) {
                let carro = await modelCarro.create(
                    {
                        marca: req.body.marca,
                        modelo: req.body.modelo,
                        ano: req.body.ano,
                        valor: req.body.valor
                    }
                );
                let createdCarro = await modelCarro.findByPk(carro.id);
                if (createdCarro) {
                    resolve(createdCarro);
                } else {
                    reject(createdCarro);
                }
            }
        );
    },

    list: function (carro) {
        return new Promise(
            async function (resolve, reject) {
                keys = [];
                for (key in carro) {
                    keys.push(key);
                }
                if (keys.length == 0) {
                    let carros = await modelCarro.findAll();
                    return resolve(carros);
                }
                else {
                    if (keys[0] === 'id') {
                        let carros = await modelCarro.findByPk(carro.id);
                        if (carros) {
                            return resolve(carros);
                        }
                        else {
                            reject([]);
                        }
                    } else if (keys[0] === 'marca' || keys[1] === 'marca') {
                        if (keys[1] === 'modelo') {
                            let carros = await modelCarro.findAll({
                                where: {
                                    [Op.and]: [
                                        { marca: carro.marca },
                                        { modelo: carro.modelo }
                                    ]
                                }
                            });
                            return resolve(carros);
                        }
                        if (keys[0] === 'marca') {
                            let carros = await modelCarro.findAll({
                                where: { marca: carro.marca }
                            });
                            return resolve(carros);
                        }
                        reject([]);
                    } else if (keys[0] === 'anoInicial') {
                        let carros = await modelCarro.findAll({
                            where: { ano: { [Op.gte]: carro.anoInicial } }
                        });
                        return resolve(carros);
                    }
                    else if (keys[0] === 'valorInicial') {
                        let carros = await modelCarro.findAll({
                            where: { valor: { [Op.gte]: carro.valorInicial } }
                        });
                        return resolve(carros);
                    } else {
                        return reject([]);
                    }
                }
            });
    },

    update: async function (req) {
        return new Promise(
            async function (resolve, reject) {
                await modelCarro.update(
                    {
                        marca: req.body.marca,
                        modelo: req.body.modelo,
                        ano: req.body.ano,
                        valor: req.body.valor
                    },
                    {
                        where: { id: req.params.id }
                    }
                )
                let updateCarro = await modelCarro.findByPk(req.params.id);
                if (updateCarro) {

                    resolve(updateCarro);
                }
                else {
                    reject([]);
                }
            }
        );
    },

    delete: async function (req) {
        return new Promise(
            async function (resolve, reject) {
                let carroDeleted = await modelCarro.destroy(
                    {
                        where: { id: req.params.id }
                    }
                );
                if (carroDeleted) {
                    resolve("excluidos:" + carroDeleted);
                } else {
                    reject([]);
                }
            }
        );
    }
};

