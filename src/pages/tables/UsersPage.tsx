import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserForm from "@/components/UserForm";
import { ExpandedUser, User, UserRole } from "@/lib/types";
import { format } from "@formkit/tempo";
import axios, { AxiosError } from "axios";
import { Copy, Edit, EllipsisVertical, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const usersFetcher = async (url: string) => {
    const response = await axios.get(url, { baseURL: import.meta.env.VITE_API_URL });
    return await response.data as ExpandedUser[];
};

const rolesFetcher = async (url: string) => {
    const response = await axios.get(url, { baseURL: import.meta.env.VITE_API_URL });
    return await response.data as UserRole[];
};

export const UsersPage = () => {

    const { data: users, mutate } = useSWR("/api/users?expand", usersFetcher, { suspense: true });
    const { data: roles } = useSWR("/api/user-roles", rolesFetcher, { suspense: true });

    const [user, setUser] = useState<User | undefined>();

    const [newDialogOpen, setNewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <>
            <ResponsiveDialog title="New User" isOpen={newDialogOpen} setIsOpen={setNewDialogOpen}>
                <UserForm
                    onSubmit={async (values) => {
                        try {
                            await axios.post("/api/users", values, {
                                baseURL: import.meta.env.VITE_API_URL
                            });

                            toast.success("User created successfully.");
                            mutate();
                        } catch (error) {
                            if (error instanceof AxiosError) {
                                toast.error(error.response?.data.errors);
                            }
                            else {
                                toast.error("An error occurred, please try again.");
                            }
                        } finally {
                            setNewDialogOpen(false);
                        }
                    }}
                    onCancel={() => setNewDialogOpen(false)}
                    roles={roles}
                    submitText="Create"
                />
            </ResponsiveDialog>

            <ResponsiveDialog title="Edit User" isOpen={editDialogOpen} setIsOpen={setEditDialogOpen}>
                <UserForm
                    onSubmit={async (values) => {
                        if (!user) return;
                        try {
                            await axios.put("/api/users/" + user?.id, values, {
                                baseURL: import.meta.env.VITE_API_URL
                            });

                            toast.success("User updated successfully.");
                            mutate();
                        } catch (error) {
                            if (error instanceof AxiosError) {
                                toast.error(error.response?.data.errors);
                            }
                            else {
                                toast.error("An error occurred, please try again.");
                            }
                        } finally {
                            setEditDialogOpen(false);
                        }
                    }}
                    onCancel={() => setEditDialogOpen(false)}
                    roles={roles}
                    defaultValues={user}
                    submitText="Save"
                />
            </ResponsiveDialog>

            <ResponsiveDialog
                title="Are you sure?"
                description="Are you sure you want to delete this user? This will remove it permanently from our servers."
                isOpen={deleteDialogOpen}
                setIsOpen={setDeleteDialogOpen}
            >
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" type="button" onClick={() => {
                        setDeleteDialogOpen(false);
                    }}>Cancel</Button>

                    <Button variant="destructive" type="submit" onClick={async () => {
                        if (!user) return;
                        try {
                            await axios.delete("/api/users/" + user?.id, {
                                baseURL: import.meta.env.VITE_API_URL
                            });

                            toast.success("User deleted successfully.");
                            mutate();
                        } catch (error) {
                            if (error instanceof AxiosError) {
                                toast.error(error.response?.data.errors);
                            }
                            else {
                                toast.error("An error occurred, please try again.");
                            }
                        } finally {
                            setDeleteDialogOpen(false);
                        }
                    }}>Delete</Button>
                </div>
            </ResponsiveDialog>

            <div className="flex flex-col mx-2 sm:mx-8 mt-4 animate-fade-in-up duration-200 ease-out-slow">
                <div className="flex items-center mb-4">
                    <h1 className="text-5xl font-bold flex-1">Users</h1>
                    <Button onClick={() => {
                        setUser(undefined);
                        setNewDialogOpen(true)
                    }}>
                        <Plus /> <span>Add User</span>
                    </Button>
                </div>

                <div>
                    <Table >
                        <TableHeader className="h-14">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="h-14 bg-sidebar rounded-tl-lg flex items-center justify-center">
                                    ID
                                </TableHead >
                                <TableHead className="bg-sidebar">
                                    Name
                                </TableHead>
                                <TableHead className="bg-sidebar">
                                    Email
                                </TableHead>
                                <TableHead className="bg-sidebar">
                                    Role
                                </TableHead>
                                <TableHead className="w-[160px] bg-sidebar">
                                    Created At
                                </TableHead>
                                <TableHead className="w-[160px] bg-sidebar">
                                    Updated At
                                </TableHead>
                                <TableHead align="right" className="bg-sidebar rounded-tr-lg w-[50px]">

                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="w-[2rem]">
                                        <Tooltip >
                                            <TooltipTrigger asChild>
                                                <p className="font-bold text-xs bg-foreground text-background px-2 py-1 rounded-md">ID</p>
                                            </TooltipTrigger>
                                            <TooltipContent align="center" side="right" className="flex gap-2 items-center">
                                                <Button className="p-1 h-auto w-auto" onClick={() => {
                                                    navigator.clipboard.writeText(user.id);
                                                    toast.success("ID copied to clipboard.");
                                                }}>
                                                    <Copy />
                                                </Button>
                                                <p>{user.id}</p>

                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell className="max-w-[100px] overflow-hidden text-ellipsis">
                                        <span className="whitespace-nowrap">
                                            {user.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role.description}</TableCell>
                                    <TableCell>
                                        {format(user.createdAt, { date: "medium", time: "short" })}
                                    </TableCell>
                                    <TableCell>
                                        {format(user.updatedAt, { date: "medium", time: "short" })}
                                    </TableCell>
                                    <TableCell align="right">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <EllipsisVertical />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setUser({
                                                            ...user,
                                                            role_id: user.role.id
                                                        } as User);
                                                        setEditDialogOpen(true);
                                                    }}
                                                >
                                                    <Edit /> <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setUser({
                                                            ...user,
                                                            role_id: user.role.id
                                                        } as User);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    <Trash /> <span>Delete</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </>

    )
}
