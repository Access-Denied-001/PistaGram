import { createContext, useContext, useState } from "react";

const DEFAULT_ROOM: any = null;

export const RoomContext = createContext(DEFAULT_ROOM);

export const useRoomContext = () => {
    return useContext(RoomContext);
};

export const RoomContextProvider = (props: any) => {
    const [category, setCategory] = useState("friends");
    const [selectedRoom, setSelectedRoom] = useState(DEFAULT_ROOM);

    return (
        <RoomContext.Provider
            value={{ selectedRoom, setSelectedRoom, category, setCategory }}
        >
            {props.children}
        </RoomContext.Provider>
    );
};
