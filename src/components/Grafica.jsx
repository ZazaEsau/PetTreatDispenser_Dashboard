/* import React, { Component } from "react";
import Chart from "react-apexcharts";
import { db } from "../firebase";
import { ref, get, push} from "firebase/database";

// De la siguiente manera hacemos una consulta a la base de datos de Firebase para obtener los datos de la mascota.
const getPetData = async () => {
    var petData = await get(ref(db, 'Dispensers/JIJIJIJA/history/') );
    if (petData.exists()) {
        return petData.val();
    } else {
        return null;
    }
}



const users = [
    {
        username: 'ZazaEsau',
        name: 'Esaú',
        email: "esaumelendezpi@gmail.com",
        password: "123456",
        age: 19,
        pet: {
            animal: 'Gato',
            name: 'Taco',
            stats: {
                history: [
                    {date: "14/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "15/02/2024", times: ["12:00", "18:00"]},
                    {date: "16/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "17/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "18/02/2024", times: ["12:00", "18:00"]},
                    {date: "19/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "20/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "21/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "22/02/2024", times: ["12:00", "18:00"]},
                    {date: "23/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "24/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "25/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "26/02/2024", times: ["12:00", "18:00"]},
                    {date: "27/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "28/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "29/02/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "01/03/2024", times: ["12:00", "18:00"]},
                    {date: "02/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "03/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "04/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "05/03/2024", times: ["12:00", "18:00"]},
                    {date: "06/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "07/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "08/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "09/03/2024", times: ["12:00", "18:00"]},
                    {date: "10/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "11/03/2024", times: ["12:00"]},
                    {date: "12/03/2024", times: ["12:00", "18:00", "22:00"]},
                    {date: "13/03/2024", times: ["12:00", "18:00"]},
                    {date: "14/03/2024", times: ["12:00", "18:00", "22:00"]},
                ]
            }
        }
    }
]

// Luego creamos una variable en la que guardaremos únicamente los datos de los últimos 7 días.
const lastSevenDays = users[0].pet.stats.history.slice(-7);

// También una variable que guarde únicamente los datos del último mes.
const lastMonth = users[0].pet.stats.history.slice(-30);


const lastSevenDays = petData.slice(-7);
const lastMonth = petData.slice(-30);



const GraficaLastWeek = () => {
    const dates = lastSevenDays.map((item) => item.date);
    const times = lastSevenDays.map((item) => item.times.length);
    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: dates,
          
        },
        colors: ['#4BA396'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top'
                },
            }
            },
        stroke: {
          curve: 'smooth',
            width: 2,
            
        }
      }
      const series = [
        {
          name: "times",
          data: times.slice()
        }
      ]
    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="line"
                width="400"
            />
        </div>
    )
}

const GraficaLastMonth = () => {
    const dates = lastMonth.map((item) => item.date);
    const times = lastMonth.map((item) => item.times.length);
    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: dates,
          
        },
        colors: ['#4BA396'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top'
                },
            }
            },
        stroke: {
          curve: 'smooth',
            width: 2,
            
        }
      }
      const series = [
        {
          name: "times",
          data: times.slice()
        }
      ]
    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="bar"
                width="600"
            />
        </div>
    )
}

// Ahora una gráfica que muestre las horas a las que fue presiona el botón de alimentar a la mascota.
const GraficaHoursLastWeek = () => {
    const dates = lastSevenDays.map((item) => item.date);
    const times = lastSevenDays.map((item) => item.times);
    const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: dates,
          
        },
        colors: ['#4BA396'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top'
                },
            }
            },
        stroke: {
          curve: 'smooth',
            width: 2,
            
        }
      }
      const series = [
        {
          name: "times",
          data: times
        }
      ]
    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="bar"
                width="500"
            />
        </div>
    )
}



export default GraficaLastWeek;
export {GraficaLastMonth};
export {GraficaHoursLastWeek}; */