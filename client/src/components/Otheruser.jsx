import React from "react";

const Otheruser = () => {
  return (
    <div>
      <div className="flex gap-2 items-center hover:bg-gray-900 rounded-xl p-2 cursor-pointer">
        <div className="avatar avatar-online">
          <div className="w-10 rounded-full">
            <img
              src="https://i.pinimg.com/originals/61/c7/7a/61c77ac5085d548b40e7ac2020143453.jpg"
              alt="User Profile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between gap-2 flex-2"></div>
            <p>kartik baweja </p>
        </div>
      </div>
      <div>
  <div className="divider"></div>
      </div>
    </div>
  );
};

export default Otheruser;
