import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

const GraficoSemana = () => {
  const [chartDataWeek, setChartDataWeek] = useState({
    options: {
      chart: {
        id: "basic-bar-week",
      },
      xaxis: {
        categories: [],
      },
      colors: ['#71C19B'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
    },
    series: [
      {
        name: "Presiones de Botón (Última semana)",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dispenserId = urlParams.get('dispenserId');

    if (!dispenserId) return;

    const fetchData = async () => {
      try {
        const petDataSnapshotWeek = await get(ref(db, `Dispensers/${dispenserId}/history/`));
        if (petDataSnapshotWeek.exists()) {
          const petDataWeek = petDataSnapshotWeek.val();
          const datesWeek = Object.keys(petDataWeek).slice(0, 7);
          const timesWeek = datesWeek.map(date => Object.keys(petDataWeek[date]).length);
          setChartDataWeek(prevState => ({
            ...prevState,
            options: {
              ...prevState.options,
              xaxis: {
                categories: datesWeek,
              },
            },
            series: [
              {
                name: "Presiones de Botón (Última semana)",
                data: timesWeek,
              },
            ],
          }));
        } else {
          console.log("No se encontraron datos para la última semana.");
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
      <div className="mixed-chart">
        <Chart
          options={chartDataWeek.options}
          series={chartDataWeek.series}
          type="line"
          width="500"
        />
      </div>
    </div>
  );
};

const GraficoMes = () => {
  const [chartDataMonth, setChartDataMonth] = useState({
    options: {
      chart: {
        id: "basic-bar-month",
      },
      xaxis: {
        categories: [],
      },
      colors: ['#71C19B'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
    },
    series: [
      {
        name: "Presiones de Botón (Último mes)",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dispenserId = urlParams.get('dispenserId');

    if (!dispenserId) return;

    const fetchData = async () => {
      try {
        const petDataSnapshotMonth = await get(ref(db, `Dispensers/${dispenserId}/history/`));
        if (petDataSnapshotMonth.exists()) {
          const petDataMonth = petDataSnapshotMonth.val();
          const datesMonth = Object.keys(petDataMonth).slice(0, 30);
          const timesMonth = datesMonth.map(date => Object.keys(petDataMonth[date]).length);

          const formattedDates = datesMonth.map(date => date.substring(5));

          setChartDataMonth(prevState => ({
            ...prevState,
            options: {
              ...prevState.options,
              xaxis: {
                categories: formattedDates,
              },
            },
            series: [
              {
                name: "Presiones de Botón (Último mes)",
                data: timesMonth,
              },
            ],
          }));
        } else {
          console.log("No se encontraron datos para el último mes.");
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
      <div className="mixed-chart">
        <Chart
          options={chartDataMonth.options}
          series={chartDataMonth.series}
          type="bar"
          width="500"
        />
      </div>
    </div>
  );
};

export { GraficoSemana, GraficoMes };
