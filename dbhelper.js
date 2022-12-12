import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

export const syncUser = async () => {
  // get Auth user
  const authUser = await Auth.currentAuthenticatedUser({
    bypassCache: true,
  });
  // console.log(authUser);
  // query db using Auth user (sub)
  const dbUser = await API.graphql(
    graphqlOperation(getUser, { id: authUser.attributes.sub })
  );

  // if dbUser doesn't exist in db, create one
  if (!dbUser.data.getUser) {
    const newUser = {
      id: authUser.attributes?.sub,
      name: authUser.attributes?.name,
      image: `https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/${Math.floor(
        Math.random() * 4 + 1
      )}.jpg`,
      status: "Hey, I am using WhatsApp",
    };
    await API.graphql(graphqlOperation(createUser, { input: newUser }));
    // console.log("User created");
  }
};

export const getCommonChatRoom = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();
  //get all chat rooms of auth user
  const res = await API.graphql(
    graphqlOperation(listMyChatRoomsID, { id: authUser.attributes?.sub })
  );
  const MyChatRooms = res.data?.getUser?.ChatRooms?.items || [];
  console.log(MyChatRooms);
  const chatRoom = MyChatRooms.find((chatRoomItem) => {
    return chatRoomItem.chatRoom.users.items.some(
      (userItem) => userItem.user.id === userID
    );
  });

  return chatRoom;
};

export const listMyChatRoomsID = /* GrapgQL */ `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    ChatRooms {
      items {
        chatRoom {
          id
          users {
            items {
              user {
                id
              }
            }
          }
        }
      }
    }
  }
}
`;

export const listMyChatRooms = /* GrapgQL */ `
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    ChatRooms {
      items {
        chatRoom {
          id
          updatedAt
          users {
            items {
              user {
                id
                image
                name
              }
            }
          }
          LastMessage{
            id
            createdAt
            text
          }
        }
      }
    }
  }
}
`;
