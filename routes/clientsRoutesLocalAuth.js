var { check } = require("express-validator");
const { Router } = require("express");
const router = Router();
const req = require("express/lib/request");
const { getSaludo, startClient, isOnline, sendMsg, disconnectID } = require("../controllers/clientControllers");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/msg", [], getSaludo);

router.get("/start/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id debe ser un numero").isNumeric(),
    validarCampos,
  ],startClient);

router.get("/online/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id debe ser un numero").isNumeric(),
    validarCampos,
  ],isOnline);

router.delete("/disconnect/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id debe ser un numero").isNumeric(),
    validarCampos,
  ],disconnectID);

router.post("/kick/:id",[
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id debe ser un numero").isNumeric(),
    validarCampos,
  ],disconnectID);


router.post("/send", [
  check("phoneNumber", "El numero es obligatorio").not().isEmpty(),
  check("phoneNumber", "El numero debe ser un numero").isNumeric(),
  check("message", "El mensaje es obligatorio").not().isEmpty(),
  check("message", "El mensaje debe ser un string").isString(),
  check("clientId", "El id es obligatorio").not().isEmpty(),
  check("clientId", "El id debe ser un numero").isNumeric(),
], sendMsg);

module.exports = router;
