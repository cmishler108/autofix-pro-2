import Link from 'next/link';

export default function CustomHeader() {
    return (
        <div className="flex min-h-[80px] p-[12px] lg:px-6 shadow-[0_.125rem_.25rem_rgba(0,0,0,0.075)]">
            <div className="flex flex-row items-center w-full">
                <div className="text-[30px] text-black">
                    <Link href={'/'}>DoneEZ</Link>
                </div>

                <div className="ml-auto mr-2">
                    <Link href={'/sign-in'}>
                        <button
                            className="px-[24px] py-[8px] text-[16px] rounded-md shadow-[inset_0_1px_0_hsla(0,0%,100%,.15),_0_1px_1px_rgba(51,51,51,.115)] bg-[#009ed5] hover:bg-[#0082af] border-[#009ed5]
                            hover:border-[#0078a2] active:border-[1px] active:border-solid text-white"
                        >
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
