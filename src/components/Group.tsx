import { useCallback, useEffect, useState } from "react"
import Members, { MembersList } from "./Members"
import Expense, { ExpenseType } from "./Expense"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface AddExpenseDialogProps {
  open: boolean,
  onClose: ()=> void,
  members: MembersList,
  onSubmit: (expense: ExpenseType) => void,
  expense?: ExpenseType // ExpenseType | undefined
}

function AddExpenseDialog(props: AddExpenseDialogProps) {
  console.log('props.expense inside AddExpenseDialog: ', props.expense)
  let [expense, setExpense] = useState<ExpenseType|undefined>(props.expense)
  useEffect(() => { setExpense(props.expense)}, [setExpense, props.expense] )
  useEffect(() => {
    console.log('props.expense inside useEffect AddExpenseDialog: ', props.expense)
    console.log('expense inside AddExpenseDialog: ', expense)
  }, [props.expense, expense])

  const handleOnClose = useCallback(() => {
    // setExpense(undefined)
    props.onClose()
  }, [setExpense, props.onClose])

  const onChange = useCallback((updatedExpense: ExpenseType) => {
    console.log('updatedExpense', updatedExpense)
    setExpense(updatedExpense)
  }, [setExpense]) 

  const handleSubmit = useCallback(() => {
    if (!!expense) {
      props.onSubmit(expense)
      handleOnClose()
    }
  }, [handleOnClose, props.onSubmit, expense])

  return (
    <Dialog
      open={props.open}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>{!!expense ? "Edit Expense" : "New Expense"}</DialogTitle>
      <DialogContent>
        <Box sx={{p: 3}}>
          <pre>{JSON.stringify(expense, null, 2)}</pre>
          <Expense expense={expense} onChange={onChange} members={props.members} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" disabled={!expense} onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function Group() {
  let [members, setMembers] = useState<MembersList>([])
  let [expenses, setExpenses] = useState<ExpenseType[]>([])
  const [open, setExpenseOpen] = useState(false)
  const [expense, setExpense] = useState<ExpenseType>()
  const handleExpenseOpen = useCallback((expense: ExpenseType | undefined) => {
    setExpense(expense)
    setExpenseOpen(true)
    console.log('expense passed to modal: ', expense)
  }, [setExpense, setExpenseOpen, expense])

  const handleExpenseClose = useCallback(() => {
    console.log('modal was closed')
    setExpense(undefined)
    setExpenseOpen(false)
  }, [setExpense, setExpenseOpen])

  function createExpense(updatedExpense: ExpenseType) {
    setExpenses((expenses) => {
      return [...expenses, updatedExpense]
    })
  }

  function onMemberAdd(members: MembersList) {
    setMembers(members)
  }
  
  return (
    <div>
      <h1>Group</h1>
      <Members onChange={onMemberAdd} />
      <div>
        <h1>Expenses:</h1>
        <Button onClick={() => handleExpenseOpen(undefined)}>Add Expense</Button>
        <AddExpenseDialog onSubmit={createExpense} expense={expense} open={open} onClose={handleExpenseClose} members={members} />
        <ul>
          {expenses.map((expense) => <li key={expense.name}><a onClick={() => handleExpenseOpen(expense)}>{expense.name}</a></li>)}
        </ul>
      </div>
    </div> 
  )
}