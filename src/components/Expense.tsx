import { ChangeEvent, useState } from "react"
import { Member, MembersList } from './Members'

export type Expense = {
  amount: number,
  payer: Member,
  involvedMembers: Member[]
}

export default function Expense(members: MembersList) {
  let [, setAmount] = useState(0)
  let [payer, setPayer] = useState<Member>()

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(parseInt(event.target.value))
  }

  function handleSelectPayer(event: ChangeEvent<HTMLSelectElement>) {
    let payer = members.members.find((member) => member.uuid === event.target.value)
    setPayer(payer)
  }

  return (
    <div>
      <div>
        Expense
      </div>
      <div>
        Amount:
        <input onChange={handleAmountChange} />
      </div>
      <div>
        Paid by: {payer?.name}
        <select onChange={handleSelectPayer}>
          {members.members.map((member) => <option value={member.uuid}>{member.name}</option>)}
        </select>
      </div>
    </div>
  )
}