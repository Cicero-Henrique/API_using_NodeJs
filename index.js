
var restify = require('restify');
var dao = require('./dao');
var port = process.env.PORT || 3000;

var server = restify.createServer({
    name: 'Trabalho 1'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function insert(req, res, next) {
    dao.insert(req)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
        .finally(() => {
            next();
        });
}

function list(req, res, next) {
    dao.list(req.query)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
        .finally(() => {
            next();
        });

}

function update(req, res, next) {
    dao.update(req, res)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
        .finally(() => {
            next();
        });
}

function deleteCarro(req, res, next) {
    dao.delete(req, res)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
        .finally(() => {
            next();
        });
}

server.post('/ec021/carro', insert);
server.get('/ec021/carro', list);
server.patch('/ec021/carro/:id', update);
server.del('/ec021/carro/:id', deleteCarro);

server.listen(port, function () {
    console.log('%s rodando', server.name)
});
