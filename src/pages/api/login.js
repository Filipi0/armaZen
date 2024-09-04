import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    const filePath = path.join(process.cwd(), 'src', 'data', 'admin.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const adminUser = JSON.parse(jsonData);

    if (email === adminUser.email && senha === adminUser.senha) {
      return res.status(200).json({ message: 'Autenticado com sucesso', redirect: '/home' });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
