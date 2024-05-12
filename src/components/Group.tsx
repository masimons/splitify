import { useState } from "react"
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
  onSubmit: (expense: ExpenseType) => void
}

function AddExpenseDialog(props: AddExpenseDialogProps) {
  let [expense, setExpense] = useState<ExpenseType|undefined>()

  function onChange(updatedExpense: ExpenseType) {
    setExpense(updatedExpense)
  }

  function handleSubmit() {
    if (!!expense) {
      props.onSubmit(expense)
      props.onClose()
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>New Expense</DialogTitle>
      <DialogContent>
        <Box sx={{p: 3}}>
          <Expense onChange={onChange} members={props.members} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" disabled={!expense} onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function Group() {
  let [members, setMembers] = useState<MembersList>([])
  let [expenses, setExpenses] = useState<ExpenseType[]>([])
  const [open, setExpenseOpen] = useState(false)
  const handleExpenseOpen = () => setExpenseOpen(true)
  const handleExpenseClose = () => setExpenseOpen(false)

  // function handleExpenseClose() {
  //   setExpenseOpen(false)
  // }

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
        <Button onClick={handleExpenseOpen}>Add Expense</Button>
        <AddExpenseDialog onSubmit={createExpense} open={open} onClose={handleExpenseClose} members={members} />
        {expenses.map((expense) => expense.name)}
      </div>
    </div> 
  )
}