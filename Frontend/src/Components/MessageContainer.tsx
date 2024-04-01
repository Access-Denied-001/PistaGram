import ReceiverInfo from "./ReceiverInfo.js";
import MessageBody from "./MessageBody.js";
import MessageInput from "./MessageInput.js";
import { TiMessages } from "react-icons/ti";

interface MessageContainerProps {
    defaultView: boolean;
}

const MessageContainer = ({ defaultView }: MessageContainerProps) => {
    const DefaultViewJSX = () => {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p> Welcome John Doe</p>
                    <p> Select a room to view chat history</p>
                    <TiMessages className="text-3xl" />
                </div>
            </div>
        );
    };

    const RoomViewJSX = () => {
        return (
            <div className="flex flex-col justify-between bg-white-400 m-3 w-full rounded-3xl">
                <ReceiverInfo
                    username="John Doe"
                    avatarUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
                <MessageBody />
                <MessageInput />
            </div>
        );
    };

    if (defaultView) {
        return <DefaultViewJSX />;
    } else {
        return <RoomViewJSX />;
    }
};

export default MessageContainer;
