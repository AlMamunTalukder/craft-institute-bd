"use client";

import { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProviderProps = {
  children: ReactNode;
} & TFormConfig;

export const FormContextProvider = ({ children }: TFormProviderProps) => {
  const formConfig: TFormConfig = {};

  const methods = useForm(formConfig);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
