import { useState } from "react"

interface IProps {
  ingredientName : string
}

export const BrandForm = ({ingredientName} : IProps) => {
  const [brandName, setBrandName] = useState('')
}