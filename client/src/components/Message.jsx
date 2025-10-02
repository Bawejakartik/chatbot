// import React, { useEffect } from "react";
// import Sendinput from "./Sendinput";
// import Usermessages from "./Usermessages";
// import { useDispatch, useSelector } from "react-redux";


// const Message = () => {
//   const { SelectedUser ,authUser } = useSelector((store) => store.user);
//   const dispatch = useDispatch();


//   return (
//     <>
//       {SelectedUser !== null ? (
//         <div className="md:min-w-[450px] flex flex-col">
//           <div className="flex gap-2 items-center bg-gray-900 rounded-xl p-2 cursor-pointer">
//             <div className="avatar avatar-online text-white px-2 py-2">
//               <div className="w-10 rounded-full overflow-hidden">
//                 <img src={SelectedUser?.profileimage} alt="User Profile" />
//               </div>
//             </div>
//             <div className="flex flex-col flex-1">
//               <p className="font-semibold text-white">
//                 {SelectedUser?.fullname}
//               </p>
//             </div>
//           </div>

//           <Usermessages />

//           <Sendinput />
//         </div>
//       ) : (
//         <div className="'md:min-w-[500px] flex flex-col justify-center items-center">
//         <h3>Hi {authUser?.fullname || "Guest"}</h3>
//           <h1 className="text-center text-gray-500 mt-4">

//             Let's start a conversation
//           </h1>
//         </div>
//       )}
//     </>
//   );
// };

// export default Message;


import React from "react";
import Sendinput from "./Sendinput";
import Usermessages from "./Usermessages";
import { useDispatch, useSelector } from "react-redux";

const Message = () => {
  const { SelectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  // check if selected user is online
  const isOnline = onlineUsers?.includes(SelectedUser?._id);

  return (
    <>
      {SelectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          {/* Header */}
          <div className="flex gap-2 items-center bg-gray-900 px-4 py-2 mb-2 rounded-md">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full overflow-hidden">
                <img src={SelectedUser?.profileimage} alt="User Profile" />
              </div>
            </div>

            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p className="font-semibold text-white">
                  {SelectedUser?.fullname}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <Usermessages />

          {/* Input Section */}
          <Sendinput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-white font-bold">
            Hi, {authUser?.fullname || "Guest"}
          </h1>
          <h1 className="text-2xl text-gray-400 mt-2">
            Let's start a conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default Message;


