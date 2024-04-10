import mongoose from 'mongoose'

const uri = process.env.MONGO_CONNECT;

export const connect = () => {

    try {
      mongoose.connect(uri+'/movies');
    }
    catch( err ) {
      console.log(err);
    }
  
    mongoose.connection.on('error', err => {
      logError(err);
    });
  
    mongoose.connection.on('disconnected', msg => {
      logError(msg);
    });
}  
