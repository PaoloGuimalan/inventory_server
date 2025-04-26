import app from './app';
import config from './config/config';
import { connectMongo } from './services/items/connections/mongodbConnection';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  connectMongo()
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(err);
    });
});
