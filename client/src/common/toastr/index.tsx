import React, { FC, useState, useContext } from "react";
import ReactDOM from "react-dom";
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from "react-transition-group";
import ToastrItem from "./toastr-item";
import { ToastrMessage, ToastrMessageType } from "./types";

interface State {
  notify: (message: string, type?: ToastrMessageType) => void;
}

interface Props {
  children: React.ReactNode;
}

const ToastrContext = React.createContext<State>(null);

const duration = 500;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: Partial<Record<TransitionStatus, Record<string, any>>> =
  {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

const ToasrProvider: FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<ToastrMessage[]>([]);

  const handleOnAdd = (message: string, type: ToastrMessageType = "info") => {
    const id = messages.length;
    setMessages((prev) => [...prev, { id, message, type }]);
  };

  const handleOnDelete = (messageId: number) => {
    setMessages((prev) => prev.filter(({ id }) => id !== messageId));
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className="absolute top-12 right-7">
          <TransitionGroup>
            {messages.map((props) => (
              <Transition appear timeout={duration} key={props.id}>
                {(state) => (
                  <div
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    <ToastrItem onDelete={handleOnDelete} {...props} />
                  </div>
                )}
              </Transition>
            ))}
          </TransitionGroup>
        </div>,
        document.querySelector("#portal")
      )}

      <ToastrContext.Provider value={{ notify: handleOnAdd }}>
        {children}
      </ToastrContext.Provider>
    </>
  );
};

const useToastr = () => useContext(ToastrContext);

export { ToasrProvider, useToastr };
