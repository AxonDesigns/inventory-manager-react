import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './dialog';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from './drawer';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

export function ResponsiveDialog({
    children,
    isSheet = false,
    isOpen,
    setIsOpen,
    title,
    description,
}: {
    children: React.ReactNode;
    isSheet?: boolean;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description?: string;
}) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        if (isSheet) {
            return (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger className='hidden'>

                    </SheetTrigger>
                    <SheetContent className="sm:max-w-[425px]">
                        <SheetHeader className='mb-2'>
                            <SheetTitle>{title}</SheetTitle>
                            {description && (
                                <SheetDescription>{description}</SheetDescription>
                            )}
                        </SheetHeader>
                        {children}
                    </SheetContent>
                </Sheet>
            );
        }
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DrawerHeader>
                <div className='m-6'>
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
}