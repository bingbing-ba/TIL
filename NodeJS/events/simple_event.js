const EventEmitter = require('events');

class Job extends EventEmitter{}

const job = new Job();

job.on('warning', (season)=>{
    console.log(`${season} is comming`);
});

job.emit('warning', 'winter');