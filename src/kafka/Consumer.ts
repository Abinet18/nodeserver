import Kafka from 'node-rdkafka';
import { sendToAllClients } from '../server';
export function startConsumer() {
    const consumer = Kafka.KafkaConsumer.createReadStream({
        'group.id': 'kafka',
        'metadata.broker.list': '127.0.0.1:9092'
    }, {}, { topics: 'test' });

    consumer.on('error', (err) => {
        console.log(err)
    })

    consumer.on('data', (data) => {
        console.log('received message', data.value.toString())
        sendToAllClients(data.value.toString());
    });
}
