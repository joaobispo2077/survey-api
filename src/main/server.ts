/* eslint-disable no-console */
import { MongoHelper } from '../infra/database/mongodb/helpers/MongoHelper';
import { env } from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = await import('./config/app');
    app.listen(env.port, () =>
      console.log(`Server is running at port ${env.port}`),
    );
  })
  .catch(console.error);
