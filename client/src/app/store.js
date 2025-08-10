// // import { configureStore } from "@reduxjs/toolkit";
// // import rootReducer from "./rootReducer";
// // import { authApi } from "@/features/api/authApi";

// // export const appStore = configureStore({
// //     reducer: {
// //       auth: rootReducer,
// //     },
// //     middleware: (getDefaultMiddleware) =>
// //       getDefaultMiddleware().concat(authApi.middleware),
// //   });

// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "@/features/api/authApi"; // your authApi
// import authReducer from "@/features/authSlice"; // your authSlice
// import { courseApi } from "@/features/api/courseApi";

// const Appstore = configureStore({
//   reducer: {
//     auth: authReducer, // for handling user login/logout
//     [authApi.reducerPath]: authApi.reducer, // for handling api states
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware),
// });
// const initializeApp=async ()=>{
//   await Appstore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true})) 
// }
// initializeApp();
// export default Appstore;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

import { courseApi } from "@/features/api/courseApi"; // ✅ import courseApi
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const appStore=configureStore({
  reducer:rootReducer,
  middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware)
})
const initializeApp=async ()=>{
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();
export default appStore;