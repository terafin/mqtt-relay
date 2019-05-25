// Requirements
const mqtt = require('mqtt')
const logging = require('homeautomation-js-lib/logging.js')

// Config
const src_host = process.env.MQTT_SRC_HOST
const src_user = process.env.MQTT_SRC_USERNAME
const src_pass = process.env.MQTT_SRC_PASSWORD
const dst_host = process.env.MQTT_DST_HOST
const dst_user = process.env.MQTT_DST_USERNAME
const dst_pass = process.env.MQTT_DST_PASSWORD
const topic = process.env.MQTT_TOPIC


const src_options = {
    username: src_user,
    password: src_pass
}

const dst_options = {
    username: dst_user,
    password: dst_pass
}

const src_client = mqtt.connect(src_host, src_options)
const dst_client = mqtt.connect(dst_host, dst_options)

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