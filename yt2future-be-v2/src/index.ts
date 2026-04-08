import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getCorsOptions } from './middlewares/corsConfig.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import i18next from './i18n/config.js';
import * as i18nextMiddleware from 'i18next-http-middleware';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFound.js';

import authRoutes from './modules/auth/routes.js';
import adminRoutes from './routes/adminRoutes.js';
import feedbackRoutes from './modules/feedback/routes.js';
import reportRoutes from './modules/reports/routes.js';
import categoryRoutes from './modules/categories/routes.js';
import marketIndexRoutes from './routes/marketIndexRoutes.js';
import uploadRoutes from './modules/upload/routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: String(process.env.CLOUDINARY_API_KEY),
  api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

console.log('>>> [System] Cloudinary:', process.env.CLOUDINARY_CLOUD_NAME ? 'READY' : 'MISSING');

app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18next));
app.use(cors(getCorsOptions()));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true,
    parseNested: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/market-index', marketIndexRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (_req, res) => {
  res.send('YT2Future API đang chạy với chế độ Cookie và Cloudinary sẵn sàng...');
});

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.timeout = 600000;
