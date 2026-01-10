"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Modal from "@/app/components/ui/modal";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default function Form() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData> & { terms?: string }>(
    {}
  );
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [modalData, setModalData] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
    button_txt: "",
  });
  const closeModal = () => setModalData((prev) => ({ ...prev, isOpen: false }));

  const cleanPhoneNumber = (input: string): string => {
    return input.replace(/[^\d+]/g, "");
  };

  const validatePhoneNumber = (cleanedNumber: string): boolean => {
    return /^\+?\d{7,15}$/.test(cleanedNumber);
  };

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return t("errors_firstNameRequired");
        if (!/^[a-zA-Zа-яА-ЯёЁїЇєЄґҐõÕäÄöÖüÜіІ'-]+$/.test(value.trim())) {
          return t("errors_firstNameInvalid");
        }
        return null;
      case "lastName":
        if (!value.trim()) return t("errors_lastNameRequired");
        if (!/^[a-zA-Zа-яА-ЯёЁїЇєЄґҐõÕäÄöÖüÜіІ'-]+$/.test(value.trim())) {
          return t("errors_lastNameInvalid");
        }
        return null;
      case "email":
        if (!value.trim()) return t("errors_emailRequired");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return t("errors_emailInvalid");
        return null;
      case "phoneNumber":
        if (!value.trim()) return t("errors_phoneRequired");
        const cleanedNumber = cleanPhoneNumber(value);
        if (!validatePhoneNumber(cleanedNumber))
          return t("errors_phoneInvalid");
        return null;
      case "message":
        if (!value.trim()) return t("errors_messageRequired");
        if (value.length < 10) return t("errors_messageShort");
        if (value.length > 500) return t("errors_messageLong");
        return null;
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
    if (e.target.checked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Partial<FormData & { terms: string }> = {};
    Object.keys(formData).forEach((key) => {
      const field = key as keyof FormData;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (!termsAccepted) {
      newErrors.terms = t("errors_termsRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cleanedPhoneNumber = cleanPhoneNumber(formData.phoneNumber);

    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phoneNumber: cleanedPhoneNumber,
        }),
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setTermsAccepted(false);
      setModalData({
        isOpen: true,
        type: "success",
        title: t("form_success_title"),
        message: t("form_success_text"),
        button_txt: t("form_modal_button_txt"),
      });
    } catch (error) {
      console.error("Ошибка при отправке формы", error);
      setModalData({
        isOpen: true,
        type: "error",
        title: t("form_error_sending_title"),
        message: t("form_error_sending_description"),
        button_txt: t("form_modal_button_txt"),
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="px-6 pb-20 pt-10 lg:px-8 "
      >
        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-900"
              >
                {t("form_first_name")}
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900"
                />
                {errors.firstName && (
                  <p className=" mt-1 text-sm text-rose-600 font-semibold">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-900"
              >
                {t("form_last_name")}
              </label>
              <div className="mt-2.5">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-rose-600 font-semibold">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900"
              >
                {t("from_email")}
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-rose-600 font-semibold">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-gray-900"
              >
                {t("form_phone_number")}
              </label>
              <div className="mt-2.5">
                <input
                  placeholder="+372 000 00 00"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-900"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-rose-600 font-semibold">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                {t("form_message")}
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/30 px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-rose-600 font-semibold">
                    {errors.message}
                  </p>
                )}
              </div>{" "}
              {/* checkbox */}
              <div className="mt-6 flex gap-3 items-center">
                <div className="flex h-5 shrink-0 items-center ">
                  <div className="group grid grid-cols-1 ">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={handleCheckboxChange}
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#9551c9] checked:bg-[#9551c9] indeterminate:border-[#9551c9] indeterminate:bg-[#9551c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9551c9] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:checked]:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-500">
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold transition-colors duration-200 hover:text-[#9551c9]  block p-1"
                  >
                    {t("form_terms")}
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-sm text-rose-600 font-semibold">
                  {errors.terms}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-[#9551c9]  px-3.5 py-2.5 text-xl font-semibold text-white  focus:outline-2 focus:outline-black block w-full hover:bg-[#8646b7]"
            >
              {t("form_button_txt")}
            </button>
          </div>
        </div>
      </form>
      {/* modal window */}
      <Modal {...modalData} onClose={closeModal} />
    </>
  );
}
