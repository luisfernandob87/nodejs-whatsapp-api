const qrcode = require("qrcode-terminal");
const express = require("express");
const { Client } = require("whatsapp-web.js");
const cors = require("cors");

const client = new Client();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const sendMessage = (to, message) => {
  client.sendMessage(to, message);
};

const sendWithApi = (req, res) => {
  const { message, to } = req.body;
  const newNumber = `${to}@c.us`;
  sendMessage(newNumber, message);
  console.log(message, to);
  res.send({
    status: "enviado",
  });
};

app.post("/send", sendWithApi);

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.initialize();

app.listen(3000, () => {
  console.log("api esta arriba");
});
