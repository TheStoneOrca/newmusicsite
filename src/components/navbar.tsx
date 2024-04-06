"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Book,
  Computer,
  Loader2Icon,
  Menu,
  ShoppingCartIcon,
} from "lucide-react";
import useUser from "@/app/hooks/getuser";

export default function Navbar() {
  const { isReady, isSignedIn, user } = useUser();
  return (
    <>
      {isReady ? (
        <div className="flex items-center w-full h-12 bg-black text-white gap-x-2">
          <div className="p-3 ml-2">
            <Link href="/">Orca's Music</Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex gap-x-2 text-1xl">
                  Music <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Music Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/music/orchestra">Orchestra</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music/strings">Strings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music/band">Band</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music/piano">Piano</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music/rock">Rock</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music/solo">Solo</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/music">All</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isReady ? (
            <>
              {isSignedIn && (
                <>
                  <div className="flex justify-end">
                    <Link href="/cart">
                      <ShoppingCartIcon />
                    </Link>
                  </div>
                  <div className="flex justify-end">
                    <Link href="/library">
                      <Book />
                    </Link>
                  </div>
                  {user?.role === "admin" ||
                    (user?.role === "owner" && (
                      <div className="flex justify-end">
                        <Link href="/control-panel">
                          <Computer />
                        </Link>
                      </div>
                    ))}
                </>
              )}
            </>
          ) : (
            <Loader2Icon className="animate-spin" />
          )}
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </>
  );
}
