// Requirements
mqtt = require('mqtt')
logging = require('./homeautomation-js-lib/logging.js')

logging.set_enabled(false)

// Config
src_host = process.env.MQTT_SRC_HOST
dst_host = process.env.MQTT_DST_HOST
topic = process.env.MQTT_TOPIC

src_client = mqtt.connect(src_host)
dst_client = mqtt.connect(dst_host)


// MQTT
src_client.on('connect', () => {
    logging.log('Source client connected, now subscribing')
    src_client.subscribe(topic)
    logging.log('Listening...\n')
})

dst_client.on('connect', () => {
    logging.log('Destination client connected, now subscribing')
    logging.log('Listening...\n')
})

dst_client.on('disconnect', () => {
    logging.log('Reconnecting...\n')
    dst_client.connect(host)
})

src_client.on('disconnect', () => {
    logging.log('Reconnecting...\n')
    src_client.connect(host)
})

src_client.on('message', (topic, message) => {
    dst_client.publish(topic, message)
})