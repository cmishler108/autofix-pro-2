import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@nextui-org/react';
import { getStorage, removeStorage } from '@/app/utils/helper';
import { useEffect, useState } from 'react';

export default function CustomHeader() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Parse user from storage (if available)
        if (typeof window !== 'undefined') {
            const u = getStorage('user');
            try {
                setUser(u ? JSON.parse(u) : null);
            } catch {
                setUser(null);
            }
        }
    }, []);

    const handleLogout = async () => {
        // Optional: Call backend logout API to blacklist refresh token
        const refresh = getStorage('refresh_token');
        if (refresh) {
            try {
                await fetch('/users/logout/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh }),
                });
            } catch (e) {
                // Ignore errors for now
            }
        }
        removeStorage('access_token');
        removeStorage('refresh_token');
        removeStorage('user');
        router.push('/sign-in');
    };

    // Helper to get initials
    const getInitials = (user: any) => {
        if (!user) return 'U';
        if (user.first_name && user.last_name) {
            return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        }
        if (user.first_name) return user.first_name[0].toUpperCase();
        if (user.email) return user.email[0].toUpperCase();
        return 'U';
    };

    // Helper to get display name
    const getDisplayName = (user: any) => {
        if (!user) return '';
        if (user.first_name && user.last_name) {
            return `${user.first_name} ${user.last_name}`;
        }
        if (user.first_name) return user.first_name;
        return user.email || '';
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-1"
                    >
                        <span className="inline-block w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xl">D</span>
                        <span>oneEZ</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-full hover:bg-emerald-50 transition">
                                        <Avatar
                                            size="md"
                                            src={user.profile_picture || undefined}
                                            name={getInitials(user)}
                                            className="bg-emerald-100 text-emerald-700 font-bold text-lg rounded-full"
                                        />
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Account Actions"
                                    className="rounded-xl min-w-[300px] shadow-lg border border-emerald-100 bg-white py-2 px-1"
                                >
                                    <DropdownItem
                                        key="userinfo"
                                        isDisabled
                                        className="flex flex-row items-center gap-4 px-4 py-3 border-b border-gray-100 mb-1 cursor-default bg-white"
                                    >

                                       <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        
                                        <Avatar
                                            size="md"
                                            src={user.profile_picture || undefined}
                                            name={getInitials(user)}
                                            className="bg-emerald-100 text-emerald-700 font-bold text-lg rounded-full"
                                            />
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900 text-base leading-tight">
                                                {user.first_name} {user.last_name}
                                            </span>
                                            <span className="text-sm text-gray-500 font-normal break-all">
                                                {user.email}
                                            </span>
                                        </div>
                                            </div>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        color="danger"
                                        onClick={handleLogout}
                                        className="rounded-lg px-3 py-2 hover:bg-emerald-50 hover:text-[#10B981] transition-colors font-medium"
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <Link href="/sign-in">
                                <button
                                    className="inline-flex items-center px-5 py-2 border border-transparent text-base font-semibold rounded-full text-white bg-[#10B981] hover:bg-[#059669] transition"
                                >
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}