import { useWeb3 } from '@components/providers';
import Image from 'next/image';
import Link from 'next/link'
import { Button } from '@components/ui/common';
import { useAccount } from '@components/hooks/web3/useAccount';
import { useRouter } from 'next/router';

export default function Footer() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3()
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
              <Link href="/" 
                className="font-medium text-gray-500 hover:text-green-600">
                Trang chủ
                </Link>
              <Link href="/marketplace" 
                className="font-medium text-gray-500 hover:text-green-600">
                Thị trường
              </Link>
            </div>
            <div className="flex-grow" />
            { isLoading ?
              <Button 
                disabled={true}
                onClick={connect}>Đang load...</Button> :
              (isWeb3Loaded ?
                (account.data ?
                  <Button 
                    hoverable={false} 
                    className='cursor-default'>
                      Xin chào {account.isAdmin && "Admin"}
                  </Button> :
                  <Button onClick={() => window.open("https://metamask.io/download/", "_blank")}>Tải Metamask</Button>)
                : null)
            }
          </div>
        </nav>
      </div>
      { account.data && !pathname.includes("/marketplace") && 
        <div className='flex justify-end pt-1 sm:px-6 lg:px-8'>
          <div className='text-white bg-green-600 rounded-md p-2'>
            {account.data}
          </div>
        </div>
      }
    </section>
  );
}
