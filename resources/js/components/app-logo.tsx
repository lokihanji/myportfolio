import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 shadow-lg">
                <AppLogoIcon className="size-6 fill-current text-white" />
            </div>
            <div className="ml-3 grid flex-1 text-left">
                <span className="text-sm min-w-20 font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Portfolio Admin
                </span>
            </div>
        </>
    );
}
