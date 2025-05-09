import InputText from "@/components/input/input-text";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPassword from "@/components/input/input-password";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useTransition } from "react";
import API from "@/api/api";

interface ILogin {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    startTransition(async () => {
      const response = await API.post("/auth/local", {
        identifier: data.email,
        passwrod: data.password,
      });
      console.log(response);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <InputText
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          error={errors?.email?.message}
        />
        <InputPassword
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          error={errors?.password?.message}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
