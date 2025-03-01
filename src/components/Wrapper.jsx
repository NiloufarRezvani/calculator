
import './Wrapper.madule.css'
function Wrapper({children}) {
  return (
    <div className="w-[340px] h-[540px] p-[10px] rounded-md bg-gray-800 bg-linear">{children}</div>
  )
}

export default Wrapper