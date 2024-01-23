import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";

interface IFormInputs {
  email: string;
  password: string;
}

export default function App() {
  const { handleSubmit, control, formState } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) =>
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
          {formState.errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Povinný údaj
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
          {formState.errors.password?.type === "required" && (
            <p role="alert" className="text-red-500">
              Povinný údaj
            </p>
          )}
        </div>
        <Button type="submit" variant="contained">
          Prihlásiť
        </Button>
      </form>
    </div>
  );
}
