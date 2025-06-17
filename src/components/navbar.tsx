// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "../components/ui/navigation-menu";

// import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import pict1 from "../assets/FAvicon.png";
export default function Navbar() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "", // We will ignore this
  };

  const getInitials = (fullName: string) => {
    const [first = "", second = ""] = fullName.split(" ");
    return (first[0] || "") + (second[0] || "");
  };

  return (
    <nav className="w-full border-b bg-[#0f172a] text-[#ffffff] pr-[24px] py-3 ">
      <div className="flex justify-between items-center">
        {/* Left: Logo and App Name */}
        <div className="flex items-center gap-[4px]">
          <img src={pict1} alt="Logo" className="w-[40px] h-[40px] rounded" />
          <h1 className="text-lg font-bold text-white">My Todo App</h1>
        </div>

        {/* Center: Navigation */}
        {/* <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/taskplanner" className="hover:underline">
                  Task Planner
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        {/* Right: User Info */}
        <div className="flex items-center gap-[12px]">
          <Avatar className="w-[40px] h-[40px] bg-[#cbd5e1] text-[#0f172a] font-semibold">
            {/* We skip AvatarImage entirely */}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="text-right text-sm leading-none">
            <p className="font-medium leading-[0px] text-start">{user.name}</p>
            <p className="text-gray-400 text-[12px] leading-[0px]">
              {user.email}
            </p>
          </div>
        </div>

        {/* </div> */}
      </div>
    </nav>
  );
}
