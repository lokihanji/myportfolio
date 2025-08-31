import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password">
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
                        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                        <p className="text-gray-400">Enter your email to receive a reset link</p>
                    </div>

                    {/* Forgot Password Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        {/* Status Message */}
                        {status && (
                            <div className="mb-6 text-center p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                                <span className="text-sm font-medium text-green-400">{status}</span>
                            </div>
                        )}

                        <Form method="post" action={route('password.email')}>
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
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="Enter your email"
                                                className="w-full mt-2 pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <LoaderCircle className="h-5 w-5 animate-spin" />
                                                <span>Sending reset link...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Mail className="h-5 w-5" />
                                                <span>Send Reset Link</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>

                        {/* Back to Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Remember your password?{' '}
                                <TextLink 
                                    href={route('login')} 
                                    className="text-green-400 hover:text-green-300 font-medium transition-colors"
                                >
                                    Back to login
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
