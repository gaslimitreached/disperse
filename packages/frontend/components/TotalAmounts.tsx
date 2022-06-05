interface TotalAmountProps {
  amounts: number[]
}

export const TotalAmount = ({ amounts }: TotalAmountProps) => {
  const amount = amounts.reduce((prev, curr) => prev + curr, 0)
  if(amount < 1) return <></>
  return <p>Total: {amount}</p> 
}