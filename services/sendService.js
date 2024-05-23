const Mensaje = require('../model/Mensaje')

const sendNewMsg = async (number, msg) => {
  try {
    const newMsg = new Mensaje({ number, msg })
    return await newMsg.save()
  } catch (error) {
    console.error(errorService, error)
    throw new Error('Error al guardar el nuevo msg')
  }
}


module.exports = {
    sendNewMsg
}
