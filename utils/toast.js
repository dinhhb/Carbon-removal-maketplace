
import { toast } from 'react-toastify'

export const withToast = (promise) => {
  toast.promise(
    promise,
    {
      pending: {
        render(){
          return (
            <div className="p-6 py-2">
              <p className="mb-2">
                Giao dịch đang được xử lý...
              </p>
            </div>
          )
        },
        icon: false,
      },
      success: {
        render({data}){
          return (
            <div>
              <p className="font-bold">GD: {data.transactionHash.slice(0, 20)}...</p>
              <p>
                Giao dịch thành công.
              </p>
              <a
                href={`https://sepolia.etherscan.io/tx/${data.transactionHash}`}
                target="_blank"
              >
                <i className="text-green-700 underline">Xem thông tin chi tiết</i>
              </a>
            </div>
          )
        },
        // other options
        icon: "🟢",
      },
      error: {
        render({data}){
          // When the promise reject, data will contains the error
          return <div>{data.message ?? "Transaction has failed"}</div>
        }
      }
    },
    {
      closeButton: true
    }
  )
}