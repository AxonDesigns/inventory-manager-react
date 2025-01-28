"use client"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    PasswordInput
} from "@/components/ui/password-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ExpandedUser, UserRole } from "@/lib/types"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useEffect } from "react"
import {
    useForm
} from "react-hook-form"
import {
    toast
} from "sonner"
import * as z from "zod"

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(1, "Name is required"),
    roleId: z.string({
        required_error: "Role is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email("Invalid email"),
    password: z.string({
        required_error: "Password is required",
    }).min(1, "Password is required"),
});

interface UserFormProps {
    onSubmit?: (values: z.infer<typeof formSchema>) => void;
    onCancel?: () => void;
    roles?: UserRole[];
    defaultValues?: ExpandedUser;
    submitText?: string;
}

export default function UserForm({ onSubmit, onCancel, roles, defaultValues, submitText }: UserFormProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roleId: defaultValues?.role.id ?? roles?.[0]?.id,
            ...defaultValues
        }
    });

    useEffect(() => {
        form.reset(defaultValues);
        console.log("defaultValues", defaultValues);
        console.log("roles", roles);
    }, [defaultValues]);

    function _onSubmit(values: z.infer<typeof formSchema>) {
        try {
            onSubmit?.(values);
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-4">

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-7">

                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: true, minLength: 1 }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            type=""
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-5">

                        <FormField
                            control={form.control}
                            name="roleId"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {roles?.map((role) => (
                                                <SelectItem key={role.id} value={role.id}>{role.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email@example.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onCancel} type="button">Cancel</Button>
                    <Button type="submit">{submitText ?? "Submit"}</Button>
                </div>
            </form>
        </Form>
    )
}