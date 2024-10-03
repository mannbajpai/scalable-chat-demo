"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
    socket: Socket | null;
    sendMessage: (message: string) => any;
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
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const sendMessage: SocketContextProps["sendMessage"] = useCallback((msg)=>{
        console.log("Sending message : ", msg);
        if (socket){
            socket.emit("event:message", {message:msg} )
        }
    }, [socket])

    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000');
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
            setSocket(undefined);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};