import mongoose from 'mongoose';
import chalk from 'chalk';

export const connectDB = (mongoURI: string) => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection
    .once('open', () =>
      console.log(chalk.green(`Successfully connected to database.`))
    )
    .on('error', err => console.log('Error connecting to database, ', err));
};
