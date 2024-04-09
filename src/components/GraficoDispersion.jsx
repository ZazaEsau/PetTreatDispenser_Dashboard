import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

const GraficoPastel = () => {
  const [pieChartData, setPieChartData] = useState({
    series: [],
    options: {
      labels: [],
      colors: [],
      legend: {
        position: "bottom"
      }
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dispenserId = urlParams.get('dispenserId');

    if (!dispenserId) return;

    const fetchData = async () => {
      try {
        const petDataSnapshot = await get(ref(db, `Dispensers/${dispenserId}/history`));
        if (petDataSnapshot.exists()) {
          const petData = petDataSnapshot.val();
          const last7Days = Object.keys(petData).slice(-7);
          
          // Contar la cantidad de veces que se utilizó el producto en cada hora
          const hourCounts = {};
          last7Days.forEach(day => {
            petData[day].forEach(time => {
              const hour = time.split(":")[0];
              hourCounts[hour] = (hourCounts[hour] || 0) + 1;
            });
          });

          // Preparar los datos para el gráfico de pastel
          const labels = Object.keys(hourCounts);
          const data = Object.values(hourCounts);

          setPieChartData({
            series: data,
            options: {
              labels: labels,
              colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8', '#F9CE1D', '#6C7A89'],
              legend: {
                position: "bottom"
              }
            }
          });
        } else {
          console.log("No se encontraron datos para los últimos 7 días del dispensador con ID:", dispenserId);
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
    <div className="row">
      <div className="pie-chart">
        <Chart
          options={pieChartData.options}
          series={pieChartData.series}
          type="donut"
          width="500"
        />
      </div>
    </div>
  );
};

export default GraficoPastel;
