import config from '../../../config/config';

export default {
  url: config.mongoDBURL,
  params: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
