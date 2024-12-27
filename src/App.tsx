import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "./components/Select.tsx";
import Button from "./components/CustomButton.tsx";
import Input from "./components/Input.tsx";
import { Card, CssBaseline } from "@mui/material";

const names: string[] = [
  "India",
  "America",
  "United Kingdom",
  "Italy",
  "China",
  "Sri Lanka",
  "Bangladesh",
  "Bhutan",
];

const schema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 8 characters")
      .nonempty("Name is required"),
    password: z.string().nonempty("Password is required"),
    country: z.string().optional(),
  });

type FormData = z.infer<typeof schema>;

const App = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isValid,
    },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      country: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);

    setIsSubmittingForm(true);

    setTimeout(() => {
      setIsSubmittingForm(false);
      reset();
    }, 2000);
  };

  return (
    <>
      <CssBaseline />
      <div className="h-screen flex items-center justify-center px-10">
        <Card className="!bg-slate-300 px-6 py-10 rounded-lg shadow-md w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Form
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-medium text-xl text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter your Name"
                value={watch("name")}
                {...register("name")}
                errorText={errors.name?.message}
                type="text"
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block font-medium text-xl text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={watch("password")}
                {...register("password")}
                errorText={errors.password?.message}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block font-medium text-xl text-gray-700"
              >
                Country
              </label>
              <Select
                options={names}
                selectedValues={watch("country") || ""}
                onChange={(value) => setValue("country", value)}
                disabled={false}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full text-xl mt-6"
              disabled={!isValid || isSubmittingForm} 
              isLoading={isSubmittingForm} 
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default App;