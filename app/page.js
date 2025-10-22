"use client"
import { handlesubmit, handledelete, handleedit } from "./actions/handlesubmit";
import { useState, useEffect } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { FaCopy } from 'react-icons/fa';

export default function Home() {

  let redo = () => {
    const stored = localStorage.getItem("myArray");
    const parsed = JSON.parse(stored);
    setData(parsed);
  }

  const handlesubmitM = (e) => {
    setlinkinput("")
    setusernameinput("")
    setpasswordinput("")
    handlesubmit(e)
    redo()
  }

  const handlehide = () => {
    setShowPassInput(prev => !prev)
  }

  const [data, setData] = useState([]);
  const [linkinput, setlinkinput] = useState("")
  const [usernameinput, setusernameinput] = useState("")
  const [passwordinput, setpasswordinput] = useState("")
  const [showPassInput, setShowPassInput] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const toggleVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showCopiedToast("Copied to clipboard!");
    }).catch(() => {
      showCopiedToast("Failed to copy!");
    });
  }

  function showCopiedToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    document.body.appendChild(toast);

    setTimeout(() => { toast.style.opacity = "1"; }, 10);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }

  useEffect(() => {
    if (!localStorage.getItem("myArray")) {
      localStorage.setItem("myArray", JSON.stringify([]));
    }
  })

  useEffect(() => {
    const stored = localStorage.getItem("myArray");
    const parsed = JSON.parse(stored);
    setData(parsed);
  }, []);

  return (
    <div className="w-full h-[100vh] bg-green-200">
      <div className="w-full h-14 bg-green-700 text-4xl text-white flex justify-center items-center gap-4">
        PassX <span className="text-[16px] text-gray-200">- your friendly password manager</span>
      </div>

      <div className="flex justify-center items-center w-full mt-11 font-bold">
        <form
          action={handlesubmitM}
          className="flex flex-col gap-3 w-full max-w-2xl mx-auto px-4"
        >
          {/* Link Input */}
          <input
            type="text"
            name="link"
            placeholder="paste your link"
            className="border-2 rounded-2xl w-full p-2 focus:outline-none focus:ring-0"
            value={linkinput}
            onChange={(e) => setlinkinput(e.target.value)}
          />

          {/* Username + Password Group */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="username"
              className="border-2 rounded-2xl w-full sm:w-[60%] p-2 focus:outline-none focus:ring-0"
              value={usernameinput}
              onChange={(e) => setusernameinput(e.target.value)}
            />

            {/* Password */}
            <div className="border-2 flex items-center gap-1.5 rounded-2xl w-full sm:w-[40%] p-1">
              <button
                type="button"
                className="ml-1 flex items-center justify-center"
                onClick={handlehide}
              >
                {showPassInput ? <BiShow /> : <BiHide />}
              </button>
              <input
                type={showPassInput ? "text" : "password"}
                name="password"
                placeholder="password"
                className="p-1 focus:outline-none focus:ring-0 w-full"
                value={passwordinput}
                onChange={(e) => setpasswordinput(e.target.value)}
              />
            </div>
          </div>

          {/* Save Button */}
          <button className="border-2 bg-green-700 flex gap-2 justify-center items-center text-white text-[25px] p-2 rounded-md">
            <FaRegSave />
            <span className="text-[20px] text-white">Save</span>
          </button>
        </form>
      </div>



      <div className="flex w-full justify-center items-center mt-6 ">
        <div className="w-3/4 ">
          <div className="text-2xl font-bold mb-2">Your Passwords</div>

          <div className="flex font-bold w-full bg-green-500 p-2 text-center text-sm sm:text-xs">
            <div className="w-2/5 truncate text-left">Link</div>
            <div className="w-1/5 truncate">Username</div>
            <div className="w-1/5 truncate">Password</div>
            <div className="w-1/5 truncate">Actions</div>
          </div>

          <div className="h-[240px] overflow-y-auto">
            {data.map((user, index) => (
              <div
                key={index}
                className="grid w-full bg-green-300 p-2 items-center text-sm sm:text-xs"
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
              >
                {/* LINK */}
                <div className="flex items-center gap-1 min-w-0 px-2">
                  <button
                    type="button"
                    className="flex-shrink-0 w-3 h-3 sm:w-5 sm:h-5 text-xs sm:text-sm flex items-center justify-center"
                    onClick={() => copyToClipboard(user.link)}
                    aria-label="copy link"
                  >
                    <FaCopy />
                  </button>
                  <div className="truncate min-w-0">{user.link}</div>
                </div>

                {/* USERNAME */}
                <div className="flex items-center gap-1 min-w-0 px-2">
                  <button
                    type="button"
                    className="flex-shrink-0 w-3 h-3 sm:w-5 sm:h-5 text-xs sm:text-sm flex items-center justify-center"
                    onClick={() => copyToClipboard(user.username)}
                    aria-label="copy username"
                  >
                    <FaCopy />
                  </button>
                  <div className="truncate min-w-0">{user.username}</div>
                </div>

                {/* PASSWORD */}
                <div className="flex items-center gap-1 justify-center min-w-0 px-2">
                  <button
                    type="button"
                    className="flex-shrink-0 w-3 h-3 sm:w-5 sm:h-5 text-xs sm:text-sm flex items-center justify-center"
                    onClick={() => copyToClipboard(user.password)}
                    aria-label="copy password"
                  >
                    <FaCopy />
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 w-3 h-3 sm:w-5 sm:h-5 text-xs sm:text-sm flex items-center justify-center"
                    onClick={() => toggleVisibility(user.id)}
                    aria-label="toggle password"
                  >
                    {visiblePasswords[user.id] ? <BiShow /> : <BiHide />}
                  </button>
                  <div className="truncate min-w-0 text-center">
                    {visiblePasswords[user.id] ? user.password : "########"}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-1 justify-center px-2">
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded bg-green-600 text-white hover:bg-green-700 text-xs sm:text-sm"
                    onClick={() => {
                      setlinkinput(user.link);
                      setusernameinput(user.username);
                      setpasswordinput(user.password);
                      handledelete(user.id);
                      redo();
                    }}
                  >
                    <FaPencilAlt className="w-3 h-3 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    type="button"
                    className="px-2 py-0.5 rounded bg-red-600 text-white hover:bg-red-700 text-xs sm:text-sm"
                    onClick={() => {
                      handledelete(user.id);
                      redo();
                    }}
                  >
                    <MdDelete className="w-3 h-3 sm:w-5 sm:h-5" />
                  </button>
                </div>


              </div>
            ))}
          </div>

        </div>
      </div>

  <footer className="absolute bottom-0 w-full text-center text-xs sm:text-sm text-gray-700 py-4 bg-transparent">
    ⚠️ This password manager was made for entertainment purposes only. It uses local storage and is not safe for real passwords.
  </footer>
    </div>
  );
}
