import { Button } from "./button";

interface User {
    name?: string | null;
}

interface AppbarProps {
    user?: User;
    onSignin: () => void; // Specified the type as a function that returns void
    onSignout: () => void; // Specified the type as a function that returns void
}

export const Appbar: React.FC<AppbarProps> = ({
    user,
    onSignin,
    onSignout,
}) => {
    return (
        <div className="flex justify-between items-center border-b px-4 py-2 bg-white shadow-md">
            <div className="text-lg font-bold flex flex-col justify-center">
                PayTM
            </div>
            <div className="flex flex-col justify-center">
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
};
