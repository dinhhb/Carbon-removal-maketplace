const Item = ({ title, value, className }) => {
    return (
        <div className={`${className} px-4 py-2 sm:px-6`}>
            <div className="text-sm font-medium text-gray-500">
                {title}
            </div>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
            </div>
        </div>
    )
}

export default function ManagedMethodCard({ children, method }) {

    return (
        <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
            <div className="border-t border-gray-200">
                <Item
                    className="bg-gray-50"
                    title="ID"
                    value={method.ownedMethodId}
                />
                <Item
                    title="Chuỗi băm"
                    value={method.hash}
                />
                <Item
                    title="Proof"
                    value={method.proof}
                />
                <Item
                    className="bg-gray-50"
                    title="Người mua"
                    value={method.owner}
                />
                <Item
                    title="Giá"
                    value={method.price}
                />
                <Item
                    className="bg-gray-50"
                    title="Trạng thái"
                    value={method.state}
                />
                <div className="bg-white px-4 py-5 sm:px-6">
                    {children}
                </div>
            </div>
        </div>
    )
}