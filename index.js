import fs from 'fs';

import chalk from 'chalk';

console.log(chalk.blue('Olá mundo'));

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não ha arquivo no direotiro'))
}

// async/await

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const enconding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo,enconding)
        console.log(chalk.green(texto));
    } catch(erro) {
        trataErro(erro)
    }
}

/* 
    PROMESAS COM THEN

function pegaArquivo(caminhoDoArquivo) {
    const enconding = 'utf-8'
    fs.promises
        .readFile(caminhoDoArquivo,enconding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro)
}
 */

pegaArquivo('./arquivos/texto.md')
pegaArquivo('./arquivos/')