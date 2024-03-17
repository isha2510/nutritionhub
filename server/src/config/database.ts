
import chalk from "chalk";
import { Error, connect, model, modelNames } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (mongoURI) {
      await connect(mongoURI);
      console.log(chalk.greenBright("MongoDB Connected..."));
      console.log('schemas present in database:', modelNames());
    } else {
      console.error(chalk.redBright('MONGODB_URI is not defined in .env'));
      throw new Error('MONGODB_URI is not defined in .env');
    }
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;