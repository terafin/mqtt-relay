// Requirements
const mqtt = require('mqtt')
const logging = require('homeautomation-js-lib/logging.js')

// Config
const src_host = process.env.MQTT_SRC_HOST
const dst_host = process.env.MQTT_DST_HOST
const topic = process.env.MQTT_TOPIC

const src_client = mqtt.connect(src_host)
const dst_client = mqtt.connect(dst_host)


// MQTT
src_client.on('connect', () => {
    logging.info('Source client connected, now subscribing')
    src_client.subscribe(topic)
    logging.info('Listening...\n')
})

dst_client.on('connect', () => {
    logging.info('Destination client connected, now subscribing')
    logging.info('Listening...\n')
})

dst_client.on('disconnect', () => {
    logging.info('Reconnecting...\n')
    dst_client.connect(dst_client)
})

src_client.on('disconnect', () => {
    logging.info('Reconnecting...\n')
    src_client.connect(src_client)
})

src_client.on('message', (topic, message) => {
    dst_client.publish(topic, message)
})