
const Line = ({changes,part}) => {
  
  console.log(part)

    return (
    <div className="border-b-2 border-red-500 ">
      <div className="flex justify-center gap-2 items-center  mt-8 Line_Head h-14 w-full line_Difference/">
        <span className="h-9 bg-yellow-200 w-7 flex justify-center items-center text-3xl rounded-2xl text-richblack-900 cursor-pointer">1</span>
        <p className={`${part === 1?"text-yellow-400":"text-white"}`}>-----------------</p>
        <span className="h-9 bg-yellow-200 w-7 flex justify-center items-center text-3xl rounded-2xl text-richblack-900 cursor-pointer">2</span>
        <p className={`${part === 2?"text-yellow-400":"text-white"}`}>-----------------</p>
        <span className="h-9 bg-yellow-200 w-7 flex justify-center items-center text-3xl rounded-2xl text-richblack-900 cursor-pointer">3</span>
        <p className={`${part === 3?"text-yellow-400":"text-white"}`}>-----------------</p>
        <span className="h-9 bg-yellow-200 w-7 flex justify-center items-center text-3xl rounded-2xl text-richblack-900 cursor-pointer">4</span>
        <p className={`${part === 4?"text-yellow-400":"text-white"}`}>-----------------</p>
        <span className="h-9 bg-yellow-200 w-7 flex justify-center items-center text-3xl rounded-2xl text-richblack-900 cursor-pointer">5</span>
      </div> 
    </div>
  )
}

export default Line 