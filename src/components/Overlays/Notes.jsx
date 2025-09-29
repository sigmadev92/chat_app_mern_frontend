import { CircleXIcon, FileLock2Icon } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
function Notes({ close }) {
  const titleRef = useRef();
  const textRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      title: titleRef.current.value,
      text: textRef.current.value,
    };
    titleRef.current.value = null;
    textRef.current.value = null;

    try {
      const result = await fetch("", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newNote),
      });
      if (result.ok()) {
        const data = await result.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] rounded-2xl outline-blue-300 outline-1 h-[80%]">
        <div className="flex px-3 justify-between items-center py-2">
          <div className="flex gap-1 items-center">
            <span className="text-white text-[0.8rem]">Notes</span>
            <FileLock2Icon className="h-[1rem] text-blue-400" />
          </div>
          <button onClick={() => close(false)}>
            <CircleXIcon className="text-red-400 hover:text-red-800 h-[1rem]  cursor-pointer" />
          </button>
        </div>
        <div className="p-2 flex justify-between text-white  text-[12px] h-[90%]">
          <div id="notes" className=" border-r-[1px] border-white pr-1 w-[30%]">
            <p>Your saved Notes</p>
          </div>
          <div id="create" className="w-[65%]">
            <p>Create a New Note</p>
            <form
              className="text-white text-[12px] flex flex-col gap-[1rem] mt-3 p-1 w-[80%]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1 ">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  ref={titleRef}
                  type="text"
                  placeholder="something.."
                  className="focus:outline-none placeholder:text-[#929af6b9] px-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="detail">Details</label>
                <textarea
                  id="detail"
                  ref={textRef}
                  placeholder="description"
                  className="resize-none focus:outline-none placeholder:text-[#929af6b9] px-2 h-[100px] border-1 py-1"
                ></textarea>
              </div>
              <button className="outline-1 outline-blue-300 text-blue-300 w-fit py-1 px-3 hover:text-green-500">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notes;
