import { connect } from "amqplib/callback_api.js";
import { user } from "../generate_id/src/services/send_mail.js"
import { serialize } from "v8";
 

connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw new Error("Error connection on RabbitMQ!");
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw new Error("Error creating channel!");
        }

        const queue = 'user_info';
        const msg = user.mail_append();
        const serialized_msg = serialize(msg)

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(serialized_msg));

        console.log(" [x] Sent %s", serialized_msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});


