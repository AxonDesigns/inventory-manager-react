import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserForm from "@/components/UserForm";
import { ExpandedUser, UserRole } from "@/lib/types";
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
    const { data: roles } = useSWR("/api/user-roles", rolesFetcher);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="mx-8 mt-4 animate-fade-in-up duration-200 ease-out-slow">
            <div className="flex items-center mb-4">
                <h1 className="text-5xl font-bold flex-1">Users</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus />
                            <span>Add User</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>New User</DialogTitle>
                        </DialogHeader>
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
                                    setIsDialogOpen(false);
                                }
                            }}
                            onCancel={() => setIsDialogOpen(false)}
                            roles={roles}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="min-h-[300px] flex-1 overflow-clip">
                <Table >
                    <TableCaption>A list of registered users.</TableCaption>
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
                            <TableHead align="right" className="bg-sidebar rounded-tr-lg">
                                Actions
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <EllipsisVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Edit /> <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
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
    )
}
