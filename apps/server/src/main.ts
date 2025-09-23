import app from './app_server';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.set('port', port);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
