const mongoose = require('mongoose');

const app = require('./app');
const { DB_HOST, PORT = 5000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server run on PORT ${PORT}`);
    }),
  )
  .catch(error => {
    console.log(`Database could not connect. Error: ${error.message}`);
    process.exit(1);
  });
