import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Member, MembersList } from './Members'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

export type ExpenseType = {
  name: string,
  amount: number,
  payer: Member,
  involvedMembers: string[]
}

type FormExpense = {
  name: string,
  amount: number,
  payer: Member | null,
  involvedMembers: string[]
}

interface ExpenseProps {
  members: MembersList,
  expense?: ExpenseType,
  onChange: (updatedExpense: ExpenseType) => void;
}

function isValid(expense: ExpenseType): boolean {
  if (expense.name.length > 0
    && expense.amount > 0
    && expense.involvedMembers?.length > 0
    && Boolean(expense.payer)
  ) {
    return true
  }

  return false
}

function buildExpense({
  name,
  amount,
  payer,
  involvedMembers,
}: FormExpense): ExpenseType | null {
  if (payer === null) {
    return null
  }

  return {
    name,
    amount,
    payer,
    involvedMembers
  } satisfies ExpenseType
}

export default function Expense(props: ExpenseProps) {
  let [name, setName] = useState<ExpenseType["name"]>(props.expense?.name || "")
  let [amount, setAmount] = useState<ExpenseType["amount"]>(props.expense?.amount || 0)
  let [payer, setPayer] = useState<ExpenseType["payer"] | null>(null)
  let [involvedMembers, setInvolvedMembers] = useState<ExpenseType["involvedMembers"]>([])

  useEffect(
    () => {
      const expense = buildExpense({name, amount, payer, involvedMembers})
      if (!!expense && isValid(expense)) {
        props.onChange(expense)
      }
    }
  ,[name, amount, payer, involvedMembers, props.onChange])

  const handleAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value))
  }, [setAmount])

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }, [setName])

  const handleInvolvedMemberChange = useCallback((event: SelectChangeEvent<typeof involvedMembers>) => {
    setInvolvedMembers([...event.target.value])
  }, [setInvolvedMembers])

  const handleSelectPayer = useCallback((event: SelectChangeEvent<string>) => {
    let payer = props.members.find((member) => member.uuid === event.target.value)
    if (typeof payer !== "undefined") {
      setPayer(payer)
    }
  }, [setPayer])

  return (
    <div>
      <div style={{paddingBottom: '20px'}}>
        <span style={{paddingRight: '10px'}}>Expense name:</span>
        <input value={name} onChange={handleNameChange} />
      </div>
      <div style={{paddingBottom: '20px'}}>
        <span style={{paddingRight: '10px'}}>Amount:</span>
        <input onChange={handleAmountChange} />
      </div>
      <div>
        <span style={{paddingRight: '10px'}}>Paid by: {payer?.name}</span>
        <Select
          onChange={handleSelectPayer}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={payer?.uuid || ''}
          label="Payer">
          {props.members.map((member) => <MenuItem key={member.uuid} value={member.uuid}>{member.name}</MenuItem>)}
        </Select>
      </div>
      <div>
        <span>Involved members: </span>
        <Select
          label="Involved parties"
          multiple
          value={involvedMembers}
          onChange={handleInvolvedMemberChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {props.members.map((member) => (
            <MenuItem
              key={member.uuid}
              value={member.uuid}
            >
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}