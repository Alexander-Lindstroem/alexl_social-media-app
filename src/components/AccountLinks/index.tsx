import LogOut from "@/components/LogOut";
import { UserContextType, useUser } from "@/providers/user-context-provider";
import { MobileMenuItem } from "../MobileMenuItem";

const AccountLinks = () => {
  const { user, setUser } = useUser() as UserContextType;

  return (
    <div className="flex md:flex-row flex-col md:gap-2">
      <MobileMenuItem href="/categories" title="Browse" />
      {user ? (
        <>
          <MobileMenuItem href="/create" title="Create Post" />
          <LogOut />
        </>
      ) : (
        <MobileMenuItem href="/auth/login" title="Log In" />
      )}
    </div>
  );
};

export default AccountLinks;
