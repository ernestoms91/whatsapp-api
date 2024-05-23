const mongoose = require('mongoose');
const { MongoStore } = require('wwebjs-mongo');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        store = new MongoStore({mongoose: mongoose});

        console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }
}

const dbClosed = async () => {
    try {
      await mongoose.connection.close()
      console.log('Desconexión de MongoDB exitosa')
    } catch (error) {
      console.error(error)
      throw new Error('Error al cerrar la conexion a la BD')
    }
  }

module.exports = {
    dbConnection,
    dbClosed,
    store
}