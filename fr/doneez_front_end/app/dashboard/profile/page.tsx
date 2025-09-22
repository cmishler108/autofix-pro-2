'use client';

import { useState } from 'react';
import DashboardHeader from '../../headers/DashBoardHeader/dashboardheader';
import { Tabs, Tab, Card, CardBody, Input, Button } from '@nextui-org/react';
import { getStorage } from '@/app/utils/helper';
import { redirect } from 'next/navigation';

export default function Profile() {
    const [selected, setSelected] = useState<string>('All Quotes');

    const accessToken = getStorage('access_token');
    if (!accessToken) {
        console.log(accessToken);
        redirect('/');
    }

    return (
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <DashboardHeader />

            <div className="mt-6 flex flex-col items-center w-full">
                <div className="max-w-[1280px] w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-md shadow-[0_2px_2px_0_rgba(224,226,230,.5)]">
                    <Tabs
                        aria-label={'Options'}
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        variant="underlined"
                        color="primary"
                        classNames={{
                            tabList:
                                'max-md:flex-wrap gap-0 w-full rounded-none',
                            tab: 'max-md:w-auto',
                            cursor: 'w-full bg-[#22d3ee]',
                            tabContent:
                                'group-data-[selected=true]:text-[#06b6d4]',
                        }}
                    >
                        <Tab key={'Account Info'} title="Account Info">
                            <Card radius="none">
                                <CardBody>
                                    <div className="flex flex-col gap-8 w-full p-4">
                                        <Input
                                            type="text"
                                            label="First Name"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                            defaultValue="Daniil"
                                        />
                                        <Input
                                            type="text"
                                            label="Last Name"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                            defaultValue="Nikolaev"
                                        />
                                        <Input
                                            type="email"
                                            label="Emaill"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                            defaultValue="star@gmail.com"
                                        />
                                        <Input
                                            type="phone"
                                            label="Phone"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                            defaultValue=""
                                        />
                                        <Button
                                            color="danger"
                                            size="lg"
                                            className="max-w-[220px] text-[18px]"
                                        >
                                            Update Information
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Password" title="Password">
                            <Card>
                                <CardBody>
                                    <div className="flex flex-col gap-8 w-full p-4">
                                        <Input
                                            type="password"
                                            label="Current Password"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                        />
                                        <Input
                                            type="password"
                                            label="New Password"
                                            size="md"
                                            radius="sm"
                                            variant="bordered"
                                        />
                                        <Button
                                            color="danger"
                                            size="lg"
                                            className="max-w-[220px] text-[18px]"
                                        >
                                            Update Information
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Vehicle" title="Vehicle">
                            <Card>
                                <CardBody>
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Reviews" title="Reviews">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
