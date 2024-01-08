

export default function Button({
    children,
    className,
    hoverable = true,
    variant = "green",
    ...rest
}) {

    const variants = {
        green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
        lightGreen: `text-green-700 bg-green-100 ${hoverable && "hover:bg-green-200"}`
    }

    return (
        <button
            {...rest}
            className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}>
            {children}
        </button>
    )
}