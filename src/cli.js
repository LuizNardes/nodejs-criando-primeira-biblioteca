import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidade from 'http-validacao.js'

const caminho = process.argv;

function imprimeLista(valida,resultado, identificador = '') {

    if (valida) {
        console.log(
            chalk.red('Lista validada'), 
            chalk.black.bgGreen(identificador),
            listaValidada(resultado));
    }else { 
        console.log(
            chalk.red('Lista e links'), 
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3];

    try {
        fs.lstatSync(caminho); 
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('ARQUIVO OU DIRETÓRIO NÃO EXISTE');
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado);

    }else if (fs.lstatSync(caminho).isDirectory()){
        const  arquivos = await fs.promises.readdir(caminho)

        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            console.log(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(lista, nomeDeArquivo);
        })

    }

}

processaTexto(caminho);