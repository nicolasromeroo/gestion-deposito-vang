
const GroupList = ({ groups, onSelectGroup }) => (
    <ul>
        {groups.map(group => (
            <li key={group.id} onClick={() => onSelectGroup(group)}>
                {group.name}
            </li>
        ))}
    </ul>
);

export default GroupList