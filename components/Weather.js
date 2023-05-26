import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"
import axios from "axios";
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from "react-icons/io"
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { TbTemperatureCelsius } from "react-icons/tb";


const APIkey = 'a43db4985e48e461b011dd1954d3d525';

const Weather = () => {

    const [data, setData] = useState(null);
    const [location, setLocation] = useState('İstanbul');
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log(inputValue);
        if (inputValue !== '') {
            setLocation(inputValue);
        }

        //*
        const input = document.querySelector('input');

        if (input.value === '') {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
            }, 500);
        }
        //*
        input.value = '';

        e.preventDefault();
    };

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

        axios.get(url).then((res) => {
            setData(res.data);
        }).catch(err =>{
            setErrorMsg(err);
        });
    }, [location]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMsg('')
        }, 2000)

        return () => clearTimeout(timer);
    }, [errorMsg])
    
    if (!data) {
        return (
            <div>
                <div>
                    <ImSpinner8 className="text-5xl animate-spin" />
                </div>
            </div>
        );
    }

    let icon;


    switch(data.weather[0].main) {
        case 'Clouds':
            icon = <IoMdCloudy />;
            break;
        case 'Haze':
            icon = <BsCloudHaze2Fill />;
            break;
        case 'Rain':
            icon = <IoMdRainy className="text-[#31cafb]" />;
            break;
        case 'Clear':
            icon = <IoMdSunny className="text-[#ffde33]" />;
            break;
        case 'Drizzle':
            icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
            break;
        case 'Snow':
            icon = <IoMdSnow className="text-[#31cafb]" />;
            break;
        case 'Thunderstrom':
        icon = <IoMdThunderstorm />;
        break;
        }

        const date = new Date();
    

    return (

        <div className="hidden lg:block w-[350px] mt-2">
            {/* <div className="bg-[#eff3f4] dark:bg-[#16181C] flex gap-2 rounded-full py-2 px-4 dark:text-white items-center text-[20px] sticky top-1 z-10 mt-2">
                <FiSearch /> 
                <input className="bg-transparent w-[100%] outline-none" type="text" placeholder="Search Twitter" />
            </div> */}
                
            <div className="w-full rounded-[33px] bg-gradient-to-r from-sky-500 to-indigo-500 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 mt-5">

                <div className="w-full max-w-[450px] bg-black/20 min-h-[400px] text-white rounded-[32px] pt-3 pb-5 px-6">
                    {errorMsg &&(
                        <div className="w-[300px] max-w-[80vw] lg:max-w-[450px] bg-[#ff208c] text-white p-2 mb-2 capitalize rounded-md">
                            {`${errorMsg.response.data.message}`}
                        </div>
                    )}
                        {/* form */}
                        <form  className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full`}>
                            <div className="h-full relative flex items-center justify-between p-2">
                                <input onChange={(e) => handleInput(e)}
                                    className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[14px] font-light pl-6 h-full mr-2" 
                                    type="text" 
                                    placeholder="Search by city or country" 
                                />
                                <button 
                                    onClick={(e) => handleSubmit(e)} 
                                    className="bg-[#1d9bf0] hover:bg-[#1a8cd8] w-20 h-12 rounded-full flex justify-center items-center transition">
                                    <IoMdSearch className="text-2xl text-white" />
                                </button>
                            </div>
                        </form>
                        <div>
                            <div className="flex items-center gap-x-5">
                                <div className="text-[90px] mt-2">{icon}</div>
                                <div>
                                    <div className="text-[20px] font-semibold">
                                    {data.name}, {data.sys.country}
                                    </div>

                                    <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
                                    
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-center items-center">
                                    <div className="text-[90px] leading-none font-light mb-2">
                                        {parseInt(data.main.temp)}
                                    </div>
                                    <div className="text-3xl">
                                        <TbTemperatureCelsius />
                                    </div>
                                </div>
                                <div className="capitalize text-center text-[14px]">
                                    {data.weather[0].description}
                                </div>
                            </div>

                            <div className="max-w-[378px] mx-auto flex flex-col gap-y-4">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="text-[20px]">
                                            <BsEye />
                                        </div>
                                        <div className="text-[14px]">
                                            Visibility{' '}
                                            <span className="ml-2">{data.visibility / 1000} km</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <div className="text-[20px]">
                                            <BsThermometer />
                                        </div>
                                        <div className="flex text-[14px]">
                                            Feels like
                                            <div className="flex ml-2">{parseInt(data.main.feels_like)}
                                                <TbTemperatureCelsius />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="text-[20px]">
                                            <BsWater />
                                        </div>
                                        <div className="text-[14px]">
                                            Humidity
                                            <span className="ml-2">{data.main.humidity} %</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <div className="text-[20px]">
                                            <BsWind />
                                        </div>
                                        <div className="text-[14px]">
                                            Wind
                                            <span className="ml-2">{data.wind.speed} m/s</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                
            </div>

        </div>
    )
}

export default Weather