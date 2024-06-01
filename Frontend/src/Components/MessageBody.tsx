import { IoSendSharp } from "react-icons/io5";
import { useAuthContext } from "../Context/AuthContext";
import { useRoomContext } from "../Context/RoomContext";
import Message from "./Message";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IMessage } from "../interfaces";
import { useSocketContext } from "../Context/SocketContext";
import newMessageRingtone from "../Assets/newMessageRingtone.mp3";
import useMessage from "../Hooks/useMessage";

const MessageBody = () => {
    const { authUser } = useAuthContext();
    const { selectedRoom, category } = useRoomContext();
    const { socket } = useSocketContext();

    // Send message hook
    const { sendMessage } = useMessage();

    const DEFAULT_MESSAGES: IMessage[] = [];

    // Loading state of the page
    const [loading, setLoading] = useState(false);

    const lastMessage = useRef<HTMLInputElement | null>(null);

    // For message body
    const [messages, setMessages] = useState(DEFAULT_MESSAGES);

    // States and handler for message input box
    const [message, setMessage] = useState("");
    const handleSendMessage = async () => {
        if (message !== "") {
            const data = await sendMessage({ message });
            setMessages([...messages, data]);
            lastMessage.current = data;
            setMessage("");
        }
    };

    const getMessages = useMemo(
        () => async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedRoom._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        },
        [selectedRoom._id]
    );

    const checkDisabledStatus = () => {
        return selectedRoom?.status === "friends" ? false : true;
    };

    // Load messages in the room when selectedRoom is changed
    useEffect(() => {
        getMessages();
    }, [getMessages]);

    // When messages is changed scroll to the bottom of it
    useEffect(() => {
        setTimeout(() => {
            lastMessage.current?.scrollIntoView({
                behavior: messages.length > 5 ? "instant" : "smooth",
                block: "start",
                inline: "start",
            });
        }, 500);
    }, [messages]);

    // When socket listens to the event populate the messages with new messages
    useEffect(() => {
        socket?.on("newMessage", (newMessage: IMessage) => {
            const sound = new Audio(newMessageRingtone);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);

    return (
        <div className="flex flex-col h-full justify-between px-4">
            <div
                style={{ height: "100%", maxHeight: "600px" }}
                className="overflow-auto px-2 my-3"
            >
                {loading ? (
                    <span className="loading loading-spinner"></span>
                ) : selectedRoom?.status === "friends" ? (
                    messages?.map((message) => (
                        <div key={message._id} ref={lastMessage}>
                            <Message
                                key={message._id}
                                sender={authUser}
                                receiver={selectedRoom}
                                message={message}
                            />
                        </div>
                    ))
                ) : (
                    <div
                        className="flex items-center bg-blue-600 bg-opacity-70 text-white text-md font-bolder px-4 py-3 rounded-lg"
                        role="alert"
                    >
                        <svg
                            className="fill-white w-10 h-9 mr-2 rounded-full p-2 bg-gray-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                        </svg>
                        <p>
                            {selectedRoom.status === "pending"
                                ? `Please accept the friend request from ${selectedRoom?.username} to start a conversation!`
                                : `Please send a friend request to ${selectedRoom?.username} and wait for approval to start a conversation!`}
                        </p>
                    </div>
                )}
            </div>
            <div className="mb-3 w-full flex justify-center items-center">
                <label className="w-full input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search"
                        value={message}
                        disabled={loading || checkDisabledStatus()}
                        onChange={(e: any) => {
                            setMessage(e.target.value);
                        }}
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            } else if (e.key === "Escape") {
                                setMessage("");
                            }
                        }}
                    />
                    <span
                        className="w-10 h-full badge cursor-pointer hover:scale-110"
                        onClick={handleSendMessage}
                    >
                        {loading ? (
                            <span className="loading loading-spinnner" />
                        ) : (
                            <IoSendSharp />
                        )}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default MessageBody;
