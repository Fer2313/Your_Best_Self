const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  clientUrl: "${process.env.CLIENT_URL?process.env.CLIENT_URL:""}",
  apiUrl: "${process.env.API_URL?process.env.API_URL:""}"
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error al escribir el archivo environment:', err);
  } else {
    console.log(`Archivo generado correctamente en ${targetPath}`);
  }
});
