docker run -d \
    --name my-cassandra \
    -p 9042:9042 \
    -v ~/apps/cassandra:/var/lib/cassandra \
    -e CASSANDRA_CLUSTER_NAME=citizix \
    cassandra:4.0