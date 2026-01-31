// prisma.config.ts
import 'dotenv/config';

export default {
  datasourceUrl: process.env.DATABASE_URL,
  

  adapter: {
    kind: 'mysql',
    url: process.env.DATABASE_URL,
  },
};