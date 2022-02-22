import Kafka from 'node-rdkafka';
export function createProducer(topic: string) {
    let stream = Kafka.Producer.createWriteStream({
        'metadata.broker.list': '127.0.0.1:9092'
    }, {}, { topic });
    return stream;
}