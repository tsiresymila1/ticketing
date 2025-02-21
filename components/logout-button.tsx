"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";

export default function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut({
      redirect: true,
      callbackUrl: '/auth/login'
    })
    }>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem >

  );
}
