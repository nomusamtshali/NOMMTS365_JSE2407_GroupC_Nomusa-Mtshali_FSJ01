const Skeleton = ({ height = "h-6", width = "w-full", className = "" }) => {
  return ( 
  <div className={`bg-gray-300 animate-pulse rounded ${height} ${width} ${className}`}></div> 
  ) 
}

export default Skeleton

