import React, { useEffect, useState } from 'react'
import wallet from "../assets/img/icons/unicons/wallet.png"
import avatar5 from "../assets/img/avatars/5.png"
import avatar6 from "../assets/img/avatars/6.png"
import avatar1 from "../assets/img/avatars/1.png"
import avatar7 from "../assets/img/avatars/7.png"
import ReactApexChart from 'react-apexcharts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Monthlywiseincomedata = [
    { month: "Jan", income: 4000 },
    { month: "Feb", income: 3500 },
    { month: "Mar", income: 5000 },
    { month: "Apr", income: 4500 },
    { month: "May", income: 6000 },
    { month: "Jun", income: 5500 },
    { month: "Jul", income: 7000 },
    { month: "Aug", income: 6500 },
    { month: "Sep", income: 5800 },
    { month: "Oct", income: 7200 },
    { month: "Nov", income: 8000 },
    { month: "Dec", income: 7500 },
];

const classData = [
    {
        className: "1st",
        sections: ["A-12", "B-12"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
    {
        className: "2nd",
        sections: ["A-15", "B-10"],
        present: 0,
        absent: 0,
        onLeave: 0,
        expected: 0,
        generated: 0,
        paid: 0,
        balance: 0,
    },
];




// Staff Attendance Overview chart
const attendanceSummary = [
    { name: "Present", value: 70 },
    { name: "Absent", value: 20 },
    { name: "Leave", value: 10 },
];

const monthlyAttendance = [
    { month: "Jan", present: 20, absent: 5, leave: 2 },
    { month: "Feb", present: 18, absent: 7, leave: 3 },
    { month: "Mar", present: 22, absent: 3, leave: 1 },
    { month: "Apr", present: 19, absent: 6, leave: 2 },
    { month: "May", present: 21, absent: 4, leave: 3 },
    // Add data for remaining months
];

const COLORS = ["#4CAF50", "#FF5252", "#FFC107"];
function Graph() {
    const [series, setSeries] = useState([
        { name: "Income", data: [400, 450, 500, 600, 700, 800, 900] },
    ]);

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: "area",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        yaxis: {
            showAlways: false,
        },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    });

    const [pieSeries, setPieSeries] = useState(0);

    const [pieOptions, setPieOptions] = useState({
        chart: {
            height: 150,
            width: 150,
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: "40%",
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        offsetY: 6,
                        color: "#000",
                        fontSize: "15px",
                        show: true,
                    },
                },
            },
        },
        labels: [],
    });

    const PieTotal = () => {
        let sum = 0;
        for (let i = 0; i < series[0].data.length; i++) {
            if (series[0].data[i] !== undefined) {
                sum += series[0].data[i];
            }
        }
        return sum;
    };

    const percantage = () => {
        return Math.round((PieTotal() / 1400) * 100);
    };

    useEffect(() => {
        const total = percantage();
        setPieSeries(total);
    }, [series]);

    const [monthlySeries, setMonthlySeries] = useState([
        { name: "Income", data: [400, 450, 500, 600, 700, 800, 900] },
        { name: "Expense", data: [300, 350, 400, 450, 500, 600, 700] },
    ]);

    const [monthlyOptions, setMonthlyOptions] = useState({
        chart: {
            type: "line",
            height: 350,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Monthly Analysis",
            align: "center",
        },
    });

    const [yearlySeries, setYearlySeries] = useState([
        { name: "Income", data: [5000, 5500, 6000, 6500, 7000, 7500, 8000] },
        { name: "Expense", data: [4000, 4500, 5000, 5500, 6000, 6500, 7000] },
    ]);

    const [yearlyOptions, setYearlyOptions] = useState({
        chart: {
            type: "bar",
            height: 350,
        },
        xaxis: {
            categories: ["2020", "2021", "2022", "2023", "2024"],
        },
        title: {
            text: "Yearly Analysis",
            align: "center",
        },
        colors: ["#00E396", "#775DD0"],
    });
    const optionsRadialGuage = {
        series: [67],
        options: {
            chart: {
                height: 400,
                type: 'radialBar',
                offsetY: -10,
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                            color: undefined,
                            offsetY: 120,
                        },
                        value: {
                            offsetY: 76,
                            fontSize: '22px',
                            color: undefined,
                            formatter: function (val) {
                                return val + '%';
                            },
                        },
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 30, 91],
                },
            },
            stroke: {
                dashArray: 4,
            },
            labels: ['Growth'],
        },
    };
    return (
        <>
            <div className="container-fluid ">
                <div className="row align-items-center">
                    <div className="col-12 mt-4">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb text-center">
                                <li class="breadcrumb-item active" aria-current="page"><i className="menu-icon tf-icons bx bx-home-circle mb-1"></i>Overview</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-danger">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">10</h3>
                                <h5 className="text-white">Unpaid Invoice</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-danger">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">-6587</h3>
                                <h5 className="text-white">Unpaid Amount</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-primary">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">4444</h3>
                                <h5 className="text-white">Income Today</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-secondary">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">1250</h3>
                                <h5 className="text-white">Expense Today</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-info">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">5842</h3>
                                <h5 className="text-white">Profit Today</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-success">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">25953</h3>
                                <h5 className="text-white">Income (Month)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-warning">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">457</h3>
                                <h5 className="text-white">Expense (Month)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-success">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">2465</h3>
                                <h5 className="text-white">Profit (Month)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-primary">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">4502</h3>
                                <h5 className="text-white">Income (Year)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-danger">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">7800</h3>
                                <h5 className="text-white">Expenses (Year)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-info">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">5338</h3>
                                <h5 className="text-white">Profit (Year)</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-4 col-lg-3 col-xl-2 col-12 grid-margin mb-2">
                        <div className="card bg-secondary">
                            <div className="card-body custom-card-body px-2 py-3">
                                <h3 className="text-white mb-1">2025-26</h3>
                                <h5 className="text-white">Current Session</h5>
                                <button className="btn btn-outline-light btn-sm">
                                    More Info <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="row">
                    
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-danger fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-down-arrow-alt"></i>Unpaid Amount</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Income Today</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-danger fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-down-arrow-alt"></i>Expenses Today</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Profit Today</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Income This Month</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Expenses This Month</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Profit This Month</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Income This Year</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-danger fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-down-arrow-alt"></i>Expenses This Year</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Profit This Year</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-2" style={{ fontSize: "28px" }}>0</h2>
                                <small className="text-success fw-semibold" style={{ fontSize: "18px" }}><i className="bx bx-up-arrow-alt"></i>Current Session</small>
                                <small className="d-block mt-1" style={{ fontSize: "18px" }}>
                                    <a href="javascript:void(0);">View More</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className="row mt-3 g-2">
                    <div className="col-md-12 col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header bg-themprimary p-3">
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            className="nav-link text-white active"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-tabs-line-card-income"
                                            aria-controls="navs-tabs-line-card-income"
                                            aria-selected="true"
                                        >
                                            Income
                                        </button>
                                    </li>
                                    <li className="nav-item ">
                                        <button
                                            type="button"
                                            className="nav-link text-white"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-tabs-monthly"
                                            aria-controls="navs-tabs-monthly"
                                            aria-selected="false"
                                        >
                                            Monthly
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            className="nav-link text-white"
                                            role="tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#navs-tabs-yearly"
                                            aria-controls="navs-tabs-yearly"
                                            aria-selected="false"
                                        >
                                            Yearly
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body px-0">
                                <div className="tab-content p-0">
                                    <div
                                        className="tab-pane fade show active"
                                        id="navs-tabs-line-card-income"
                                        role="tabpanel"
                                    >
                                        {/* Current Income Chart */}
                                        <div className="d-flex p-4 pt-3">
                                            <div className="avatar flex-shrink-0 me-3">
                                                <img src={wallet} alt="User" />
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Total Balance</small>
                                                <div className="d-flex align-items-center">
                                                    <h6 className="mb-0 me-1">$459.10</h6>
                                                    <small className="text-success fw-semibold">
                                                        <i className="bx bx-chevron-up"></i>
                                                        42.9%
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="incomeChart">
                                            <ReactApexChart
                                                options={options}
                                                series={series}
                                                type="area"
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade mt-5 mb-5"
                                        id="navs-tabs-monthly"
                                        role="tabpanel"
                                    >
                                        <div id="monthlyChart">
                                            <ReactApexChart
                                                options={monthlyOptions}
                                                series={monthlySeries}
                                                type="line"
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade mt-5 mb-5"
                                        id="navs-tabs-yearly"
                                        role="tabpanel"
                                    >
                                        <div id="yearlyChart">
                                            <ReactApexChart
                                                options={yearlyOptions}
                                                series={yearlySeries}
                                                type="bar"
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            {/* Card Header */}
                            <div className="card-header bg-themprimary d-flex align-items-center justify-content-between border-bottom">
                                <h5 className="m-0 text-white">Latest Admissions</h5>
                            </div>

                            {/* Card Body */}
                            <div className="m-2">
                                <div className="row g-3">
                                    {/* Admission Cards */}
                                    {[avatar5, avatar6, avatar1, avatar7].map((avatar, index) => (
                                        <div className="col-sm-6 col-md-4 mt-4" key={index}>
                                            <div className="border border-secondary p-3 text-center rounded">
                                                <img
                                                    src={avatar}
                                                    alt="Avatar"
                                                    className="rounded-circle mb-3 img-fluid"
                                                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                                />
                                                <h6 className="mb-1 fw-bold">John Doe</h6>
                                                <p className="text-muted mb-1 small">Class: 8th</p>
                                                <small className="text-secondary">28 Feb 2024</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="mt-3 text-center bg-themprimary rounded p-2">
                                    <small className="text-white fw-semibold ">
                                        Total Admissions This Month: <span className="themesecondary">15</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md-6 col-lg-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-header d-flex align-items-center justify-content-between pb-0 bg-themprimary">
                                <div className="card-title">
                                    <h5 className="m-0 me-2 text-white">Staff Attendance Overview</h5>
                                </div>
                            </div>
                            <div className="card-body mt-4">
                                <div className="row gy-4">
                                    <div className="col-6">
                                        <div className="bg-primary text-white text-center p-4 rounded shadow-sm">
                                            <h2 className="text-white mb-2">30</h2>
                                            <p className="mb-0">Total Present Today</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="bg-danger text-white text-center p-4 rounded shadow-sm">
                                            <h2 className="text-white mb-2">10</h2>
                                            <p className="mb-0">Total Absence Today</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="bg-warning text-white text-center p-4 rounded shadow-sm">
                                            <h2 className="text-white mb-2">0</h2>
                                            <p className="mb-0">Total Late Arrival Today</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="bg-info text-white text-center p-4 rounded shadow-sm">
                                            <h2 className="text-white mb-2">7</h2>
                                            <p className="mb-0">Total On Leave Today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between pb-0 bg-themprimary">
                                <div className="card-title">
                                    <h5 className="m-0 me-2 text-white">Today Overview</h5>
                                </div>
                            </div>
                            <div className="card-body mt-4">
                                <ul className="p-0 m-0">
                                    <li className="d-flex mb-2 p-3 rounded  bg-primary">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-mobile-alt"></i></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0 text-white">Total Student</h6>
                                                <small className="text-white fs-5">0</small>
                                            </div>
                                            <div className="user-progress border p-1 rounded bg-themprimary px-2">
                                                <small className="fw-semibold text-white me-1">0 Boys</small>
                                                <small className="fw-semibold text-white">0 Girls</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-2 p-3 rounded  bg-success">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-mobile-alt"></i></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0 text-white">Parents</h6>
                                                <small className="text-white fs-5">0</small>
                                            </div>
                                            <div className="user-progress border p-1 rounded bg-themprimary px-2">
                                                <small className="fw-semibold text-white me-1">Total Parents </small>
                                                <small className="fw-semibold text-white">0</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-2 p-3 rounded  bg-danger">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-mobile-alt"></i></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0 text-white">Total Staff</h6>
                                                <small className="text-white fs-5">0</small>
                                            </div>
                                            <div className="user-progress border p-1 rounded bg-themprimary px-2">
                                                <small className="fw-semibold text-white me-1">0 Male</small>
                                                <small className="fw-semibold text-white">0 Female</small>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-2 p-3 rounded  bg-warning">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-mobile-alt"></i></span>
                                        </div>
                                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0 text-white">Present Student Today</h6>
                                                <small className="text-white fs-5">0</small>
                                            </div>
                                            <div className="user-progress border p-1 rounded bg-themprimary px-2">
                                                <small className="fw-semibold text-white me-1">Absence Percentage</small>
                                                <small className="fw-semibold text-white">0</small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-2">
                    <div className="col-md-7 col-12 mb-4">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between pb-0 bg-themprimary">
                                <div className="card-title">
                                    <h5 className="m-0 me-2 text-white">Month-wise Income Report</h5>
                                </div>
                            </div>
                            <div className="card-body mt-4">
                                <div style={{ width: "100%", height: 400 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={Monthlywiseincomedata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="income" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-12">
                        <div className="card">
                            <div className="card-header d-flex align-items-center justify-content-between pb-0 bg-themprimary">
                                <div className="card-title">
                                    <h5 className="m-0 me-2 text-white">Staff Attendance Summary</h5>
                                </div>
                            </div>
                            <div className="card-body mt-4">
                                <div>
                                    {/* Pie Chart for Attendance Summary */}
                                    <div style={{ width: "100%", height: 368, marginBottom: "2rem" }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={attendanceSummary}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    label={(entry) => `${entry.name}: ${entry.value}%`}
                                                >
                                                    {attendanceSummary.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card">
                            <h5 className="card-header bg-themprimary fw-semibold text-white">Class Record</h5>
                            <div className="table-responsive text-nowrap">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Section Student</th>
                                            <th>Present Today</th>
                                            <th>Absents Today</th>
                                            <th>On Leave</th>
                                            <th>Expected</th>
                                            <th>Generated</th>
                                            <th>Paid Amount</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {classData.map((record, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <i className="menu-icon tf-icons bx bxs-school"></i>
                                                    <strong>{record.className}</strong>
                                                </td>
                                                <td>
                                                    {record.sections.map((section, idx) => (
                                                        <span key={idx} className="badge bg-label-primary mx-1">
                                                            <i className="menu-icon tf-icons bx bx-user"></i>
                                                            {section}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-success">
                                                        <i className="menu-icon tf-icons bx bx-check"></i>
                                                        {record.present}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-danger">
                                                        <i className="menu-icon tf-icons bx bx-x"></i>
                                                        {record.absent}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-info">
                                                        <i className="menu-icon tf-icons bx bx-book-reader"></i>
                                                        {record.onLeave}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-warning">
                                                        <i className="menu-icon tf-icons bx bx-book-reader"></i>
                                                        {record.expected}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-success">
                                                        <i className="menu-icon tf-icons bx bx-book-reader"></i>
                                                        {record.generated}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-success">
                                                        <i className="menu-icon tf-icons bx bx-book-reader"></i>
                                                        {record.paid}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-label-success">
                                                        <i className="menu-icon tf-icons bx bx-book-reader"></i>
                                                        {record.balance}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Graph;
