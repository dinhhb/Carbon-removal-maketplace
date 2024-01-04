

export default function List({methods, children}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      { methods.map(method => children(method))}
    </section>
  )
}
