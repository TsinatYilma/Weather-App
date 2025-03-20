
const img = document.querySelector('img');
const api_key = 'WQCKVETPEAR7TREKWEM8YS7GE'
let city; 
const date1 = '2025-03-04'; 
const date2 = '2025-03-04'; 
//setting the location
document.querySelector('.submitLocation').addEventListener('click', ()=>{
  city = document.querySelector('.locationInput').value;
  fetchWeatherData();
})
document.querySelector('.locationInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    city = document.querySelector('.locationInput').value;
    fetchWeatherData(city);
  }
});
//preparing five days ahead
const getCurrentDateAndNextFiveDays = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    dates.push(formattedDate);
  }

  return dates;
};

const dates = getCurrentDateAndNextFiveDays();

// will make images get selected from each catagory
const sunnyimg = [
  "images/sunny/clement-fusil-Fpqx6GGXfXs-unsplash.jpg",
  "images/sunny/pexels-brett-sayles-912364.jpg",
  "images/sunny/pexels-freestockpro-345522.jpg",
  "images/sunny/pexels-grizzlybear-1198507.jpg"
]
const cloudyimg = [
  'images/cloudy/clouds-5368435_1280.jpg',
  'images/cloudy/pexels-pixabay-52531.jpg',
  'images/cloudy/pexels-pixabay-158163.jpg',
  'images/cloudy/pexels-souvenirpixels-1486974.jpg'
]
const rainyimg = [
  'images/rainy/pexels-apasaric-1530423.jpg',
  'images/rainy/pexels-vika-glitter-392079-1619719.jpg',
  'images/rainy/pexels-szymon-shields-1503561-17099157.jpg',
  'images/rainy/pexels-andre-furtado-43594-2961360.jpg'
]
const coldimg = [
  'images/cold/pexels-brigitte-tohm-36757-287222.jpg',
  'images/cold/pexels-eberhardgross-1004665.jpg',
  'images/cold/pexels-fotios-photos-730256.jpg',
  'images/cold/pexels-gabriela-palai-129458-395196.jpg'
]
const sunnyicon = [
  'images/icons/sun (1).png',
  'images/icons/sunny.png',
  'images/icons/cloudy (1).png'
]
const cloudyicon = [
  'images/icons/cloud.png',
  'images/icons/cloudy-day.png',
  'images/icons/cloudy.png'
]
const rainicon = [
  'images/icons/rainy-day.png',
  'images/icons/rainy.png',
  'images/icons/heavy-rain.png'
]
const snowicon = [
  'images/icons/snowflake.png',
  'images/icons/snowman.png',
  'images/icons/pine-tree.png',
  'images/icons/snowy.png',
  'images/icons/tree.png'
]
function randomimage(imagearray){
  const randomindex = Math.floor(Math.random() * imagearray.length)
  return imagearray[randomindex];
}
const now = new Date();

const day = now.getDate(); // Day of the month
const month = now.toLocaleString('default', { month: 'long' }); // Full month name
const year = now.getFullYear(); // Year
const hours = now.getHours().toString().padStart(2, '0'); // Hour (2 digits)
const minutes = now.getMinutes().toString().padStart(2, '0'); // Minute (2 digits)

const customFormatted = `${day} ${month} ${year}, ${hours}:${minutes}`;
document.querySelector('.datetime').innerHTML = `${customFormatted}`

