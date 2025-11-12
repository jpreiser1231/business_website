import './App.css'
import {Outlet,useNavigate} from "react-router";
import dayjs from "dayjs"
import {LocalizationProvider, StaticDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";

export function NavBar() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/Products'); // Navigates to /#/products
  };
    const goToCart = () => {
        navigate('/Cart'); // Navigates to /#/cart
    };
    const goToHome = () => {
        navigate(''); // Navigates to home
    };
  return (
      <>

          <div id="nav-bar">
              <div className="nav-button nav-buttonImg" onClick={goToHome}><img id="business-logo"
                                                                                src="Images/Screenshot 2025-10-30 102735.png"></img>
              </div>
              <div className="nav-button" onClick={goToProducts}>
                  <div className={" nav-buttonTxt"}>Book</div>
              </div>
              <div className="nav-button" onClick={goToCart}>
                  <div className={" nav-buttonTxt"}>Cart</div>
              </div>
          </div>
          <div id = "nav-outlet">
              <Outlet/>
          </div>
      </>
  );
}

export function Home() {
    const navigate = useNavigate();
    const goToProducts = () => {
        navigate('/Products'); // Navigates to /#/products
    };
    const scroll = () => {
        window.scrollTo({ top: (document.getElementById("team-title") as HTMLElement).offsetTop, behavior: 'smooth', });
    }
    return (
        <div className="page">
            <h1 className="title"> Welcome To Tailored Finds: Personal Style, Perfectly Curated For You!</h1>
            <div id="bookinfo">
                <div id="book">
                    <h3>Book a one-on-one session with a personal stylist who understands your unique taste and
                        lifestyle.
                    </h3>
                    <button id="book-now-button" onClick={goToProducts}>Book Now!</button>
                </div>
                <div id="info">
                    <h5>Tailored Finds helps you discover and express your unique style with confidence. We go beyond
                        shopping by truly understanding each client, making every recommendation personal, authentic,
                        and effortless
                    </h5>
                    <button id="more-info-button" onClick={scroll}>More Info!</button>
                </div>
            </div>
            <div id="team-title">
                <h1>Meet The Team</h1>
            </div>
            <div id="team">
                <img src="Images/business-team.png"></img>
            </div>
            <div>

            </div>

        </div>
    );
}

export function Products() {
    return (
        <div className="page">
            <h1 className="title">Book Your Personalized Fashion Consultation</h1>
            <div id="info-calendar">
                <div id="cal-info">
                    Choose a date and time that fits your schedule — we’ll match you with a stylist who fits your style goals.
                </div>
                <div id="calendar">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} onAccept={(value)=>{
                            let  bookingInfo = []
                            if(localStorage.getItem("bookingInfo") !== null) {
                                bookingInfo = JSON.parse(localStorage.getItem("bookingInfo") as string);
                            }
                            bookingInfo.push(value);
                            localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
                        }}/>
                    </LocalizationProvider>
                </div>
            </div>

        </div>
    );
}

export function Cart() {
    function getItem(key: string): string[]{
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as string[] : [];
    }
    function getDayOfWeek(dayOfWeek: number)
    {
        if(dayOfWeek == 0)
            return "Sunday";
        if(dayOfWeek == 1)
            return "Monday";
        if (dayOfWeek == 2)
            return "Tuesday";
        if(dayOfWeek == 3)
            return "Wednesday";
        if(dayOfWeek == 4)
            return "Thursday";
        if(dayOfWeek == 5)
            return "Friday";
        if(dayOfWeek == 6)
            return "Saturday";
    }
    function getMonth(month: number)
    {
        if(month == 0)
            return "January";
        if(month == 1)
            return "February";
        if (month == 2)
            return "March";
        if(month == 3)
            return "April";
        if(month == 4)
            return "May";
        if(month == 5)
            return "June";
        if(month == 6)
            return "July";
        if(month == 7)
            return "August";
        if(month == 8)
            return "September";
        if(month == 9)
            return "October";
        if(month == 10)
            return "November";
        if(month == 11)
            return "December";
    }
    function getRealTime(realHour: number, realMinute: number)
    {
        (if realHour > 12)
            return realHour + ":" + realMinute + "PM";
    }
    const [items, setItems] = useState(getItem("bookingInfo"));
    return (
        <div className="page" id = "cartPage">
            <h1 className="title">Confirm Booking</h1>
            {items.map((item, index) => <div key ={index}>
            Booking For: {getDayOfWeek(dayjs(item).day())}, {getMonth(dayjs(item).month())} {dayjs(item).date()}, {dayjs(item).year()} at getRealTime((dayjs(item).hour)}
        </div>)}
        </div>
    );
}
