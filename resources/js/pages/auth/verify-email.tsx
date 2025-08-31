import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Mail, LogOut, Shield } from 'lucide-react';

import TextLink from '@/components/text-link';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification">
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
                        <h1 className="text-2xl font-bold text-white mb-2">Verify Email</h1>
                        <p className="text-gray-400">Please verify your email address to continue</p>
                    </div>

                    {/* Verify Email Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                        {/* Status Message */}
                        {status === 'verification-link-sent' && (
                            <div className="mb-6 text-center p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                                <span className="text-sm font-medium text-green-400">
                                    A new verification link has been sent to the email address you provided during registration.
                                </span>
                            </div>
                        )}

                        <div className="space-y-6 text-center">
                            <Form method="post" action={route('verification.send')}>
                                {({ processing }) => (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <LoaderCircle className="h-5 w-5 animate-spin" />
                                                <span>Sending verification email...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Mail className="h-5 w-5" />
                                                <span>Resend Verification Email</span>
                                            </div>
                                        )}
                                    </button>
                                )}
                            </Form>

                            {/* Logout Link */}
                            <div className="pt-4 border-t border-gray-600">
                                <TextLink 
                                    href={route('logout')} 
                                    method="post" 
                                    className="inline-flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log out</span>
                                </TextLink>
                            </div>
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
