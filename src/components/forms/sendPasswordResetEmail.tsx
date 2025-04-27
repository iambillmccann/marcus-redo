"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner"; // For notifications

interface ForgotPasswordFormValues {
    email: string;
}

export function ForgotPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: "",
        },
    });

    const handlePasswordReset = async (values: ForgotPasswordFormValues) => {
        setIsSubmitting(true);
        try {
            await sendPasswordResetEmail(auth, values.email);
            toast.success("Password reset email sent. Please check your inbox.");
        } catch (error: unknown) {
            toast.error("Failed to send password reset email. Please try again.");
            console.error("Password reset error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(handlePasswordReset)}
            className="space-y-4 w-full max-w-sm mx-auto"
        >
            <h1 className="text-2xl font-semibold text-left">Reset your fucking password</h1>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...form.register("email", { required: "Email is required" })}
                />
                {form.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Reset fucking password"}
            </Button>
        </form>
    );
}