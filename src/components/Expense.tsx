import { ChangeEvent, useEffect, useState } from "react"
import { Member, MembersList } from './Members'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export type ExpenseType = {
  name: string,
  amount: number,
  payer: Member,
  involvedMembers: Member[]
}

interface ExpenseProps {
  members: MembersList,
  onChange: (updatedExpense: ExpenseType) => void;
}

export default function Expense(props: ExpenseProps) {
  let [expense, setExpense] = useState<ExpenseType>({} as ExpenseType)

  useEffect(
    () => { 
      if (isValid()) {
        props.onChange(expense)
      }
     }
  ,[expense])

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setExpense((expense) => ({...expense, amount: parseInt(event.target.value)}))
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setExpense((expense) => ({...expense, name: event.target.value}))
  }

  function handleSelectPayer(event: SelectChangeEvent<string>) {
    let payer = props.members.find((member) => member.uuid === event.target.value)
    if (typeof payer !== undefined) {
      setExpense((expense) => ({...expense, payer: payer as Member}))
    }
  }

  function isValid(): boolean {
    
  }

  return (
    <div>
      <div style={{paddingBottom: '20px'}}>
        <span style={{paddingRight: '10px'}}>Expense name:</span>
        <input onChange={handleNameChange} />
      </div>
      <div style={{paddingBottom: '20px'}}>
        <span style={{paddingRight: '10px'}}>Amount:</span>
        <input onChange={handleAmountChange} />
      </div>
      <div>
        <span style={{paddingRight: '10px'}}>Paid by: {expense.payer?.name}</span>
        <Select
          onChange={handleSelectPayer}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={expense.payer?.name}
          label="Payer">
          {props.members.map((member) => <MenuItem key={member.uuid} value={member.uuid}>{member.name}</MenuItem>)}
        </Select>
      </div>
    </div>
  )
}