"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    sendMessage: (message: string) => any;
    messages: string[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

interface SocketProviderProps {
    children?: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const sendMessage: SocketContextProps["sendMessage"] = useCallback((msg)=>{
        console.log("Sending message : ", msg);
        if (socket){
            socket.emit("event:message", {message:msg} )
        }
    }, [socket])

    const onMessageRec = useCallback((msg:string)=>{
        console.log("Message received : ", msg);
        const {message} = JSON.parse(msg) as {message:string}
        setMessages((prev)=>[...prev, message])
    },[])

    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000');
        setSocket(socketInstance);
        socketInstance.on("event:message", onMessageRec)
        return () => {
            socketInstance.disconnect();
            socketInstance.off("event:message", onMessageRec)
            setSocket(null);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    );
};