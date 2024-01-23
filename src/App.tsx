import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const messages = {
  required: "Povinný údaj",
  email: "Nesprávny formát emailu",
  passwordMin: ({ min }: { min: number }) =>
    `Heslo musí mať aspoň ${min} znakov`,
};

const schema = yup
  .object({
    email: yup.string().required(messages.required).email(messages.email),
    password: yup
      .string()
      .required(messages.required)
      .min(5, messages.passwordMin),
  })
  .required();

export default function App() {
  const { handleSubmit, control, formState } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) =>
    console.info({ ...data });

  return (
    <div className="max-w-xs mx-auto p-4 min-h-screen justify-center flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <div>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                required
                error={!!formState.errors.email}
                className="w-full"
              />
            )}
          />
          {!!formState.errors.email && (
            <p role="alert" className="text-red-500">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Heslo"
                required
                error={!!formState.errors.password}
                className="w-full"
              />
            )}
          />
          {!!formState.errors.password && (
            <p role="alert" className="text-red-500">
              {formState.errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" variant="contained" size="large">
          Prihlásiť
        </Button>
      </form>
    </div>
  );
}
