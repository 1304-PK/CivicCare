import { FourSquare } from "react-loading-indicators";

const LoadingSpinner = () => {
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    }}>
        <FourSquare color="#32cd32" size="medium" text="" textColor="" />
    </div>
  )
}

export default LoadingSpinner