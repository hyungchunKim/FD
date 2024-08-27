type PropTypes = {
  className: string;
  backToTop: () => void;
};
const Floating = ({ className, backToTop = () => {} }: PropTypes) => {
  return (
    <>
      <div className="fixed bottom-0 right-0 p-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};
export default Floating;
