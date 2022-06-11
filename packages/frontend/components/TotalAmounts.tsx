interface TotalAmountProps {
  amounts: number[]
}

export const TotalAmount = ({ amounts }: TotalAmountProps) => {
  const amount = amounts.reduce((prev, curr) => prev + curr, 0)
  if (amount > 0) return <p>Total: {amount.toFixed(2)}</p> 
  return <></>
}