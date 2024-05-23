const {
  Client,
  clientId,
  LocalAuth,
  RemoteAuth,
  getState,
  sendMessage,
} = require("whatsapp-web.js");
const { MessageMedia } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");
const qrcode = require("qrcode-terminal");

let clients = {};

const initWhatsapp = async (id) => {
  clients[id] = new Client({
    authStrategy: new LocalAuth({
      clientId: id,
    }),
    webVersionCache: {
      type: "remote",
      remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`,
    },
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  clients[id].on("remote_session_saved", () => {
    console.log("remote_session_saved");
  });

  clients[id].on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  clients[id].on("authenticated", () => {
    console.log("Autenticado!");
  });

  clients[id].on("auth_failure", (msg) => {
    console.error("Error de autenticación", msg);
  });

  clients[id].on("loading_screen", (porcentaje, mensaje) => {
    console.log(`Cargando: ${porcentaje} - ${mensaje}`);
  });

  clients[id].on("ready", () => {
    console.log(`Client ${id} is ready!`);
  });

  clients[id].on("message", (message) => {
    if (message.body === "!ping") {
      message.reply("pong");
    }
    if (message.from.includes("52145211")) {
      message.reply("Estamos probando todo");
    }
  });

  // clients[id].on("message", (message) => {
  //   enviarMensajeRecibido(message.from, message.body);
  // });

  await clients[id].initialize();
};

const sendMessages = async (phoneNumber, message, clientId) => {
  console.log({ phoneNumber, message, clientId });
  let numero = phoneNumber + "@c.us";
  try {
    clients[clientId].sendMessage(numero, message);
  } catch (error) {
    const mensajeError = `Error al enviar mensaje a ${numero}`;
    console.error(mensajeError, error);
    throw new Error(mensajeError);
  }
};

const isConnected = async (id) => {
  try {
    let result = await clients[id].getState();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const disconnectClient = async (id) => {
  try {
   await clients[id].destroy();
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports = {
  initWhatsapp,
  sendMessages,
  isConnected,
  disconnectClient
};
