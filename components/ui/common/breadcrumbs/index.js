import { ActiveLink } from "@components/ui/common"

export default function Breadcrumbs({ items }) {

  return (
    <nav aria-label="breadcrumb" className="">
      <ol className="flex leading-none text-gray-500 divide-x divide-grey-400">
        {items.map((item, i) =>
          <li key={item.href} className={`${i == 0 ? "pr-4" : "px-4"} font-medium text-gray-500 hover:text-green-600`}>
            <ActiveLink href={item.href}>
              <a>
                {item.value}
              </a>
            </ActiveLink>
          </li>
        )}
      </ol>
    </nav>
  )
}
