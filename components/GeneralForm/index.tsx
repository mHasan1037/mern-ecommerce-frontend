"use client";
import React, { useState } from "react";
import styles from "./GeneralForm.module.css";
import { IoMdClose } from "react-icons/io";
import ConfirmButton from "../buttons/ConfirmButton";

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
    onsubmit(formData);
  };

  return (
    <div className={styles.background}>
      <div className={styles.mainContainer}>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{title}</h2>
          <IoMdClose className="cursor-pointer" onClick={()=> onclose(null)}/> 
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
          <div className="flex justify-between items-center mt-3">
            <div>{footerText && footerText}</div>
            <ConfirmButton buttonText={submitText} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralForm;
