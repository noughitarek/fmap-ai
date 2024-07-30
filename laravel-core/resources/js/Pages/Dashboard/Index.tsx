import Webmaster from '@/Layouts/Webmaster';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth, menu }: PageProps) {
    return (
        <>
            <Head title="Tableau de bord" />
            
            <Webmaster
                user={auth.user}
                menu={menu}
                breadcrumb={<li className="breadcrumb-item active" aria-current="page">Tableau de bord</li>}
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 2xl:col-span-9">
                    <div className="grid grid-cols-12 gap-6">
                    {/* BEGIN: General Report */}
                    <div className="col-span-12 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">General Report</h2>
                        <a href="" className="ml-auto flex items-center text-primary">
                            {" "}
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            icon-name="refresh-ccw"
                            data-lucide="refresh-ccw"
                            className="lucide lucide-refresh-ccw w-4 h-4 mr-3"
                            >
                            <path d="M3 2v6h6" />
                            <path d="M21 12A9 9 0 006 5.3L3 8" />
                            <path d="M21 22v-6h-6" />
                            <path d="M3 12a9 9 0 0015 6.7l3-2.7" />
                            </svg>{" "}
                            Reload Data{" "}
                        </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="shopping-cart"
                                    data-lucide="shopping-cart"
                                    className="lucide lucide-shopping-cart report-box__icon text-primary"
                                >
                                    <circle cx={9} cy={21} r={1} />
                                    <circle cx={20} cy={21} r={1} />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    {" "}
                                    33%{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>{" "}
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">4.710</div>
                                <div className="text-base text-slate-500 mt-1">Item Sales</div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="credit-card"
                                    data-lucide="credit-card"
                                    className="lucide lucide-credit-card report-box__icon text-pending"
                                >
                                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                                    <line x1={1} y1={10} x2={23} y2={10} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-danger tooltip cursor-pointer">
                                    {" "}
                                    2%{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-down"
                                        data-lucide="chevron-down"
                                        className="lucide lucide-chevron-down w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>{" "}
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">3.721</div>
                                <div className="text-base text-slate-500 mt-1">New Orders</div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="monitor"
                                    data-lucide="monitor"
                                    className="lucide lucide-monitor report-box__icon text-warning"
                                >
                                    <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
                                    <line x1={8} y1={21} x2={16} y2={21} />
                                    <line x1={12} y1={17} x2={12} y2={21} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    {" "}
                                    12%{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>{" "}
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">2.149</div>
                                <div className="text-base text-slate-500 mt-1">
                                Total Products
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div className="report-box zoom-in">
                            <div className="box p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="user"
                                    data-lucide="user"
                                    className="lucide lucide-user report-box__icon text-success"
                                >
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                </svg>
                                <div className="ml-auto">
                                    <div className="report-box__indicator bg-success tooltip cursor-pointer">
                                    {" "}
                                    22%{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="chevron-up"
                                        data-lucide="chevron-up"
                                        className="lucide lucide-chevron-up w-4 h-4 ml-0.5"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>{" "}
                                    </div>
                                </div>
                                </div>
                                <div className="text-3xl font-medium leading-8 mt-6">
                                152.040
                                </div>
                                <div className="text-base text-slate-500 mt-1">
                                Unique Visitor
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: General Report */}
                    {/* BEGIN: Sales Report */}
                    <div className="col-span-12 lg:col-span-6 mt-8">
                        <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">Sales Report</h2>
                        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            icon-name="calendar"
                            data-lucide="calendar"
                            className="lucide lucide-calendar w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                            >
                            <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                            <line x1={16} y1={2} x2={16} y2={6} />
                            <line x1={8} y1={2} x2={8} y2={6} />
                            <line x1={3} y1={10} x2={21} y2={10} />
                            </svg>
                            <input
                            type="text"
                            className="datepicker form-control sm:w-56 box pl-10"
                            />
                        </div>
                        </div>
                        <div className="intro-y box p-5 mt-12 sm:mt-5">
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="flex">
                            <div>
                                <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">
                                $15,000
                                </div>
                                <div className="mt-0.5 text-slate-500">This Month</div>
                            </div>
                            <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5" />
                            <div>
                                <div className="text-slate-500 text-lg xl:text-xl font-medium">
                                $10,000
                                </div>
                                <div className="mt-0.5 text-slate-500">Last Month</div>
                            </div>
                            </div>
                            <div className="dropdown md:ml-auto mt-5 md:mt-0">
                            <button
                                className="dropdown-toggle btn btn-outline-secondary font-normal"
                                aria-expanded="false"
                                data-tw-toggle="dropdown"
                            >
                                {" "}
                                Filter by Category{" "}
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="chevron-down"
                                data-lucide="chevron-down"
                                className="lucide lucide-chevron-down w-4 h-4 ml-2"
                                >
                                <polyline points="6 9 12 15 18 9" />
                                </svg>{" "}
                            </button>
                            <div className="dropdown-menu w-40">
                                <ul className="dropdown-content overflow-y-auto h-32">
                                <li>
                                    <a href="" className="dropdown-item">
                                    PC &amp; Laptop
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="dropdown-item">
                                    Smartphone
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="dropdown-item">
                                    Electronic
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="dropdown-item">
                                    Photography
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="dropdown-item">
                                    Sport
                                    </a>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="report-chart">
                            <div className="h-[275px]">
                            <canvas
                                id="report-line-chart"
                                className="mt-6 -mb-6"
                                width={746}
                                height={275}
                                style={{
                                display: "block",
                                boxSizing: "border-box",
                                height: 275,
                                width: 746
                                }}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: Sales Report */}
                    {/* BEGIN: Weekly Top Seller */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            Weekly Top Seller
                        </h2>
                        <a href="" className="ml-auto text-primary truncate">
                            Show More
                        </a>
                        </div>
                        <div className="intro-y box p-5 mt-5">
                        <div className="mt-3">
                            <div className="h-[213px]">
                            <canvas
                                id="report-pie-chart"
                                width={341}
                                height={213}
                                style={{
                                display: "block",
                                boxSizing: "border-box",
                                height: 213,
                                width: 341
                                }}
                            />
                            </div>
                        </div>
                        <div className="w-52 sm:w-auto mx-auto mt-8">
                            <div className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                            <span className="truncate">17 - 30 Years old</span>{" "}
                            <span className="font-medium ml-auto">62%</span>
                            </div>
                            <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-pending rounded-full mr-3" />
                            <span className="truncate">31 - 50 Years old</span>{" "}
                            <span className="font-medium ml-auto">33%</span>
                            </div>
                            <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-warning rounded-full mr-3" />
                            <span className="truncate">&gt;= 50 Years old</span>{" "}
                            <span className="font-medium ml-auto">10%</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: Weekly Top Seller */}
                    {/* BEGIN: Sales Report */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">Sales Report</h2>
                        <a href="" className="ml-auto text-primary truncate">
                            Show More
                        </a>
                        </div>
                        <div className="intro-y box p-5 mt-5">
                        <div className="mt-3">
                            <div className="h-[213px]">
                            <canvas
                                id="report-donut-chart"
                                width={341}
                                height={213}
                                style={{
                                display: "block",
                                boxSizing: "border-box",
                                height: 213,
                                width: 341
                                }}
                            />
                            </div>
                        </div>
                        <div className="w-52 sm:w-auto mx-auto mt-8">
                            <div className="flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                            <span className="truncate">17 - 30 Years old</span>{" "}
                            <span className="font-medium ml-auto">62%</span>
                            </div>
                            <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-pending rounded-full mr-3" />
                            <span className="truncate">31 - 50 Years old</span>{" "}
                            <span className="font-medium ml-auto">33%</span>
                            </div>
                            <div className="flex items-center mt-4">
                            <div className="w-2 h-2 bg-warning rounded-full mr-3" />
                            <span className="truncate">&gt;= 50 Years old</span>{" "}
                            <span className="font-medium ml-auto">10%</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: Sales Report */}
                    {/* BEGIN: Official Store */}
                    <div className="col-span-12 xl:col-span-8 mt-6">
                        <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">Official Store</h2>
                        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            icon-name="map-pin"
                            data-lucide="map-pin"
                            className="lucide lucide-map-pin w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                            >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx={12} cy={10} r={3} />
                            </svg>
                            <input
                            type="text"
                            className="form-control sm:w-56 box pl-10"
                            placeholder="Filter by city"
                            />
                        </div>
                        </div>
                        <div className="intro-y box p-5 mt-12 sm:mt-5">
                        <div>
                            250 Official stores in 21 countries, click the marker to see
                            location details.
                        </div>
                        <div
                            className="report-maps mt-5 bg-slate-200 rounded-md"
                            data-center="-6.2425342, 106.8626478"
                            data-sources="/dist/json/location.json"
                            style={{ position: "relative", overflow: "hidden" }}
                        >
                            <div
                            style={{
                                height: "100%",
                                width: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                backgroundColor: "rgb(229, 227, 223)"
                            }}
                            >
                            <div className="gm-err-container">
                                <div className="gm-err-content">
                                <div className="gm-err-icon">
                                    <img
                                    src="https://maps.gstatic.com/mapfiles/api-3/images/icon_error.png"
                                    alt=""
                                    draggable="false"
                                    style={{ userSelect: "none" }}
                                    />
                                </div>
                                <div className="gm-err-title">
                                    Petit problème... Une erreur s'est produite
                                </div>
                                <div className="gm-err-message">
                                    Google&nbsp;Maps ne s'est pas chargé correctement sur cette
                                    page. Pour plus d'informations techniques sur cette erreur,
                                    veuillez consulter la console JavaScript.
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: Official Store */}
                    {/* BEGIN: Weekly Best Sellers */}
                    <div className="col-span-12 xl:col-span-4 mt-6">
                        <div className="intro-y flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            Weekly Best Sellers
                        </h2>
                        </div>
                        <div className="mt-5">
                        <div className="intro-y">
                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                <img
                                alt="Midone - HTML Admin Template"
                                src="dist/images/profile-8.jpg"
                                />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-medium">Kevin Spacey</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                10 February 2021
                                </div>
                            </div>
                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                137 Sales
                            </div>
                            </div>
                        </div>
                        <div className="intro-y">
                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                <img
                                alt="Midone - HTML Admin Template"
                                src="dist/images/profile-11.jpg"
                                />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-medium">Johnny Depp</div>
                                <div className="text-slate-500 text-xs mt-0.5">2 July 2021</div>
                            </div>
                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                137 Sales
                            </div>
                            </div>
                        </div>
                        <div className="intro-y">
                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                <img
                                alt="Midone - HTML Admin Template"
                                src="dist/images/profile-7.jpg"
                                />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-medium">Denzel Washington</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                13 October 2021
                                </div>
                            </div>
                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                137 Sales
                            </div>
                            </div>
                        </div>
                        <div className="intro-y">
                            <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                <img
                                alt="Midone - HTML Admin Template"
                                src="dist/images/profile-9.jpg"
                                />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-medium">Tom Cruise</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                18 July 2021
                                </div>
                            </div>
                            <div className="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                137 Sales
                            </div>
                            </div>
                        </div>
                        <a
                            href=""
                            className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                        >
                            View More
                        </a>
                        </div>
                    </div>
                    {/* END: Weekly Best Sellers */}
                    {/* BEGIN: General Report */}
                    <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
                        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div className="box p-5 zoom-in">
                            <div className="flex items-center">
                            <div className="w-2/4 flex-none">
                                <div className="text-lg font-medium truncate">Target Sales</div>
                                <div className="text-slate-500 mt-1">300 Sales</div>
                            </div>
                            <div className="flex-none ml-auto relative">
                                <div className="w-[90px] h-[90px]">
                                <canvas
                                    id="report-donut-chart-1"
                                    width={90}
                                    height={90}
                                    style={{
                                    display: "block",
                                    boxSizing: "border-box",
                                    height: 90,
                                    width: 90
                                    }}
                                />
                                </div>
                                <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                                20%
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div className="box p-5 zoom-in">
                            <div className="flex">
                            <div className="text-lg font-medium truncate mr-3">
                                Social Media
                            </div>
                            <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                                320 Followers
                            </div>
                            </div>
                            <div className="mt-1">
                            <div className="h-[58px]">
                                <canvas
                                className="simple-line-chart-1 -ml-1"
                                width={345}
                                height={58}
                                style={{
                                    display: "block",
                                    boxSizing: "border-box",
                                    height: 58,
                                    width: 345
                                }}
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div className="box p-5 zoom-in">
                            <div className="flex items-center">
                            <div className="w-2/4 flex-none">
                                <div className="text-lg font-medium truncate">New Products</div>
                                <div className="text-slate-500 mt-1">1450 Products</div>
                            </div>
                            <div className="flex-none ml-auto relative">
                                <div className="w-[90px] h-[90px]">
                                <canvas
                                    id="report-donut-chart-2"
                                    width={90}
                                    height={90}
                                    style={{
                                    display: "block",
                                    boxSizing: "border-box",
                                    height: 90,
                                    width: 90
                                    }}
                                />
                                </div>
                                <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                                45%
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div className="box p-5 zoom-in">
                            <div className="flex">
                            <div className="text-lg font-medium truncate mr-3">
                                Posted Ads
                            </div>
                            <div className="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate">
                                180 Campaign
                            </div>
                            </div>
                            <div className="mt-1">
                            <div className="h-[58px]">
                                <canvas
                                className="simple-line-chart-1 -ml-1"
                                width={345}
                                height={58}
                                style={{
                                    display: "block",
                                    boxSizing: "border-box",
                                    height: 58,
                                    width: 345
                                }}
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* END: General Report */}
                    {/* BEGIN: Weekly Top Products */}
                    <div className="col-span-12 mt-6">
                        <div className="intro-y block sm:flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            Weekly Top Products
                        </h2>
                        <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
                            <button className="btn box flex items-center text-slate-600 dark:text-slate-300">
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="file-text"
                                data-lucide="file-text"
                                className="lucide lucide-file-text hidden sm:block w-4 h-4 mr-2"
                            >
                                <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1={16} y1={13} x2={8} y2={13} />
                                <line x1={16} y1={17} x2={8} y2={17} />
                                <line x1={10} y1={9} x2={8} y2={9} />
                            </svg>{" "}
                            Export to Excel{" "}
                            </button>
                            <button className="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300">
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="file-text"
                                data-lucide="file-text"
                                className="lucide lucide-file-text hidden sm:block w-4 h-4 mr-2"
                            >
                                <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1={16} y1={13} x2={8} y2={13} />
                                <line x1={16} y1={17} x2={8} y2={17} />
                                <line x1={10} y1={9} x2={8} y2={9} />
                            </svg>{" "}
                            Export to PDF{" "}
                            </button>
                        </div>
                        </div>
                        <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
                        <table className="table table-report sm:mt-2">
                            <thead>
                            <tr>
                                <th className="whitespace-nowrap">IMAGES</th>
                                <th className="whitespace-nowrap">PRODUCT NAME</th>
                                <th className="text-center whitespace-nowrap">STOCK</th>
                                <th className="text-center whitespace-nowrap">STATUS</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="intro-x">
                                <td className="w-40">
                                <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-3.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-9.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-4.jpg"
                                    />
                                    </div>
                                </div>
                                </td>
                                <td>
                                <a href="" className="font-medium whitespace-nowrap">
                                    Oppo Find X2 Pro
                                </a>
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    Smartphone &amp; Tablet
                                </div>
                                </td>
                                <td className="text-center">146</td>
                                <td className="w-40">
                                <div className="flex items-center justify-center text-success">
                                    {" "}
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="check-square"
                                    data-lucide="check-square"
                                    className="lucide lucide-check-square w-4 h-4 mr-2"
                                    >
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Active{" "}
                                </div>
                                </td>
                                <td className="table-report__action w-56">
                                <div className="flex justify-center items-center">
                                    <a className="flex items-center mr-3" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="check-square"
                                        data-lucide="check-square"
                                        className="lucide lucide-check-square w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Edit{" "}
                                    </a>
                                    <a className="flex items-center text-danger" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="trash-2"
                                        data-lucide="trash-2"
                                        className="lucide lucide-trash-2 w-4 h-4 mr-1"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>{" "}
                                    Delete{" "}
                                    </a>
                                </div>
                                </td>
                            </tr>
                            <tr className="intro-x">
                                <td className="w-40">
                                <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-9.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-1.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-14.jpg"
                                    />
                                    </div>
                                </div>
                                </td>
                                <td>
                                <a href="" className="font-medium whitespace-nowrap">
                                    Dell XPS 13
                                </a>
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    PC &amp; Laptop
                                </div>
                                </td>
                                <td className="text-center">103</td>
                                <td className="w-40">
                                <div className="flex items-center justify-center text-success">
                                    {" "}
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="check-square"
                                    data-lucide="check-square"
                                    className="lucide lucide-check-square w-4 h-4 mr-2"
                                    >
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Active{" "}
                                </div>
                                </td>
                                <td className="table-report__action w-56">
                                <div className="flex justify-center items-center">
                                    <a className="flex items-center mr-3" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="check-square"
                                        data-lucide="check-square"
                                        className="lucide lucide-check-square w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Edit{" "}
                                    </a>
                                    <a className="flex items-center text-danger" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="trash-2"
                                        data-lucide="trash-2"
                                        className="lucide lucide-trash-2 w-4 h-4 mr-1"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>{" "}
                                    Delete{" "}
                                    </a>
                                </div>
                                </td>
                            </tr>
                            <tr className="intro-x">
                                <td className="w-40">
                                <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-14.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-3.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-3.jpg"
                                    />
                                    </div>
                                </div>
                                </td>
                                <td>
                                <a href="" className="font-medium whitespace-nowrap">
                                    Nikon Z6
                                </a>
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    Photography
                                </div>
                                </td>
                                <td className="text-center">50</td>
                                <td className="w-40">
                                <div className="flex items-center justify-center text-success">
                                    {" "}
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="check-square"
                                    data-lucide="check-square"
                                    className="lucide lucide-check-square w-4 h-4 mr-2"
                                    >
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Active{" "}
                                </div>
                                </td>
                                <td className="table-report__action w-56">
                                <div className="flex justify-center items-center">
                                    <a className="flex items-center mr-3" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="check-square"
                                        data-lucide="check-square"
                                        className="lucide lucide-check-square w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Edit{" "}
                                    </a>
                                    <a className="flex items-center text-danger" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="trash-2"
                                        data-lucide="trash-2"
                                        className="lucide lucide-trash-2 w-4 h-4 mr-1"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>{" "}
                                    Delete{" "}
                                    </a>
                                </div>
                                </td>
                            </tr>
                            <tr className="intro-x">
                                <td className="w-40">
                                <div className="flex">
                                    <div className="w-10 h-10 image-fit zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-8.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-8.jpg"
                                    />
                                    </div>
                                    <div className="w-10 h-10 image-fit zoom-in -ml-5">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="tooltip rounded-full"
                                        src="dist/images/preview-2.jpg"
                                    />
                                    </div>
                                </div>
                                </td>
                                <td>
                                <a href="" className="font-medium whitespace-nowrap">
                                    Apple MacBook Pro 13
                                </a>
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    PC &amp; Laptop
                                </div>
                                </td>
                                <td className="text-center">50</td>
                                <td className="w-40">
                                <div className="flex items-center justify-center text-danger">
                                    {" "}
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="check-square"
                                    data-lucide="check-square"
                                    className="lucide lucide-check-square w-4 h-4 mr-2"
                                    >
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Inactive{" "}
                                </div>
                                </td>
                                <td className="table-report__action w-56">
                                <div className="flex justify-center items-center">
                                    <a className="flex items-center mr-3" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="check-square"
                                        data-lucide="check-square"
                                        className="lucide lucide-check-square w-4 h-4 mr-1"
                                    >
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>{" "}
                                    Edit{" "}
                                    </a>
                                    <a className="flex items-center text-danger" href="">
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        icon-name="trash-2"
                                        data-lucide="trash-2"
                                        className="lucide lucide-trash-2 w-4 h-4 mr-1"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                    </svg>{" "}
                                    Delete{" "}
                                    </a>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
                        <nav className="w-full sm:w-auto sm:mr-auto">
                            <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevrons-left"
                                    className="lucide lucide-chevrons-left w-4 h-4"
                                    data-lucide="chevrons-left"
                                >
                                    <polyline points="11 17 6 12 11 7" />
                                    <polyline points="18 17 13 12 18 7" />
                                </svg>{" "}
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevron-left"
                                    className="lucide lucide-chevron-left w-4 h-4"
                                    data-lucide="chevron-left"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>{" "}
                                </a>
                            </li>
                            <li className="page-item">
                                {" "}
                                <a className="page-link" href="#">
                                ...
                                </a>{" "}
                            </li>
                            <li className="page-item">
                                {" "}
                                <a className="page-link" href="#">
                                1
                                </a>{" "}
                            </li>
                            <li className="page-item active">
                                {" "}
                                <a className="page-link" href="#">
                                2
                                </a>{" "}
                            </li>
                            <li className="page-item">
                                {" "}
                                <a className="page-link" href="#">
                                3
                                </a>{" "}
                            </li>
                            <li className="page-item">
                                {" "}
                                <a className="page-link" href="#">
                                ...
                                </a>{" "}
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevron-right"
                                    className="lucide lucide-chevron-right w-4 h-4"
                                    data-lucide="chevron-right"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>{" "}
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevrons-right"
                                    className="lucide lucide-chevrons-right w-4 h-4"
                                    data-lucide="chevrons-right"
                                >
                                    <polyline points="13 17 18 12 13 7" />
                                    <polyline points="6 17 11 12 6 7" />
                                </svg>{" "}
                                </a>
                            </li>
                            </ul>
                        </nav>
                        <select className="w-20 form-select box mt-3 sm:mt-0">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </select>
                        </div>
                    </div>
                    {/* END: Weekly Top Products */}
                    </div>
                </div>
                <div className="col-span-12 2xl:col-span-3">
                    <div className="2xl:border-l -mb-10 pb-10">
                    <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
                        {/* BEGIN: Transactions */}
                        <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
                        <div className="intro-x flex items-center h-10">
                            <h2 className="text-lg font-medium truncate mr-5">Transactions</h2>
                        </div>
                        <div className="mt-5">
                            <div className="intro-x">
                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-8.jpg"
                                />
                                </div>
                                <div className="ml-4 mr-auto">
                                <div className="font-medium">Kevin Spacey</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                    10 February 2021
                                </div>
                                </div>
                                <div className="text-success">+$47</div>
                            </div>
                            </div>
                            <div className="intro-x">
                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-11.jpg"
                                />
                                </div>
                                <div className="ml-4 mr-auto">
                                <div className="font-medium">Johnny Depp</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                    2 July 2021
                                </div>
                                </div>
                                <div className="text-success">+$50</div>
                            </div>
                            </div>
                            <div className="intro-x">
                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-7.jpg"
                                />
                                </div>
                                <div className="ml-4 mr-auto">
                                <div className="font-medium">Denzel Washington</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                    13 October 2021
                                </div>
                                </div>
                                <div className="text-success">+$86</div>
                            </div>
                            </div>
                            <div className="intro-x">
                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-9.jpg"
                                />
                                </div>
                                <div className="ml-4 mr-auto">
                                <div className="font-medium">Tom Cruise</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                    18 July 2021
                                </div>
                                </div>
                                <div className="text-danger">-$112</div>
                            </div>
                            </div>
                            <div className="intro-x">
                            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-11.jpg"
                                />
                                </div>
                                <div className="ml-4 mr-auto">
                                <div className="font-medium">Kate Winslet</div>
                                <div className="text-slate-500 text-xs mt-0.5">
                                    5 February 2022
                                </div>
                                </div>
                                <div className="text-danger">-$50</div>
                            </div>
                            </div>
                            <a
                            href=""
                            className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                            >
                            View More
                            </a>
                        </div>
                        </div>
                        {/* END: Transactions */}
                        {/* BEGIN: Recent Activities */}
                        <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                        <div className="intro-x flex items-center h-10">
                            <h2 className="text-lg font-medium truncate mr-5">
                            Recent Activities
                            </h2>
                            <a href="" className="ml-auto text-primary truncate">
                            Show More
                            </a>
                        </div>
                        <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                            <div className="intro-x relative flex items-center mb-3">
                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-8.jpg"
                                />
                                </div>
                            </div>
                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                <div className="flex items-center">
                                <div className="font-medium">Tom Cruise</div>
                                <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                </div>
                                <div className="text-slate-500 mt-1">Has joined the team</div>
                            </div>
                            </div>
                            <div className="intro-x relative flex items-center mb-3">
                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-8.jpg"
                                />
                                </div>
                            </div>
                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                <div className="flex items-center">
                                <div className="font-medium">Kevin Spacey</div>
                                <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                </div>
                                <div className="text-slate-500">
                                <div className="mt-1">Added 3 new photos</div>
                                <div className="flex mt-2">
                                    <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="rounded-md border border-white"
                                        src="dist/images/preview-3.jpg"
                                    />
                                    </div>
                                    <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="rounded-md border border-white"
                                        src="dist/images/preview-6.jpg"
                                    />
                                    </div>
                                    <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in">
                                    <img
                                        alt="Midone - HTML Admin Template"
                                        className="rounded-md border border-white"
                                        src="dist/images/preview-3.jpg"
                                    />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="intro-x text-slate-500 text-xs text-center my-4">
                            12 November
                            </div>
                            <div className="intro-x relative flex items-center mb-3">
                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-8.jpg"
                                />
                                </div>
                            </div>
                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                <div className="flex items-center">
                                <div className="font-medium">Sylvester Stallone</div>
                                <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                </div>
                                <div className="text-slate-500 mt-1">
                                Has changed{" "}
                                <a className="text-primary" href="">
                                    Sony Master Series A9G
                                </a>{" "}
                                price and description
                                </div>
                            </div>
                            </div>
                            <div className="intro-x relative flex items-center mb-3">
                            <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                <img
                                    alt="Midone - HTML Admin Template"
                                    src="dist/images/profile-4.jpg"
                                />
                                </div>
                            </div>
                            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                <div className="flex items-center">
                                <div className="font-medium">Tom Cruise</div>
                                <div className="text-xs text-slate-500 ml-auto">07:00 PM</div>
                                </div>
                                <div className="text-slate-500 mt-1">
                                Has changed{" "}
                                <a className="text-primary" href="">
                                    Samsung Galaxy S20 Ultra
                                </a>{" "}
                                description
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* END: Recent Activities */}
                        {/* BEGIN: Important Notes */}
                        <div className="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3">
                        <div className="intro-x flex items-center h-10">
                            <h2 className="text-lg font-medium truncate mr-auto">
                            Important Notes
                            </h2>
                            <button
                            data-carousel="important-notes"
                            data-target="prev"
                            className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                            >
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="chevron-left"
                                data-lucide="chevron-left"
                                className="lucide lucide-chevron-left w-4 h-4"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>{" "}
                            </button>
                            <button
                            data-carousel="important-notes"
                            data-target="next"
                            className="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                            >
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="chevron-right"
                                data-lucide="chevron-right"
                                className="lucide lucide-chevron-right w-4 h-4"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>{" "}
                            </button>
                        </div>
                        <div className="mt-5 intro-x">
                            <div className="box zoom-in">
                            <div className="tns-outer" id="important-notes-ow">
                                <button type="button" data-action="stop">
                                <span className="tns-visually-hidden">stop animation</span>
                                stop
                                </button>
                                <div
                                className="tns-liveregion tns-visually-hidden"
                                aria-live="polite"
                                aria-atomic="true"
                                >
                                slide <span className="current">4</span> of 3
                                </div>
                                <div id="important-notes-mw" className="tns-ovh">
                                <div className="tns-inner" id="important-notes-iw">
                                    <div
                                    className="tiny-slider  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal"
                                    id="important-notes"
                                    style={{ transform: "translate3d(-60%, 0px, 0px)" }}
                                    >
                                    <div
                                        className="p-5 tns-item tns-slide-cloned"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        <div className="text-base font-medium truncate">
                                        Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                        <div className="text-slate-500 text-justify mt-1">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div className="font-medium flex mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-secondary py-1 px-2"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                        </div>
                                    </div>
                                    <div
                                        className="p-5 tns-item"
                                        id="important-notes-item0"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        <div className="text-base font-medium truncate">
                                        Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                        <div className="text-slate-500 text-justify mt-1">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div className="font-medium flex mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-secondary py-1 px-2"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                        </div>
                                    </div>
                                    <div
                                        className="p-5 tns-item"
                                        id="important-notes-item1"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        <div className="text-base font-medium truncate">
                                        Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                        <div className="text-slate-500 text-justify mt-1">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div className="font-medium flex mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-secondary py-1 px-2"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                        </div>
                                    </div>
                                    <div
                                        className="p-5 tns-item tns-slide-active"
                                        id="important-notes-item2"
                                    >
                                        <div className="text-base font-medium truncate">
                                        Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                        <div className="text-slate-500 text-justify mt-1">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div className="font-medium flex mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-secondary py-1 px-2"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                        </div>
                                    </div>
                                    <div
                                        className="p-5 tns-item tns-slide-cloned"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                    >
                                        <div className="text-base font-medium truncate">
                                        Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="text-slate-400 mt-1">20 Hours ago</div>
                                        <div className="text-slate-500 text-justify mt-1">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the
                                        industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div className="font-medium flex mt-5">
                                        <button
                                            type="button"
                                            className="btn btn-secondary py-1 px-2"
                                        >
                                            View Notes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto"
                                        >
                                            Dismiss
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* END: Important Notes */}
                        {/* BEGIN: Schedules */}
                        <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
                        <div className="intro-x flex items-center h-10">
                            <h2 className="text-lg font-medium truncate mr-5">Schedules</h2>
                            <a
                            href=""
                            className="ml-auto text-primary truncate flex items-center"
                            >
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                icon-name="plus"
                                data-lucide="plus"
                                className="lucide lucide-plus w-4 h-4 mr-1"
                            >
                                <line x1={12} y1={5} x2={12} y2={19} />
                                <line x1={5} y1={12} x2={19} y2={12} />
                            </svg>{" "}
                            Add New Schedules{" "}
                            </a>
                        </div>
                        <div className="mt-5">
                            <div className="intro-x box">
                            <div className="p-5">
                                <div className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevron-left"
                                    data-lucide="chevron-left"
                                    className="lucide lucide-chevron-left w-5 h-5 text-slate-500"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                <div className="font-medium text-base mx-auto">April</div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    icon-name="chevron-right"
                                    data-lucide="chevron-right"
                                    className="lucide lucide-chevron-right w-5 h-5 text-slate-500"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                                </div>
                                <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                                <div className="font-medium">Su</div>
                                <div className="font-medium">Mo</div>
                                <div className="font-medium">Tu</div>
                                <div className="font-medium">We</div>
                                <div className="font-medium">Th</div>
                                <div className="font-medium">Fr</div>
                                <div className="font-medium">Sa</div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    29
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    30
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    31
                                </div>
                                <div className="py-0.5 rounded relative">1</div>
                                <div className="py-0.5 rounded relative">2</div>
                                <div className="py-0.5 rounded relative">3</div>
                                <div className="py-0.5 rounded relative">4</div>
                                <div className="py-0.5 rounded relative">5</div>
                                <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                                    6
                                </div>
                                <div className="py-0.5 rounded relative">7</div>
                                <div className="py-0.5 bg-primary text-white rounded relative">
                                    8
                                </div>
                                <div className="py-0.5 rounded relative">9</div>
                                <div className="py-0.5 rounded relative">10</div>
                                <div className="py-0.5 rounded relative">11</div>
                                <div className="py-0.5 rounded relative">12</div>
                                <div className="py-0.5 rounded relative">13</div>
                                <div className="py-0.5 rounded relative">14</div>
                                <div className="py-0.5 rounded relative">15</div>
                                <div className="py-0.5 rounded relative">16</div>
                                <div className="py-0.5 rounded relative">17</div>
                                <div className="py-0.5 rounded relative">18</div>
                                <div className="py-0.5 rounded relative">19</div>
                                <div className="py-0.5 rounded relative">20</div>
                                <div className="py-0.5 rounded relative">21</div>
                                <div className="py-0.5 rounded relative">22</div>
                                <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                                    23
                                </div>
                                <div className="py-0.5 rounded relative">24</div>
                                <div className="py-0.5 rounded relative">25</div>
                                <div className="py-0.5 rounded relative">26</div>
                                <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                                    27
                                </div>
                                <div className="py-0.5 rounded relative">28</div>
                                <div className="py-0.5 rounded relative">29</div>
                                <div className="py-0.5 rounded relative">30</div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    1
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    2
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    3
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    4
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    5
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    6
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    7
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    8
                                </div>
                                <div className="py-0.5 rounded relative text-slate-500">
                                    9
                                </div>
                                </div>
                            </div>
                            <div className="border-t border-slate-200/60 p-5">
                                <div className="flex items-center">
                                <div className="w-2 h-2 bg-pending rounded-full mr-3" />
                                <span className="truncate">UI/UX Workshop</span>{" "}
                                <span className="font-medium xl:ml-auto">23th</span>
                                </div>
                                <div className="flex items-center mt-4">
                                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                                <span className="truncate">
                                    VueJs Frontend Development
                                </span>{" "}
                                <span className="font-medium xl:ml-auto">10th</span>
                                </div>
                                <div className="flex items-center mt-4">
                                <div className="w-2 h-2 bg-warning rounded-full mr-3" />
                                <span className="truncate">Laravel Rest API</span>{" "}
                                <span className="font-medium xl:ml-auto">31th</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* END: Schedules */}
                    </div>
                    </div>
                </div>
                </div>


            </Webmaster>
        </>
    )
}