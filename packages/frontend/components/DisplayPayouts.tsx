
interface DisplayPayoutProps {
  targets: string[]
  amounts: number[]
}

const arrangePayouts = (targets: string[], amounts: number[]) => {
  if (targets && targets[0].length < 1) return []
  return targets.map((t: string, i: number) => [t, amounts[i]])
}

export const DisplayPayout = ({ targets, amounts }: DisplayPayoutProps) => {
  const payouts = arrangePayouts(targets, amounts)
  const elems = payouts.map(([target, amount]) => <p>{target + " -> " + amount}</p>)
  return <div>{ elems.length > 0 ? elems : <></>}</div>
}