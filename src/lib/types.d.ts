export type UserRole = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export type User = {
    id: string;
    name: string;
    email: string;
    role_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ExpandedUser = Omit<User, "role_id"> & {
    role: UserRole;
};