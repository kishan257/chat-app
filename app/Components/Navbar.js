"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useUser()

    console.log('user**********************', user)

    return (
        <nav className=" relative bg-slate-600 text-white shadow-md  w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-white text-white">ChatApp</Link>
                    </div>

                    {/* Menu button (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md focus:outline-none text-gray-600 hover:text-gray-900"
                        >
                        </button>
                    </div>

                    {/* Navbar Links */}
                    <div
                        className={`${isOpen ? "block" : "hidden"
                            } md:flex md:items-center w-full md:w-auto`}
                    >
                        <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
                            <Link href="/" className="text-white hover:text-indigo-600 transition">Home</Link>
                            <Link href="/" className="text-white hover:text-indigo-600 transition">Forums</Link>
                            <Link href="/" className="text-white hover:text-indigo-600 transition">UserChat</Link>
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
