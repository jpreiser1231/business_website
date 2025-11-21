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
        (document.getElementById("more-info-1") as HTMLElement).classList.add("show");
        (document.getElementById("more-info-2") as HTMLElement).classList.add("show");
        (document.getElementById("more-info-3") as HTMLElement).classList.add("show");
        (document.getElementById("more-info-4") as HTMLElement).classList.add("show");
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
            <div id="more-info">
                <div className = "info-item" id={"more-info-1"}>
                    <h1 className = "info-header">Personalized Style Curation</h1>
                    Experience a smarter, more effortless way to discover your look. Our platform gets to know your individual tastes, lifestyle, and budget, then handpicks clothing and accessories that genuinely reflect who you are. Instead of scrolling endlessly or second-guessing your choices, you’ll receive thoughtfully curated recommendations that fit your style goals and daily needs. Save time, feel confident in every selection, and enjoy a shopping experience that finally feels personal, intuitive, and made just for you.                </div>
                <div className = "info-item"  id={"more-info-2"}>
                    <h1 className = "info-header">Quiz to Closet</h1>
                    Your answers guide every recommendation, ensuring each item feels intentionally chosen just for you. Instead of sifting through endless options, you’ll receive curated pieces that match your style preferences, fit needs, and budget. This makes shopping not only easier and more enjoyable, but also more personalized than ever—helping you discover items you’ll love with confidence and ease.
                </div>
                <div className = "info-item"  id={"more-info-3"}>
                    <h1 className = "info-header">Style Without Stress</h1>
                    You’re a busy, style-conscious individual who wants to look and feel your best—without wasting time hunting for the right clothes and accessories. Whether your schedule is packed, you’re overwhelmed by endless options, or you simply prefer a more effortless way to shop, you deserve a simpler path to great style. Our platform streamlines the entire process, helping you quickly discover pieces that fit your taste, your lifestyle, and your budget, so you can look confident and put-together without the stress or the hours of searching.
                </div>
                <div className = "info-item"  id={"more-info-4"}>
                    <h1 className = "info-header">Style Made Simple</h1>
                    This includes professionals, students, and anyone who values both convenience and personal expression. Whether you’re dressing for the office, campus, or everyday life, you want your wardrobe to reflect who you are—without adding extra effort to your routine. Our platform supports people from all walks of life who appreciate style that’s easy, authentic, and tailored to their unique identity and schedule. If you care about looking put-together while keeping things simple, you’re exactly who we’re here for.
                </div>
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
    const [items, setItems] = useState(getItem("bookingInfo"));
    function getItem(key: string): string[]{
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as string[] : [];
    }
    function getTotalCost()
    {
        let totalCost = 0;
        const storedArray = localStorage.getItem("bookingInfo");
        let myArray = [];
        if(storedArray)
        {
            myArray = JSON.parse(storedArray);
        }
        const arrayLength = myArray.length;
        for(let i = 0; i < arrayLength; i++)
        {
            totalCost += 99;
        }
        return totalCost;
    }
    function clearCart()
    {
        const newArray = getItem("bookingInfo");
        if(newArray)
        {
            for(let i = newArray.length - 1;i>=0;i--)
            {
                newArray.pop();
            }
        }
        setItems(newArray)
        localStorage.clear();
    }
    function itemDelete(removeIndex: number)
    {
        const oldArray = getItem("bookingInfo");
        const newArray = []
        if(oldArray)
        {
            for(let i = 0; i < oldArray.length; i++)
            {
               if(i !== removeIndex)
               {
                   newArray.push(oldArray[i])
               }
            }
        }
        setItems(newArray)
        localStorage.setItem("bookingInfo", JSON.stringify(newArray))
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
        if (realHour >= 12)
        {
            if(realMinute < 9)
            {
                if(realHour == 12)
                {
                    return realHour + ":" + "0" + realMinute + "PM";
                }
                return realHour%12 + ":" + "0" + realMinute + "PM";
            }
            if(realHour == 12)
            {
                return realHour + ":" + realMinute + "PM";
            }
            return realHour%12 + ":" + realMinute + "PM";
        }

        if(realMinute < 9)
        {
            if(realHour == 0)
            {
                return "12:" + "0" + realMinute + "AM";
            }
            return realHour+ ":" + "0" + realMinute + "AM";
        }
        if(realHour == 0)
        {
            return "12:" + realMinute + "AM";
        }
        else return realHour+ ":" + realMinute + "AM";
    }
    return (
        <div className="page" id = "cartPage">
            <h1 className="title">Confirm Booking</h1>
            <div id = "cart-everything">
                <div>{items.map((item, index) => <div style={{display: "flex"}}>
                    <div className="cartItem" key={index}>
                        Booking
                        For: {getDayOfWeek(dayjs(item).day())}, {getMonth(dayjs(item).month())} {dayjs(item).date()}, {dayjs(item).year()} at {getRealTime((dayjs(item).hour()), (dayjs(item).minute()))} $99
                    </div>
                    <button id="deleteButton" onClick={() => itemDelete(index)}>🗑️</button>
                </div>)}
                </div>
                <div id="totalCost-Clear">
                    <div id="totalCost">
                        Total Cost: ${getTotalCost()}
                    </div>
                    <div id="clearDiv">
                        <button id="clearButton" onClick={clearCart}>Clear Cart</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
