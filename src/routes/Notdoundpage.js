import { Link } from "react-router-dom"

export default function Notfoundpage(params) {
  return (
    <div className=" m-10 flex items-start justify-between">
      <div className="">
        <h1 className=" text-8xl">404</h1>
        <h2 className="text-5xl mb-5">Page not found</h2>
        <div className="mt-8 text-gray-400 w-4/5">
          <h3 className="">
            &#8222;Жыві і цэльнасці шукай, aб шыраце духоўнай дбай...&#8221;
          </h3>
          <span className="flex justify-end">&#169; Максім Багдановіч</span>
        </div>
      </div>
      <Link
        to="/"
        className="border border-gray-400 mr-0 px-8 pb-2 pt-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
      >
        To home
      </Link>
    </div>
  )
}
