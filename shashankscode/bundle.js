var QRcode = require('qrcode');
var admin = require("firebase-admin");
var serviceAccount = require("./sk.json");
var arrResult;
var reqstring = [];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rsi-project-656a3.firebaseio.com"
  });

var uid = admin.database().ref('Tickets/A-001/').orderByChild('date');
uid.on('value',function(snapshot){
        arrResult.push(childSnapshot.key);
    });

var def = admin.database().ref('Tickets/A-001/'+arrResult);
def.on('value',function(snapshot){
  snapshot.forEach(childSnapshot=>{
    if(childSnapshot.val()===seatsList){
      var sea = admin.database().ref('Tickets/A-001/'+arrResult+seatsList);
      sea.on('value',function(snapshot){
        snapshot.forEach(childSnapshot=>{
          reqstring=reqstring+"_"+childSnapshot.val();
        });
      });
    }
    else{
      reqstring=reqstring+"_"+childSnapshot.val();
    }
  });
});

QRcode.toFile('/media/god/Backup/rsi/qrscan/scan.png', reqstring , function(error){
    if (error){
      console.error(error);
    }
    else{
      console.log("Success!!!");
    }
  });
