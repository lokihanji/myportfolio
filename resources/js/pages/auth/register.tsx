import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, User, Lock, Mail, UserPlus } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Head title="Register">
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
                        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join us and start your journey</p>
                    </div>

                    {/* Register Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        <Form
                            method="post"
                            action={route('register')}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                        >
                            {({ processing, errors }) => (
                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Enter your full name"
                                                className="w-full mt-2 pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                        </div>
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

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
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="w-full mt-2 pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="w-full mt-2 pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                                tabIndex={4}
                                            >
                                                {showPassword ? (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-300">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                            <Input
                                                id="password_confirmation"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                tabIndex={5}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirm your password"
                                                className="w-full mt-2 pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-200 p-1"
                                                tabIndex={6}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        tabIndex={7}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <LoaderCircle className="h-5 w-5 animate-spin" />
                                                <span>Creating account...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <UserPlus className="h-5 w-5" />
                                                <span>Create Account</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <TextLink 
                                    href={route('login')} 
                                    className="text-green-400 hover:text-green-300 font-medium transition-colors" 
                                    tabIndex={8}
                                >
                                    Log in
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
