import s from  './App.module.css';
import InputToDo from "./Components/InputToDo/InputToDo";
import ToDo from "./Components/ToDo/ToDo";

function App() {
  return (
      <div className={s.app}>
          <div className={s.main}>
              <div className={s.logo}>
                  <span>Список задач</span>
              </div>
              <InputToDo />
              <ToDo />
          </div>
      </div>
  );
}

export default App;
