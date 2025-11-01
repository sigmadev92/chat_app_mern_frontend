const Body = ({ user, currentlyChattingTo }) => {
  return (
    <div id="messageDisplay" className="h-[80%] p-2 overflow-auto">
      {currentlyChattingTo.messages.length > 0 ? (
        <ul className="list-none w-full px-1.5">
          {currentlyChattingTo.messages.map((msg) => (
            <li key={msg._id} className="text-[0.7rem] mb-[0.5rem]">
              {msg.senderId === user._id ? (
                <div className="flex justify-end">
                  <div className="max-w-[70%]">
                    <div className="bg-blue-500 max-w-full p-1 rounded-[0.1rem] rounded-l-[0.4rem]">
                      {msg.text}
                    </div>
                    <div>
                      <span className="text-[0.6rem]">
                        {
                          new Date(msg.createdAt)
                            .toLocaleString()
                            .split(", ")[1]
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-fit max-w-[70%]">
                    <div className="bg-pink-500 p-1 rounded-[0.1rem] rounded-r-[0.4rem]">
                      {msg.text}
                    </div>
                    <div>
                      <span className="text-[0.6rem]">
                        {
                          new Date(msg.createdAt)
                            .toLocaleString()
                            .split(", ")[1]
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>{new Date().toISOString().split(", ")[1]}</p>
      )}
    </div>
  );
};

export default Body;
