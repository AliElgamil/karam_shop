export const header: {
  headerContainer: string;
  navItemClass: string;
  sidebar: string;
  navBtn: string;
  input: string;
  inputSearch: string;
} = {
  headerContainer:
    "m-auto transition-all duration-300 ease-linear relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
  navItemClass:
    "text-[1rem] lg:text-[1.2rem] py-2 relative after:content-[attr(data-text)] after:border-y-2 after:py-[6px] navItem navItem hover:after:w-full",
  sidebar:
    "w-full h-full lg:w-auto lg:h-auto  flex justify-end z-10  lg:opacity-100 transition lg:translate-x-0  duration-300 ease-linear lg:static fixed top-0 right-0",
  navBtn: "transition-colors duration-300 ease-linear outline-none",
  input:
    "border-none bg-transparent flex-grow py-3 px-4 outline-none placeholder:text-white text-white",
  inputSearch:
    "gradient flex absolute left-0 bottom-0 w-full ease-out-flex -z-[1] duration-300 transition-transform",
};

export const productStyle = {
  button:
    "flex items-center text-[.8rem] relative transition-all duration-300 ease-linear whitespace-nowrap w-[36px] hover:w-[120px] group overflow-hidden",
  buttonText:
    "text-head-color absolute top-[50%] -translate-y-[50%] left-0 group-hover:left-[40px] transition-all duration-300 ease-linear opacity-0 group-hover:opacity-100 capitalize font-bold",
  buttonIcon:
    "p-2 rounded-full bg-[var(--main-color)] text-white relative z-10 button-icon",
};
