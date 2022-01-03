import { useParams } from "react-router-dom"


const PhoneDetails = () => {
    const { name } = useParams()
    return (
        <h1>{name}</h1>
    )
}

export default PhoneDetails