const fetchWeatherData = async () => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${dates[0]}/${dates[dates.length - 1]}?unitGroup=metric&key=${api_key}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const temp = Math.floor(data.currentConditions.temp);
      const description  = data.description;
      document.querySelector('.news').innerHTML = `${description}`
      document.querySelector('.temp').innerHTML = `${temp}&deg;C`
      //setting the bg-image based on the condition
      const conditionoftoday = data.currentConditions.conditions.toLowerCase();
      const condition = conditionoftoday.split(',').map(condition => condition.trim());
      const conditions = condition[Math.floor(Math.random() * condition.length)]
      if (["clear", "sunny", "partly cloudy","partially cloudy"].includes(conditions)&& temp > 15) {
        const imageurl = randomimage(sunnyimg);
        document.body.style.backgroundImage = `url(${imageurl})`
        document.querySelector('.bgimg').style.backgroundImage = `url(${imageurl})`
        document.querySelector('.weatherheader').innerHTML = 'Sunny';
      }else if(temp <= 15){
        const imageurl = randomimage(coldimg)
        document.body.style.backgroundImage = `url(${imageurl})`
        document.querySelector('.bgimg').style.backgroundImage = `url(${imageurl})`
        document.querySelector('.weatherheader').innerHTML = 'Freezing'
      } else if (["mostly cloudy", "overcast", "fog", "haze", "mist"].includes(conditions)) {
        const imageurl = randomimage(cloudyimg);
        document.body.style.backgroundImage = `url(${imageurl})`
        document.querySelector('.bgimg').style.backgroundImage = `url(${imageurl})`
        document.querySelector('.weatherheader').innerHTML = 'Cloudy'
      } else if (["rain", "light rain", "heavy Rain", "drizzle", "thunderstorm", "freezing rain", "sleet"].includes(conditions)) {
        const imageurl = randomimage(rainyimg);
        document.body.style.backgroundImage = `url(${imageurl})`
        document.querySelector('.bgimg').style.backgroundImage = `url(${imageurl})`
        document.querySelector('.weatherheader').innerHTML = 'Raining'
      }else{
        console.log("i did't get the condition")
      }

      //for the comming days forcast
      const nextdays = data.days
      
      nextdays.forEach((day, index) =>{
        if(index === 0 ){
          return;
        }
        index  = index - 1
        index = index.toString()
        const conditionsofday = day.conditions.toLowerCase();
        
        const conditions = conditionsofday.split(',').map(condition => condition.trim());
        const condition = conditions[Math.floor(Math.random() * conditions.length)]
        
        const datetime = day.datetime
        const date = new Date(datetime); 
        const options = { weekday: 'long' };
        const option = { month: 'short'}
        const dayName = date.toLocaleDateString('en-US', options);
        const monthName = date.toLocaleDateString('en-US', option)
        const dateNumber = date.getDate();

        document.querySelector(`.date-${index}`).innerHTML = `${dayName}, ${monthName} ${dateNumber} `
        document.querySelector(`.condition-${index}`).innerHTML = `${condition}`

        const tempmin = Math.floor(day.tempmin);
        const tempmax = Math.floor(day.tempmax);
        const temp = day.temp
        
        document.querySelector(`.templow-${index}`).innerHTML = `${tempmin}&deg;`;
                document.querySelector(`.temphigh-${index}`).innerHTML = `${tempmax}&deg;`;
        console.log(typeof conditions)
        if (["clear", "sunny", "partly cloudy"].includes(condition)) {
          const Imageurl = randomimage(sunnyicon);
          document.querySelector(`.img-${index}`).src = `${Imageurl}`
          
        } else if(["snow", "light snow", 'blizzard', 'freezing rain', 'heavy snow', 'snow shower', 'sleet', 'frost'].includes(condition) || temp < 10){
          const Imageurl = randomimage(snowicon)
          document.querySelector(`.img-${index}`).src =  `${Imageurl}`
        }else if (["mostly cloudy", "overcast", "fog", "haze", "mist","partially cloudy"].includes(condition)) {
          const Imageurl = randomimage(cloudyicon)
          document.querySelector(`.img-${index}`).src = `${Imageurl}`
        } else if (["rain", "light rain", "heavy Rain", "drizzle", "thunderstorm", "freezing rain", "sleet"].includes(condition)) {
          const Imageurl = randomimage(rainicon)
          document.querySelector(`.img-${index}`).src =  `${Imageurl}`
        }else{
          console.log("i did't get the condition")
        }
        console.log(conditions)
      })
       
      const currenthour = new Date().getHours();
      const nexthour = data.days[0].hours
      let count = 0;
      nexthour.forEach((hour, index) =>{
        const hourValue = parseInt(hour.datetime.split(':')[0], 10);
        
    if(hourValue > currenthour){
          const [HH, MM] = hour.datetime.split(':');
          const hourtemp = hour.temp;
      document.querySelector(`.hour-${count}`).style.display = 'flex';
          document.querySelector(`.hourtime-${count}`).innerHTML = `${HH}:${MM}`
          document.querySelector(`.hourtemp-${count}`).innerHTML = `${hourtemp}&deg;`

          const conditionsofday = hour.conditions.toLowerCase();
          const conditions = conditionsofday.split(',').map(condition => condition.trim());
          const condition = conditions[Math.floor(Math.random() * conditions.length)]

          if (["clear", "sunny", "partly cloudy"].includes(condition)) {
            const Imageurl = randomimage(sunnyicon);
            document.querySelector(`.hourimg-${count}`).src = `${Imageurl}`
            
          } else if(["snow", "light snow", 'blizzard', 'freezing rain', 'heavy snow', 'snow shower', 'sleet', 'frost'].includes(condition) || temp < 10){
            const Imageurl = randomimage(snowicon)
            document.querySelector(`.hourimg-${count}`).src =  `${Imageurl}`
          }else if (["mostly cloudy", "overcast", "fog", "haze", "mist","partially cloudy"].includes(condition)) {
            const Imageurl = randomimage(cloudyicon)
            document.querySelector(`.hourimg-${count}`).src = `${Imageurl}`
          } else if (["rain", "light rain", "heavy Rain", "drizzle", "thunderstorm", "freezing rain", "sleet"].includes(condition)) {
            const Imageurl = randomimage(rainicon)
            document.querySelector(`.hourimg-${count}`).src =  `${Imageurl}`
          }else{
            console.log("i did't get the condition")
          }
          

          count = ++count
        }
      })
    }catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  // Call the function to fetch weather data
  fetchWeatherData();
