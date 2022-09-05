import axios from "axios";
import { Navbar } from "flowbite-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";

const Navigation = () => {
  // let router = useRouter();
  let { state } = useContext(GlobalContext);
  let { user, setUser } = state;

  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  const [displaySearch, setDisplaySearch] = useState(false);

  useEffect(() => {
    if (Cookies.get("token_user") !== undefined) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, [search, setSearch]);

  const handleLogout = () => {
    Cookies.remove("token_user");
    Cookies.remove("user");
    window.location = "/auth/user-login";
    // router.push("/auth/user-login");
  };

  const handleSearch = (e) => {
    setDisplaySearch(true);
    setSearch(e.target.value);

    if (search !== "") {
      axios.get(`https://service-example.sanbercloud.com/api/product`).then((res) => {
        // console.log(res)

        let data = res.data.filter((res) => {
          return res.available !== 0;
        });
        console.log(data);

        let searchData = data.filter((res) => {
          return Object.values(res).join(" ").toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
        });

        setData(searchData);
      });
    }
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <div className="container mx-auto flex flex-wrap items-center justify-between p-5">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-black">website.id</span>
        </Navbar.Brand>
        <div className="flex md:hidden lg:hidden ">
          <a href="#" className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700" aria-current="page">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </a>
          <Navbar.Toggle />
        </div>
        <div className="grow px-0 lg:px-10">
          <form className="relative">
            <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg aria-hidden="true" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                onChange={handleSearch}
                value={search}
                type="search"
                id="default-search"
                className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 lg:mt-0"
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
            {displaySearch && (
              <div className="absolute z-10 w-full border bg-white p-5">
                <div className="pb-2">
                  <button
                    onClick={() => {
                      setDisplaySearch(false);
                      setSearch("");
                    }}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {data !== null &&
                  data.map((res) => {
                    return (
                      <span key={res.id} onClick={() => router.push(`/detail-product/${res.id}`)} className="block cursor-pointer border-b-2 pb-2 text-black">
                        {res.product_name}
                      </span>
                    );
                  })}
              </div>
            )}
          </form>
        </div>
        <Navbar.Collapse>
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li className="border-r-2 border-gray-700 pr-5">
              <Link href="/user/checkout">
                <a className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700" aria-current="page">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </a>
              </Link>
            </li>
            {!user && (
              <li>
                <Link href="auth/user-login">
                  <a className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                    Login
                  </a>
                </Link>
              </li>
            )}
            {user && (
              <li>
                <span
                  onClick={handleLogout}
                  className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
