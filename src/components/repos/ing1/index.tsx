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
  info: <Hourglass className="h-12 w-12 text-gray-700" />,
  error: <XCircle className="h-12 w-12 text-red-500" />,
  inspecting: <RotateCw className="h-12 w-12 animate-spin text-purple-500" />,
  success: <CheckCircle className="h-12 w-12 text-purple-500" />,
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
    <div className="relative mb-6 flex h-auto w-[494px] items-start gap-4 rounded-lg bg-white p-8 shadow-lg">
      <div className="flex-shrink-0">{iconMapping[type]}</div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <p className="text-md font-medium text-gray-500">{message}</p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mx-auto mt-4 flex h-[58px] w-[314px] items-center justify-center rounded-lg bg-purple-600 px-6 py-2 font-medium text-white"
          >
            {buttonText}
          </button>
        )}
      </div>
      <button onClick={onClose} className="ml-4 mt-1">
        <X className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
};

export default Alert;
