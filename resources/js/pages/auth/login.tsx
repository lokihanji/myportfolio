import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Form, Head, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { LoaderCircle, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
    
interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Log in">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-6">
                            <div className="text-3xl font-bold text-green-400 hover:text-green-300 transition-colors">
                                Edizon Tabac
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to your account to continue</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <Form method="post" action={route('login')} resetOnSuccess={['password']}>
                            {({ processing, errors }) => (
                                <div className="space-y-6">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="Enter your email"
                                                className="w-full mt-2 pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                        </div>
                                        {errors.email && <InputError message={errors.email} />}
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                                Password
                                            </label>
                                            {canResetPassword && (
                                                <TextLink 
                                                    href={route('password.request')} 
                                                    className="text-sm text-green-400 hover:text-green-300 transition-colors" 
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                                tabIndex={3}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && <InputError message={errors.password} />}
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center space-x-3">
                                            <Input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            tabIndex={4}
                                            className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <label htmlFor="remember" className="text-sm text-gray-300">
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        tabIndex={5}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <LoaderCircle className="h-5 w-5 animate-spin" />
                                                <span>Signing in...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <User className="h-5 w-5" />
                                                <span>Sign In</span>
                                            </div>
                                        )}
                                    </Button>

                                    {/* Status Message */}
                                    {status && (
                                        <div className="text-center p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                                            <span className="text-sm font-medium text-green-400">{status}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <TextLink 
                                    href={route('register')} 
                                    className="text-green-400 hover:text-green-300 font-medium transition-colors" 
                                    tabIndex={5}
                                >
                                    Sign up
                                </TextLink>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500">
                            &copy; 2025 Edizon Tabac. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
