const fs = require('fs').promises;

const fileName = 'output.txt';

async function writeToFileWithFormat(text) {
    try {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const timestamp = new Date().toLocaleString();

        let formattedText = '';

        if (randomNumber % 2 === 0) {
            // Formato para múltiplos de 2: texto en mayúsculas con timestamp
            formattedText = `[${timestamp}] ${text.toUpperCase()}\n`;
        } else if (randomNumber % 5 === 0) {
            // Formato para múltiplos de 5: texto con marcos
            formattedText = `\n===========================================
[${timestamp}]
${text}
===========================================\n`;
        } else if (randomNumber % 9 === 0) {
            // Formato para múltiplos de 9: texto con bullet points
            formattedText = `• ${timestamp} - ${text}\n`;
        } else {
            // Formato por defecto: texto simple con timestamp
            formattedText = `${timestamp} -> ${text}\n`;
        }

        // Verificar si el archivo existe
        try {
            await fs.access(fileName);
        } catch {
            // Si el archivo no existe, se creará automáticamente
            await fs.writeFile(fileName, '');
        }

        // Agregar el texto al archivo
        await fs.appendFile(fileName, formattedText, 'utf8');
/* 
        console.log('Texto agregado exitosamente');
        console.log(`Número aleatorio generado: ${randomNumber}`);
        console.log(`Formato aplicado: ${randomNumber % 2 === 0 ? 'múltiplo de 2' :
            randomNumber % 5 === 0 ? 'múltiplo de 5' :
                randomNumber % 9 === 0 ? 'múltiplo de 9' :
                    'formato por defecto'}`); */

    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
        throw error;
    }
}


export function sendMessage(message) {
    writeToFileWithFormat(message)
        .then(() => console.log('Proceso completado'))
        .catch(error => console.error('Error en el proceso:', error));
}