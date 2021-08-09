const nodes7 = require("nodes7");

var conn = new nodes7();

var doneReading = false;
var doneWriting = false;

var variables = {
  mb8: "MB8",
  mb10: "MB10",
  mb12: "MB12",
  mw14: "MW14",
  mw16: "MW16",
  mw18: "MW18",
  mw20: "MW20",
  mw22: "MW22",
  md24: "MR24",
  md28: "MR28",
  "db1.dbw2": "DB1,INT2",
  // test1: "I0.0",
  "db1.dbd4": "DB1,REAL4",
  deneme: "DB1,DI304",
  deneme1: "DB1,C8.20",
  deneme2: "DB1,S30.16",

  // "db1.d"
};
conn.initiateConnection(
  { port: 102, host: "192.168.0.99", rack: 0, slot: 1 },
  connected
);

function connected(err) {
  if (err) {
    console.log(err);
  }
  conn.setTranslationCB(function (tag) {
    return variables[tag];
  });

  conn.addItems([
    "mb8",
    "mb10",
    "mb12",
    "mw14",
    "mw16",
    "mw18",
    "mw20",
    "mw22",
    "md24",
    "md28",
    "db1.dbw2",
    "db1.dbd4",
    "deneme",
    "deneme1",
    "deneme2",
  ]);

  conn.readAllItems(valuesReady);
  conn.dropConnection();
}
function valuesReady(anythingBad, values) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
  }
  console.log(values);
  // doneReading = true;
  if (doneWriting) {
    process.exit();
  }
}
