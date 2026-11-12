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