let express = require('express');
let app = express();
let http = require('http');
let httpServer = http.createServer(app);
let io = require('socket.io')(httpServer);
let bodyParser = require('body-parser');
let cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});
httpServer.listen(3000, function () {
  console.log('listening on *:3000');
});


let numOfEntities = 100;
let interval = 1000;
let sendOption = 'chunk';
let intervalId;
let dataChunk;
let socket;

const maxMovementDistance = 0.08 * interval/1000;
const maxHeadingChange = Math.PI/4 * interval/1000;
const maxAltitudeChange = 200 * interval/1000;
const chanceToChangeDirection = 0.10 * interval/1000;

let getSign = () => Math.round(Math.random()) * 2 - 1;

io.on('connection', function (connectionSocket) {
  socket = connectionSocket;
  dataChunk = createChunk(numOfEntities);
  intervalId = sendChunk();
});

app.post('/change', function (req, res, next) {
  console.log(`change to: ${JSON.stringify(req.body)}`);

  numOfEntities = req.body.numOfEntities;
  interval = req.body.interval;
  sendOption = req.body.sendOption;

  clearInterval(intervalId);
  switch (sendOption) {
    case 'oneByOne':
      intervalId = sendOneByOne();
      break;
    case 'chunk':
      dataChunk = createChunk(numOfEntities);
      intervalId = sendChunk();
      break;
    default:
      console.log('WTF wrong sendOption');
  }

  res.send('changed successfully');
});

function sendChunk() {
  let counter = 0;
  let id = setInterval(() => {
    if (counter % 10 === 0) {
      counter = 0;
      dataChunk = updateChunk(dataChunk);
    }

    let chunk = getChunkPart(counter);

    io.emit('birds', chunk);
    counter++;
  }, interval / 10);
  return id;
}

function getChunkPart(part) {
  let result = [];
  let index = (numOfEntities / 10) * (part + 1);
  for (let i = (numOfEntities / 10) * part; i < index; i++) {
    result.push(dataChunk[i])
  }
  return result;
}

function sendOneByOne() {
  let counter = 0;
  console.log(interval);
  const id = setInterval(() => {
    io.emit('birds', [{
      id: counter++ % numOfEntities,
      action: 'ADD_OR_UPDATE',
      entity: {
        name: 'bird',
        image: "/assets/fighter-jet.png",
        heading: 0
      }
    }]);
  }, interval);

  return id;
}

function updateChunk(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    let entity = dataArr[i].entity;
    if(Math.random() <= chanceToChangeDirection){
      entity.heading += Math.random() * maxHeadingChange * getSign();
    }

    entity.position.lat += Math.cos(entity.heading) * maxMovementDistance;
    entity.position.long -= Math.sin(entity.heading) * maxMovementDistance;
    entity.position.altitude += Math.random() * maxAltitudeChange * getSign();
  }
  return dataArr;
}

function createChunk(numOfEntities) {
  const data = [];
  for (let i = 0; i < numOfEntities; i++) {
    data.push({
      id: i,
      action: 'ADD_OR_UPDATE',
      entity: {
        id: i,
        isTarget: i % 2 === 0,
        name: 'track' + i,
        image: "/assets/fighter-jet.png",
        heading: Math.random()*2*Math.PI,
        lastDirectionChanged: 0,
        position: {
          lat: 60 * Math.random() * getSign(),
          long: 100 * Math.random() * getSign(),
          altitude: 10000 * Math.random()
        }
      }
    });
  }
  return data;
}
