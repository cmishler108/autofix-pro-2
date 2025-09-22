'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '../../headers/DashBoardHeader/dashboardheader';
import { Card, CardBody, Input, Button, Textarea } from '@nextui-org/react';
import { getStorage } from '@/app/utils/helper';
import { redirect } from 'next/navigation';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [isMechanic, setIsMechanic] = useState(false);

    useEffect(() => {
        const u = getStorage('user');
        try {
            const parsed = u ? JSON.parse(u) : null;
            setUser(parsed);
            setIsMechanic(parsed?.role === 'mechanic');
        } catch {
            setUser(null);
        }
    }, []);

    const accessToken = getStorage('access_token');
    if (!accessToken) {
        redirect('/');
    }

    return (
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <DashboardHeader />

            <div className="mt-6 flex flex-col items-center w-full">
                <div className="max-w-[600px] w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-md shadow-[0_2px_2px_0_rgba(224,226,230,.5)]">
                    {!isMechanic ? (
                        <Card radius="none">
                            <CardBody>
                                <div className="flex flex-col gap-8 w-full p-4">
                                    <Input
                                        type="text"
                                        label="First Name"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        value={user?.first_name || ''}
                                        readOnly
                                    />
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        value={user?.last_name || ''}
                                        readOnly
                                    />
                                    <Input
                                        type="email"
                                        label="Email"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        value={user?.email || ''}
                                        readOnly
                                    />
                                    <Input
                                        type="phone"
                                        label="Phone"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        value={user?.phone || ''}
                                        readOnly
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    ) : (
                        <Card radius="none">
                            <CardBody>
                                <div className="flex flex-col gap-8 w-full p-4">
                                    <Input
                                        type="text"
                                        label="Business Name"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        defaultValue={user?.business_name || ''}
                                    />
                                    <Input
                                        type="text"
                                        label="Contact Email"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        defaultValue={user?.email || ''}
                                    />
                                    <Input
                                        type="phone"
                                        label="Contact Phone"
                                        size="md"
                                        radius="sm"
                                        variant="bordered"
                                        defaultValue={user?.phone || ''}
                                    />
                                    <Textarea
                                        label="Services Offered"
                                        placeholder="E.g. Oil Change, Tire Rotation, Brake Repair"
                                        minRows={2}
                                        defaultValue={user?.services?.join(', ') || ''}
                                    />
                                    <Textarea
                                        label="Availability Hours"
                                        placeholder="E.g. Mon-Fri 9am-6pm"
                                        minRows={1}
                                        defaultValue={user?.availability || ''}
                                    />
                                    <Button
                                        color="primary"
                                        size="lg"
                                        className="max-w-[220px] text-[18px]"
                                    >
                                        Update Business Info
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
