"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React, { useEffect } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type FormSelectInputProps = {
  name: string;
  options: Options;
  label: string;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isMultiple?: boolean;
  onChange?: (value: any) => void;
};

export default function FormSelectInputWithWatch({
  name,
  options,
  label,
  href,
  toolTipText,
  labelShown = true,
  isMultiple = false,
  onChange,
}: FormSelectInputProps) {
  const method = useFormContext();
  const inputValue = useWatch({
    control: method.control,
    name,
  });

  useEffect(() => {
    if (onChange) {
      onChange(inputValue);
    }
  }, [inputValue, onChange]);

  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
          Select {label}
        </h2>
      )}
      <div className="">
        <Controller
          name={name}
          control={method.control}
          render={({ field: { value }, fieldState: { error } }) => (
            <>
              <Select
                isSearchable
                primaryColor="indigo"
                value={isMultiple ? value || null : value || null}
                onChange={(selected) => {
                  if (isMultiple) {
                    method.setValue(name, selected ? selected : null);
                  } else {
                    method.setValue(name, selected ? selected : null);
                  }
                }}
                options={options}
                placeholder={`Select ${label}`}
                isMultiple={isMultiple}
              />
              {href && toolTipText && (
                <AddNewButton toolTipText={toolTipText} href={href} />
              )}
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}
