
import './App.css';
/* import GraficaLastWeek, { GraficaHoursLastWeek, GraficaLastMonth } from './components/Grafica'; */
import { GraficoSemana, GraficoMes} from './components/Grafico';
import GraficoPuntos from './components/GraficoHoras';
import GraficoPastel from './components/GraficoDispersion';

function App() {
  return (
    <div className="App">
      <div className='App-header'>
        <h1>Estadísticas de tu mascota</h1>
      </div>

      <div className='Section-header'>
        <h2>Cantidad de veces que se presionó el botón</h2>
      </div>

      <div className='Section'>
        <div className='w123'>
          <h2>Última semana</h2>
          <GraficoSemana/>
          {/* <GraficaLastWeek/> */}
        </div>

        <div className='w123'>
          <h2>Último mes</h2>
          <GraficoMes/>
          {/* <GraficaLastMonth/> */}
        </div>
      </div>

      <div className='Section-header'>
        <h2>Horas a las que fue presionado el botón</h2>
      </div>
      
      <div className='Section'>
        <div className='w123'>
          <h2>Horas</h2>
          {/* <GraficoPuntos/> */}
          <GraficoPastel/>
        </div>
      </div>
      
      
        
      
    </div>
  );
}

export default App;

