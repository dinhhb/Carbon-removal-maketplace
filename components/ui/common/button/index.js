

export default function Button({
    children,
    className,
    hoverable = true,
    variant = "green",
    ...rest
}) {

    const variants = {
        green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`
    }

    return (
        <div className="rounded-md shadow">
            <button
                {...rest}
                className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}>
                {children}
            </button>
        </div>
    )
}