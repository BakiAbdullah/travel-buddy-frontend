"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/services/auth/loginUser";

const DEMO_CREDENTIALS = {
  admin: {
    email: "admin@gmail.com",
    password: "1234567",
  },
  user: {
    email: "baki@gmail.com",
    password: "1234567",
  },
};

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const fillDemoCredentials = (role: "admin" | "user") => {
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
  };

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
      {/* 🔽 Demo Credentials Section */}
      <div className="mt-6 border-t pt-4">
        <p className="mb-3 text-center text-sm text-muted-foreground">
          Demo Credentials
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Button
            className="cursor-pointer"
            variant="outline"
            type="button"
            onClick={() => fillDemoCredentials("admin")}
          >
            Log in as Admin
          </Button>

          <Button
            className="cursor-pointer"
            variant="outline"
            type="button"
            onClick={() => fillDemoCredentials("user")}
          >
            Log in as User
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
