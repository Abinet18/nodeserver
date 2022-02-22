const Kafka = require('node-rdkafka');
function createProducer(topic) {
    let stream = Kafka.Producer.createWriteStream({
        'metadata.broker.list': '127.0.0.1:9092'
    }, {}, { topic });
    stream.on('error', (err) => {
        console.log('Error on producing ', err)
    })
    return stream;
}
function startConsumer() {
    const consumer = Kafka.KafkaConsumer.createReadStream({
        'group.id': 'kafka',
        'metadata.broker.list': '127.0.0.1:9092'
    }, {}, { topics: 'test' });

    consumer.on('error', (err) => {
        console.log(err)
    })

    consumer.on('data', (data) => {
        console.log('received message', data.value)
    });
}
let producer = createProducer('test');
producer.write(Buffer.from('test message'));
startConsumer();
