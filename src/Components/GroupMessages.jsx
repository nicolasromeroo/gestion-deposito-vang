
const GroupMessages = ({ group, messages, onSendMessage }) => (
    <div>
      <h2>{group.name}</h2>
      <div>
        {messages.map(msg => <p key={msg.id}>{msg.text}</p>)}
      </div>
      <input type="text" onKeyPress={(e) => { if (e.key === 'Enter') onSendMessage(e.target.value) }} />
    </div>
  );
export default GroupMessages  