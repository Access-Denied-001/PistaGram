import Request from "../Models/Request.js";
import User from "../Models/User.js";

export const acceptRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const receiverId = req.user._id;

        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            const receiver = await User.findById(receiverId);
            if (receiver) {
                const sender = await User.findById(senderId);

                if (sender) {
                    // Remove requestId from receiver incoming requests
                    const filteredIncomingReq =
                        receiver.incomingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    receiver.incomingFriendsReq = filteredIncomingReq;
                    // Remove requestId from sender outgoing requests

                    const filteredOutgoingReq =
                        sender.outgoingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    sender.outgoingFriendsReq = filteredOutgoingReq;

                    const deletedRequest = await Request.deleteOne({
                        senderId: senderId,
                        receiverId: receiverId,
                    });

                    if (deletedRequest.acknowledged) {
                        sender.friends.push(receiverId);
                        receiver.friends.push(senderId);
                        Promise.all([sender.save(), receiver.save()]);

                        res.status(201).json({
                            requestAccepted: true,
                        });
                    } else {
                        throw new Error(
                            "Request cannot be deleted from database!"
                        );
                    }
                } else {
                    throw new Error("Sender was not found in database!");
                }
            } else {
                throw new Error("Receiver was not found in database!");
            }
        } else {
            throw new Error("No request found for receiver");
        }
    } catch (error) {
        console.log(
            "Error occurred during accepting friend request!",
            error.message
        );
        throw new Error({
            error: "Error occurred during accepting friend request!",
        });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const receiverId = req.user._id;

        const request = await Request.findOne({
            senderId: senderId,
            receiverId: receiverId,
        });

        if (request) {
            const receiver = await User.findById(receiverId);
            if (receiver) {
                const sender = await User.findById(senderId);

                if (sender) {
                    // Remove requestId from receiver incoming requests
                    const filteredIncomingReq =
                        receiver.incomingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    receiver.incomingFriendsReq = filteredIncomingReq;
                    // Remove requestId from sender outgoing requests

                    const filteredOutgoingReq =
                        sender.outgoingFriendsReq.filter(
                            (id) => !id.equals(request._id)
                        );

                    sender.outgoingFriendsReq = filteredOutgoingReq;

                    const deletedRequest = await Request.deleteOne({
                        senderId: senderId,
                        receiverId: receiverId,
                    });

                    if (deletedRequest.acknowledged) {
                        Promise.all([sender.save(), receiver.save()]);

                        res.status(201).json({
                            requestAccepted: true,
                        });
                    } else {
                        throw new Error(
                            "Request cannot be deleted from database!"
                        );
                    }
                } else {
                    throw new Error("Sender was not found in database!");
                }
            } else {
                throw new Error("Receiver was not found in database!");
            }
        } else {
            throw new Error("No request found for receiver");
        }
    } catch (error) {
        console.log(
            "Error occurred during removing friend request!",
            error.message
        );
        throw new Error({
            error: "Error occurred during removing friend request!",
        });
    }
};

export const removeFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (user) {
            if (friend) {
                const filteredUsersFriend = user.friends.filter(
                    (id) => !id.equals(friendId)
                );
                user.friends = filteredUsersFriend;

                const filteredFriendsFriend = friend.friends.filter(
                    (id) => !id.equals(userId)
                );
                friend.friends = filteredFriendsFriend;

                Promise.all([user.save(), friend.save()]);

                res.status(200).json({
                    friendRemoved: true,
                });
            } else {
                throw new Error("Friend not found in database!");
            }
        } else {
            throw new Error("User not found in database!");
        }
    } catch (error) {
        console.log("Error occurred during removing friend!", error.message);
        throw new Error({
            error: "Error occurred during removing friend!",
        });
    }
};