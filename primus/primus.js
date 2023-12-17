const Primus = require('primus');

module.exports.go = (server) => {
    const primus = new Primus(server, { transformer: 'websockets' });

    primus.on('connection', (spark) => {
        console.log('connection🔥');

        spark.on('data', (data) => {
            console.log('Received data', data);

            if (data.action === 'add') {
                console.log('add werkt');
                primus.write(data);
            }

            if (data.action === 'status') {
                console.log('status werkt');
                primus.write(data);
                console.log(data);
            }
        });
    });
};