import { Server } from "socket.io";
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
    }

    public initListeners(): void {
        console.log("Initializing Socket Listeners");
        const io = this._io;
        io.on("connect", (socket) => {
            console.log('New Socket Connected : ', socket.id);

            socket.on("event:message", async ({message}:{message:String})=>{
                console.log("New Message Received : ", message);
            })
        })


    }

    get io(){
        return this._io;
    }
}

export default SocketService;