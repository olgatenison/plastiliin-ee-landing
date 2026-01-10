"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
  button_txt: string;
}

export default function Modal({
  isOpen,
  onClose,
  type,
  title,
  message,
  button_txt,
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <DialogBackdrop className="fixed inset-0  bg-pink-300/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center text-center">
            {/* Блок с иконкой */}
            <div
              aria-hidden="true"
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                type === "success" ? "bg-emerald-100" : "bg-rose-100"
              }`}
            >
              {type === "success" ? (
                <img
                  src="..\sucsess.png"
                  alt="Success icon"
                  className="h-16 w-16"
                />
              ) : (
                <img
                  src="..\error.png"
                  alt="Error icon"
                  className="h-16 w-16"
                />
              )}
            </div>

            <DialogTitle
              id="modal-title"
              className="mt-4 text-lg font-semibold text-gray-900"
            >
              {title}
            </DialogTitle>
            <p id="modal-description" className="mt-2 text-sm text-gray-500">
              {message}
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white ${
                type === "success"
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-[#fa2d31] hover:bg-[#d72024]"
              }`}
            >
              {button_txt}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
