import { ChangeEvent, useState } from "react"
import Members, { Member, MembersList } from './Members'

export default function Expense() {
  let [, setAmount] = useState(0)
  let [members, setMembers] = useState<MembersList>([])
  let [payer, setPayer] = useState<Member>()

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setAmount(parseInt(event.target.value))
  }

  function handleSelectPayer(event: ChangeEvent<HTMLSelectElement>) {
    let payer = members.find((member) => member.name === event.target.value)
    setPayer(payer)
  }

  function onMemberAdd(members: MembersList) {
    setMembers(members)
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
      <Members onChange={onMemberAdd} />
      <div>
        Paid by: {payer?.name}
        <select onChange={handleSelectPayer}>
          {members.map((member) => <option value={member.name}>{member.name}</option>)}
        </select>
      </div>
    </div>
  )
}