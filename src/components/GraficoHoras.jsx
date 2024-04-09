import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

const GraficoPuntos = () => {
  const [chartData, setChartData] = useState({

    options: {
      chart: {
        id: "scatter-chart",
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        type: 'category',
        categories: [],
        labels: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 24,
        tickAmount: 24,
        labels: {
          formatter: function(val) {
            const hour = Math.floor(val);
            const minute = Math.round((val - hour) * 60);
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          }
        }
      },
      plotOptions: {
        scatter: {
          markers: {
            size: 6,
            hover: {
              size: 10
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#008FFB'],
      title: {
        text: 'Horas de Uso del Producto por Día',
        align: 'left'
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      }
    },
    series: []
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const petDataSnapshot = await get(ref(db, 'Dispensers/JIJIJIJA/history/'));
        if (petDataSnapshot.exists()) {
          const petData = petDataSnapshot.val();
          const categories = Object.keys(petData);
          const seriesData = [];

          // Crear una matriz para cada día con horas utilizadas
          categories.forEach(date => {
            const hoursUsed = [];
            petData[date].forEach(time => {
              const [hour, minute] = time.split(':').map(Number);
              const fractionOfDay = hour + minute / 60; // Convertir hora y minuto a una fracción del día
              hoursUsed.push(fractionOfDay);
            });
            seriesData.push(hoursUsed);
          });

          setChartData(prevState => ({
            ...prevState,
            options: {
              ...prevState.options,
              xaxis: {
                ...prevState.options.xaxis,
                categories: categories
              }
            },
            series: seriesData.map((data, index) => ({
              name: categories[index],
              data: data.map((value, hourIndex) => ({
                x: categories[index],
                y: value
              }))
            }))
          }));
        } else {
          console.log("No se encontraron datos.");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();

    // Limpia el efecto
    return () => {
      // Lógica de limpieza si es necesario
    };
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="scatter"
            width="800"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default GraficoPuntos;
