import { app } from './api/index';

const PORT = process.env.PORT || 3002;

try {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at ${process.env.FRONTEND_URL || 'http://localhost'}:${PORT}`);
        console.log(`📡 Swagger or price endpoint at ${process.env.FRONTEND_URL || 'http://localhost'}:${PORT}/api/bnb-price`);
      });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
