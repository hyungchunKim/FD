import React from "react";
import { X, XCircle, CheckCircle, RotateCw, Hourglass } from "lucide-react";

interface AlertProps {
  type: "info" | "error" | "inspecting" | "success";
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
}

const iconMapping = {
  info: <Hourglass className="text-gray-700 w-12 h-12" />,
  error: <XCircle className="text-red-500 w-12 h-12" />,
  inspecting: <RotateCw className="text-purple-500 w-12 h-12 animate-spin" />,
  success: <CheckCircle className="text-purple-500 w-12 h-12" />,
};

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  buttonText,
  onButtonClick,
  onClose,
}) => {
  return (
    <div className="flex items-start p-8 gap-4 w-[494px] h-auto bg-white shadow-lg rounded-lg mb-6 relative">
      <div className="flex-shrink-0">{iconMapping[type]}</div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <p className="text-md font-medium text-gray-500">{message}</p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg w-[314px] h-[58px] flex items-center justify-center mt-4 mx-auto"
          >
            {buttonText}
          </button>
        )}
      </div>
      <button onClick={onClose} className="ml-4 mt-1">
        <X className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default Alert;
