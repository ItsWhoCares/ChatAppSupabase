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
      id: authUser.attributes.sub,
      name: authUser.attributes.name,
      image: `https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/${Math.floor(
        Math.random() * 4 + 1
      )}.jpg`,
      status: "Hey, I am using WhatsApp",
    };
    await API.graphql(graphqlOperation(createUser, { input: newUser }));
    console.log("User created");
  }
};
