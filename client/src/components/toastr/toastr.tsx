import React, { useEffect, FC } from "react";
import ReactDOM from "react-dom";

interface Props {
  list: any;
  setList: any;
}

const Toastr: FC<Props> = ({ list, setList }) => {
  const deleteToast = (id: number) => {
    const toastListItem = list.filter((elem: any) => elem.id !== id);
    setList(toastListItem);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) {
        deleteToast(list[0].id);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [list]);

  return ReactDOM.createPortal(
    <div className="absolute space-y-3 top-12 right-7">
      {list.map((elem: any, i: number) => {
        return (
          <div
            key={i}
            className=" flex content-center justify-between w-72 h-16 border border-gray-200 rounded-lg shadow-lg opacity-75"
          >
            <h1 className="mx-2 self-center">"Something went wrong"</h1>
            <button className="mx-2" onClick={() => deleteToast(elem.id)}>
              X
            </button>
          </div>
        );
      })}
    </div>,
    document.querySelector("#portal")
  );
};

export default Toastr;
