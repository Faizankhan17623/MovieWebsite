import {Routes,Route} from 'react-router-dom'
import  Home  from './Components/Home'

function App() {
  return(
    <div className='w-full bg-black'>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      This is the testing
    </div>
  )
}

export default App