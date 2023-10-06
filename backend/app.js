require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const appRouter = require('./routes/index');
const errorHandle = require('./middlewares/errorHandle');

const { PORT, DB_PATH } = require('./config');

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('connected to DB'))
  .catch(() => console.log('no connection'));

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Максимальное количество запросов
  message: { message: 'Превышен лимит запросов. Попробуйте еще раз позже.' },
});

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use(appRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandle);
