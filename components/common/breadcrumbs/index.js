


export default function Breadcrumbs() {

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none text-gray-500 divide-x divide-grey-400">
        <li className="pr-4 hover:text-green-600"><a href="#">Mua</a></li>
        <li className="px-4 hover:text-green-600"><a href="#">Đơn hàng của tôi</a></li>
        <li className="px-4 hover:text-green-600"><a href="#">Tất cả đơn hàng</a></li>
      </ol>
    </nav>
  )
}
