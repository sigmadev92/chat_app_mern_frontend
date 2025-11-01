import { useRef } from "react";
import { toast } from "react-hot-toast";
import OverlayLayout from "../../../layouts/OverlayLayout/Index";

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
    <OverlayLayout label={"Notes"} close={close}>
      <div className="p-2 flex justify-between  text-[12px] h-[90%]">
        <div id="notes" className=" border-r-[1px]  pr-1 w-[30%]">
          <h3 className="font-bold">Your saved Notes</h3>
        </div>
        <div id="create" className="w-[65%]">
          <h3 className="font-bold">Create a New Note</h3>
          <form
            className=" text-[12px] flex flex-col gap-[1rem] mt-3 p-1 w-[80%]"
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
    </OverlayLayout>
  );
}

export default Notes;
