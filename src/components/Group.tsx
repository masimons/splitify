import { useState } from "react"
import Members, { MembersList } from "./Members"
import Expense from "./Expense"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

interface AddExpenseDialogProps {
  open: boolean,
  onClose: ()=> void
}

function AddExpenseDialog(props: AddExpenseDialogProps) {
 

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{p: 3}}>
        <Expense></Expense>
      </Box>
    </Dialog>
  )
}

export default function Group() {
  let [members, setMembers] = useState<MembersList>([])
  // let [expenses, setExpenses] = useState<Expense[]>([])
  const [open, setExpenseOpen] = useState(false)
  const handleExpenseOpen = () => setExpenseOpen(true)
  const handleExpenseClose = () => setExpenseOpen(false)

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
        <AddExpenseDialog open={open} onClose={handleExpenseClose} />
        {/* {expenses.map((expense) => expense.name)} */}
      </div>
    </div> 
  )
}