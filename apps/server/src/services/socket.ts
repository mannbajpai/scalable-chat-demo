import { Server } from "socket.io";
import Redis from "ioredis"

const pub = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USER,
});
const sub = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USER,
});

class SocketService {
    private _io: Server;
    constructor(){
        console.log("Init Socket Service");
        this._io = new Server({
            cors: {
                origin: "*",
                allowedHeaders: ["*"]
            }
        });
        sub.subscribe("MESSAGES")
    }

    public initListeners(): void {
        console.log("Initializing Socket Listeners");
        const io = this._io;
        io.on("connect", (socket) => {
            console.log('New Socket Connected : ', socket.id);

            socket.on("event:message", async ({message}:{message:String})=>{
                console.log("New Message Received : ", message);
                await pub.publish("MESSAGES", JSON.stringify({message}))
            })
        })

        sub.on("message", (channel, message)=>{
            if (channel === "MESSAGES"){
                console.log("New Message in Channel : ", message);
                io.emit("event:message", message)
            }
        })

    }

    get io(){
        return this._io;
    }
}

export default SocketService;