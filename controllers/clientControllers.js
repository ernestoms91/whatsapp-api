const { response } = require("express");
const { initWhatsapp, isConnected, sendMessage, sendMessages, disconnectClient } = require("../config/whatsappLocalAuth");

const getSaludo = async (req, res = response) => {
  try {
    res.status(201).json({
      ok: true,
      msg: "Saludos",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const startClient = async (req, res = response) => {
  try {
     await initWhatsapp(req.params.id)
    res.status(200).json({
      ok: true,
      msg: `Cliente ${req.params.id} inicializado`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const isOnline = async (req, res = response) => {
  try {
   const result =  await isConnected(req.params.id)
    res.status(200).json({
      ok: result ? true : false,
      msg: result ? `El cliente ${req.params.id} ya esta inicializado` : `El cliente ${req.params.id} no esta inicializado`,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
const disconnectID = async (req, res = response) => {
  try {
   const result =  await disconnectClient(req.params.id)
    res.status(200).json({
      ok: true,
      msg: `El cliente ${req.params.id} se desconecto`,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const sendMsg = async (req, res = response) => {
  try {
    // console.log(req.body);
    const clientId = req.body.clientId;
   await sendMessages(req.body.phoneNumber, req.body.message, clientId );
    res.status(200).json({
      ok: true,
      msg: `Mensaje enviado`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};




// const isConnected = async (req, res = response) => {
//   try {
//     const 
//     res.status(201).json({
//       ok: true,
//       msg: "Esta autenticado",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       ok: false,
//       msg: error,
//     });
//   }
// };

module.exports = {
  getSaludo,
  startClient,
  isOnline,
  sendMsg,
  disconnectID
};
