import app from './src/app.js';
import { config } from './src/config/index.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏫 GREENFIELD INTERNATIONAL SCHOOL - MODULAR MONOLITH API`);
  console.log(`🚀 Server Running on: http://localhost:${PORT}`);
  console.log(`🌐 Environment:       ${config.env}`);
  console.log(`📡 Health Check:      http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
