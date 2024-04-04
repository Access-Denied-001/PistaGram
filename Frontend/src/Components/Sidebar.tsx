import Searchbox from "./Searchbox";
import Rooms from "./Rooms";
import LogoutBtn from "./LogoutBtn";

const Sidebar = () => {
    return (
        <div className="flex flex-col justify-between gap-0 w-1/3">
            <div>
                <div className="h-20">
                    <Searchbox />
                    <div className="divider px-1"></div>
                </div>
                <div
                    style={{
                        height: "85%",
                        maxHeight: "560px",
                        overflowY: "auto",
                    }}
                >
                    <Rooms />
                </div>
            </div>
            <LogoutBtn />
        </div>
    );
};

export default Sidebar;
