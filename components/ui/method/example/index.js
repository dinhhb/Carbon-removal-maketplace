

export default function Example({price,
  durability,
  scale,
  alsoBoughtBy,
  overview,
  science,
  researchPapers,
  supplier,
  projectLocation}) {
  return (
    <section>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
              <dt className="text-2xl font-medium leading-6 text-gray-900">Tổng quan</dt>
                {overview.split('\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "mt-3 text-base text-gray-500 sm:mt-5 sm:mx-auto md:mt-5 md:text-xl lg:mx-0" : "mt-1 text-sm leading-6 text-gray-700 sm:col-san-2 sm:mt-0"}>
                    {paragraph}
                  </p>
                ))}
            </div>
            <hr className="my-6 border-t-2 border-gray-200" /> {/* Horizontal line */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
              <dt className="text-2xl font-medium leading-6 text-gray-900">Khoa học</dt>
                {science.split('\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "mt-3 text-base text-gray-500 sm:mt-5 sm:mx-auto md:mt-5 md:text-xl lg:mx-0" : "mt-1 text-sm leading-6 text-gray-700 sm:col-san-2 sm:mt-0"}>
                    {paragraph}
                  </p>
                ))}
            </div>
            <hr className="my-6 border-t-2 border-gray-200" /> {/* Horizontal line */}

            <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
              <dt className="text-2xl font-medium leading-6 text-gray-900">Nhà cung cấp</dt>
                {supplier.split('\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "mt-3 text-base text-gray-500 sm:mt-5 sm:mx-auto md:mt-5 md:text-xl lg:mx-0" : "mt-1 text-sm leading-6 text-gray-700 sm:col-san-2 sm:mt-0"}>
                  {paragraph}
                  </p>
                ))}
            </div>
            <hr className="my-6 border-t-2 border-gray-200" /> {/* Horizontal line */}

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-2xl font-medium leading-6 text-gray-900">Tài liệu nghiên cứu</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="border border-gray-200 divide-y divide-gray-100 rounded-md">
                  { researchPapers.map(researchPaper => 
                    <li key={researchPaper} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex items-center flex-1 w-0">
                        {/* <PaperClipIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" /> */}
                        <div className="flex flex-1 min-w-0 gap-2 ml-4">
                          <span className="font-medium truncate">{researchPaper}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <a href={researchPaper} className="font-medium text-green-600 hover:text-green-500">
                          Mở
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          </div>
          <div className="col-span-1">
            <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
              <dt className="text-2xl font-medium leading-6 text-gray-900">Thông tin chung</dt>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className=" ext-sm font-medium leading-6 text-gray-900">Giá</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {price}
              </dd>
            </div>
            <hr className="my-1 border-t-1 border-gray-200" /> {/* Horizontal line */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Độ bền</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {durability}
              </dd>
            </div>
            <hr className="my-1 border-t-1 border-gray-200" /> {/* Horizontal line */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Quy mô</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {scale}
              </dd>
            </div>
            <hr className="my-1 border-t-1 border-gray-200" /> {/* Horizontal line */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Đã được mua bởi</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-san-2 sm:mt-0">
                {alsoBoughtBy}
              </dd>
            </div>
            <hr className="my-1 border-t-1 border-gray-200" /> {/* Horizontal line */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Địa điểm dự án</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-san-2 sm:mt-0">
                {projectLocation}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}