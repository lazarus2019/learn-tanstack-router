import axios from "axios";

const DUMMY_PROMISE_DELAY = 300;

// const fetchEffect = Effect.tryPromise({
//   try: () =>
//     // oxlint-disable-next-line avoid-new
//     new Promise<{ data: GetUser; }>((resolve, reject) => {
//       setTimeout(() => {
//         reject({
//           data: {
//             id: 1,
//             name: "John Doe",
//             email: "john.doe@example.com",
//             cmpCode: "CMP123",
//             empno: "E001",
//             avatar: "https://i.pravatar.cc/150?img=3",
//             roles: ["admin", "user"],
//             permissions: ["read", "write", "delete"],
//           } as GetUser,
//         });
//       }, DUMMY_PROMISE_DELAY);
//     }),
//   catch: (error: unknown) =>
//     new Error(`Failed to fetch users: ${String(error)}`),
// });

// export const getUsers = async (): Promise<GetUser> =>
//   pipe(
//     fetchEffect,
//     Effect.map(response => response.data),
//     Effect.map(Schema.encodeSync(GetUserSchema)),
//     Effect.runPromise,
//   );

const fetchUser = () => {
  return axios.post('https://jsonplaceholder.typicode.com/usersasdasd');
  // return new Promise<GetUser>((resolve, reject) => {
  //   setTimeout(() => {
  //     reject({});
  //   }, DUMMY_PROMISE_DELAY);
  // });
};

export const getUsers = fetchUser;
