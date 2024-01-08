import { useWeb3 } from '@components/providers';
import Image from 'next/image';
import { ActiveLink, Button } from '@components/ui/common';
import { useAccount } from '@components/hooks/web3';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3()
  const { account } = useAccount()
  const { pathname } = useRouter()

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex h-full items-center">
            <div className="flex items-center"> {/* Updated this line */}
              <Image src="/logo.png" alt="Logo" width={150} height={60} />
            </div>
            <div className="flex space-x-8"> {/* Updated this line */}
              <ActiveLink href="/" >
                <a className="font-medium text-gray-500 hover:text-green-600">
                  Trang chủ
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace" >
                <a className="font-medium text-gray-500 hover:text-green-600">
                  Thị trường
                </a>
              </ActiveLink>
            </div>
            <div className="flex-grow" />
            { isLoading ?
              <Button
                disabled={true}
                onClick={connect}>
                  Đang tải...
              </Button> :
                account.data ?
                <Button
                  hoverable={false}
                  className='cursor-default'>
                  Xin chào {account.isAdmin && "Admin"}
                </Button> :
                requireInstall ?
                <Button 
                  onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                    Tải Metamask
                </Button> :
                <Button onClick={connect}>
                Kết nối
              </Button>
            }
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") &&
        <div className='flex justify-end pt-1 sm:px-6 lg:px-8'>
          <div className='text-white bg-green-600 rounded-md p-2'>
            {account.data}
          </div>
        </div>
      }
    </section>
  );
}
