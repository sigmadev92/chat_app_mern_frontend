import Header from "./Header";

const OverlayLayout = ({ children, close, label }) => {
  return (
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[90%] lg:w-[50%] rounded-2xl outline-blue-300 outline-1 h-[85%] px-2 dark:bg-black bg-white dark:text-white text-black">
        <Header label={label} close={close} />
        {children}
      </div>
    </section>
  );
};

export default OverlayLayout;
