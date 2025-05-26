const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  clientUrl: "${process.env.clientUrl?process.env.clientUrl:""}",
  apiUrl: "${process.env.apiUrl?process.env.apiUrl:""}"
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error al escribir el archivo environment:', err);
  } else {
    console.log(`Archivo generado correctamente en ${targetPath}`);
  }
});
