import express from "express";
const app = express();
const PORT = 3000;
const mensagens = [{ id: 1, usuario: "Ana", texto: "Bom dia!" }, { id: 2, usuario: "Pedro", texto: "Olá!" }];

function listarMensagens() {
    return mensagens;
}

function buscarMensagens() {
    return mensagens.find(m => m.id === id);
}

function consultarMensagens(simularErro = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simularErro) return reject(new Error("Falha simulada na consulta."));
            resolve(listarMensagens());
        }, 1000);
    })
}

// SPRINT 01 ROTAS HERDADAS
app.get("/", (req, res) => res.send("Servidor rodando!!!"));
app.get("/satus", (req, res) => res.json({status: "online", sprint: 3}));
app.get("/sobre", (req, res) => res.send("Mensageiro local com node.js, express e ES Modules"));

// SPRINT 02 ROTAS HERDADAS
app.get("/mensagens", (req, res) => res.json(listarMensagens()));
app.get("/mensagens/:id", (req, res) => {
    const id = Number(req.params.id);
    const mensagem = buscarMensagens(id);
    if (!mensagem) return res.status(404).json({ erro: "mensagem não encontrada"});
    res.json(mensagem);
});
app.get("/total-mensagens", (req, res) => res.json({total: mensagens.length}));

// SPRINT 03 NOVAS ROTAS
app.get("/mensagens-then", (req, res) => {
    consultarMensagens()
        .then(dados => res.json(dados))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({erro: "Falha ao consultar mensagens."});
        });
});
app.get("/mensagem-erro", async (req, res) => {
    try {
        res.json(await consultarMensagens(true));
    }
    catch (erro) {
        console.error(`Erro simulado ${erro.message}`);
        res.status(500).json({erro: "Falha simulada na consulta."});
    }
});

// SPRINT 01 SERVIDOR
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});