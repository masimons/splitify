import { useEffect, useState } from "react";

export type Member = {name: string}
export type MembersList = Member[]
interface MembersProps {
  onChange: (members: MembersList)=> void;
}

export default function Members({onChange}: MembersProps) {
  let [members, setMembers] = useState<MembersList>([]);

  useEffect(() => {
    onChange(members)
  }, [members])

  function handleClick() {
    const name = prompt("Member name:")
    if(name) {
      setMembers([...members, { name }])
    }
  }

  return (
    <div>
      <h1>Members:</h1>
      {members.map((member) => member.name).join(', ')}
      <div><button onClick={handleClick}>+</button></div>
    </div>
  )
}