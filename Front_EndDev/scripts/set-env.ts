import * as fs from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envFileContent = `
export const environment = {
  production: true,
  apiUrl: '${process.env['API_URL']}',
  tokenKey: '${process.env['TOKEN_KEY']}'
};
`;

fs.writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
