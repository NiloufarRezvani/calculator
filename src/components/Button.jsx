import './Button.module.css'

function Button({className, value,onClick}) {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}

export default Button