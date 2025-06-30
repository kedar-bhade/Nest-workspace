# Chatroom App

This is a simple GraphQL chatroom that uses subscriptions for real-time
communication. Rooms are identified by a pair of `fan_id` and
`influencer_id`. Messages are stored in Redis using the key pattern
`room_<fanId>_<influencerId>`.

## Usage

- **joinRoom(fan_id, influencer_id)** – returns the existing messages for
the room, creating the room if it does not exist.
- **sendMessage(fan_id, influencer_id, from, content)** – appends a
message to the room and publishes it to subscribers.
- **messageAdded(fan_id, influencer_id)** – subscription that delivers
new messages in real time.
