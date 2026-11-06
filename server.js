import { createServer } from 'vite';

async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5174;

  const server = await createServer({
    configFile: './vite.config.js',
    server: {
      port: PORT,
      host: true,
      open: false,
    },
  });

  await server.listen();
  console.log(`\n  ROOM241 Development Server running on http://localhost:${PORT}\n`);
  server.printUrls();
}

startServer().catch((err) => {
  console.error('Failed to start ROOM241 server:', err);
  process.exit(1);
});

