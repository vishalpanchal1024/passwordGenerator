import { useState, useCallback, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numsAllow, setnumsAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKxLMNOPQRSTUVWXYZ";
    if (numsAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+|<>,.";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(char);
    }

    setPassword(pwd);
  }, [length, numsAllow, charAllow, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numsAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div className=" w-full h-screen flex flex-wrap  bg-black justify-center items-center">
        <div className=" w-2/5 h-2/5  flex flex-wrap flex-col bg-zinc-700  rounded-3xl justify-around items-center">
          <h1 className=" text-3xl text-white text-center font-semibold  shadow-2xl">
            Random Password Generator
          </h1>
          <div className="flex flex-wrap items-center justify-center ">
            <input
              type="text"
              readOnly
              className=" w-72 h-10  text-black font-medium text-lg  rounded-l-lg px-4 outline-none"
              value={password}
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              onClick={() => {
                copyToClipBoard();
              }}
              className=" bg-blue-500 w-20 h-10 rounded-r-lg text-white text-lg  active:bg-sky-700 duration-200"
            >
              Copy
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center mb-5">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className=" w-40 h-10  text-white  mr-2 cursor-pointer"
            />
            <label className=" text-white">Length : {length}</label>
            <input
              type="checkbox"
              defaultChecked={numsAllow}
              onChange={() => {
                setnumsAllow((prev) => !prev);
              }}
              id="01"
              className=" ml-5 mr-2"
            />
            <label htmlFor="01" className=" text-white">
              Number
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
              id="02"
              className=" ml-5 mr-2"
            />
            <label htmlFor="02" className=" text-white">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
