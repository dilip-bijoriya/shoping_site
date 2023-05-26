import redis from "redis"
const env = process.env.REDIS;


const client = redis.createClient({
    url: env
});

client.connect()
    .then(_ => console.log("✅ Redis is connected!"))
    .catch(e => console.log("⚠️ Redis Error: ", e.message));

export default client;


/*
sahil.0202018@gmail.com
    const s = await client.setEx('key', 60, 'value')
    const s = await client.set('key', 'value')
    const s = await client.get('key')
*/