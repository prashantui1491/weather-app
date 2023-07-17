import React, { useState, useEffect } from 'react';

//import axios
import axios from 'axios'

//import icons

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch
} from 'react-icons/io'

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind
} from 'react-icons/bs'

import { TbTemperatureCelsius } from 'react-icons/tb'

import { ImSpinner8 } from 'react-icons/im'

//Api key

const APIkey = '4f4435901549d743f07139093f92ca47'

const App = () => {


  const [data, setData] = useState(null)
  const [location, setLocation] = useState('Bucharest')
  const [inputValue, setInputValue] = useState('')
  const [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue)
    }
    e.preventDefault()

    const input = document.querySelector('input')

    // clear input

    input.value = ""

    // if input value is empy animate the input

    if (input.value === "") {
      setAnimate(true)

      setTimeout(() => {
        setAnimate(false)
      }, 500);
    }
  }

  useEffect(() => {

    setLoading(true)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then((res) => {

      setTimeout(() => {
        setData(res.data)
        setLoading(false)

      }, 1500)

    }).catch((err) => {
      setLoading(false)
      setErrorMessage(err)
    })


  }, [location])

  // error Message

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('')
    }, 200);

    return () => clearTimeout(timer)

  }, [errorMessage])

  console.log(location, "locationtest")

  //if data is false load spinner

  if (!data) {
    return (<div>
      <div >
        <ImSpinner8 className='text-5xl animate-spin' />
      </div>

    </div>)
  }

  let icon;

  switch (data?.weather[0]?.main) {
    case 'Clear':
      icon = <IoMdSunny />;
      break

    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break

    case 'Rain':
      icon = <IoMdRainy />
      break

    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break

    case "Snow":
      icon = <IoMdSnow />
      break

    case "Thunder":
      icon = <IoMdThunderstorm />
      break

    case "Clouds":
      icon = <IoMdCloudy />

  }

  // Date object

  const date = new Date()

  // console.log(date.getUTCDate(), date.getUTCMonth()+1)

  return <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
    {/* form */}
    <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
      {errorMessage && <div>{`${errorMessage.response.data.message}`}</div>}
      <div className='h-full relative flex items-center justify-between p-2'>
        <input onChange={(e) => handleInputValue(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search city'></input>
        <button className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center '>
          <IoMdSearch onClick={(e) => handleSubmit(e)} className='text-2xl text-white' />
        </button>
      </div>
    </form>

    {/* card */}
    <div>

      <div className='w-full bg-black/20 min-h-[584px] min-w-[450px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {loading ? <div className='w-full h-full flex justify-center items-center'><ImSpinner8 className='text-5xl text-white animate-spin' /></div> : <div>
          {/* card top */}
          <div className='flex items-center gap-x-5'>

            {/* icon placement */}
            <div className='text-[87px]'>{icon}</div>

            {/* country name */}
            <div className='text-2xl font-semibold'>{data?.name}, {data?.sys?.country}</div>

            {/* date */}
            <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>


          </div>


          {/* card body */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/* temperature */}
              <div className='text-[144px] leading-none font-light'>{parseInt(data?.main?.temp)}</div>

              {/* celciuls icon */}
              <div className='text-4xl'><TbTemperatureCelsius /></div>
            </div>

            {/* weather description */}
            <div className='capitilise text-center'>{data?.weather[0]?.description}</div>
          </div>



          {/* card bottom */}
          <div className='max-w-[378px]'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Visibility {" "}
                  <span className='ml-2'>{data.visibility / 100} km</span>
                </div>
              </div>

              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsThermometer />
                </div>
                <div className='flex'>
                  Feels Like
                  <div className='flex ml-2'>{parseInt(data.main.feels_like)} <TbTemperatureCelsius /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Humidity and wind section */}

          <div className='max-w-[378px]'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Humidity
                  <span className='ml-2'>{data.main.humidity} %</span>
                </div>
              </div>

              <div className='flex items-center gap-x-2'>
                {/* icon */}
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div>
                  Wind <span className='ml-2'>{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  </div>;
};

export default App;
