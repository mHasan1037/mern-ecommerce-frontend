"use client";
import React, { useState } from "react";
import styles from "./GeneralForm.module.css";
import { IoMdClose } from "react-icons/io";
import ConfirmButton from "../buttons/ConfirmButton";
import { toast } from "react-toastify";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

interface GeneralFormProps {
  title: string;
  fields: Field[];
  onsubmit: (formData: Record<string, string>) => void;
  onclose: (value: null) => void;
  submitText: string;
  footerText?: React.ReactNode;
}

const GeneralForm: React.FC<GeneralFormProps> = ({
  title,
  fields,
  onsubmit,
  onclose,
  submitText,
  footerText,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordField = fields.find((f) => f.type === 'password');
    if(passwordField){
      const passwordValue = (formData as any)[passwordField.name] || "";
       if (passwordValue.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

    }
    onsubmit(formData);
  };

  return (
    <div className={styles.background}>
      <div className={styles.mainContainer}>
        <div className="flex items-start justify-between gap-4 border-b border-mist pb-4">
          <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
          <IoMdClose className="storefront-focus cursor-pointer text-ink/60 transition hover:text-ink" onClick={()=> onclose(null)}/> 
        </div>
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            {fields?.map((field) => (
              <div key={field.name} className={styles.fieldBox}>
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field?.placeholder}
                  onChange={handleChange}
                  required={field.required}
                  className={styles.inputStyle}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-ink/60">{footerText && footerText}</div>
            <ConfirmButton buttonText={submitText} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralForm;
