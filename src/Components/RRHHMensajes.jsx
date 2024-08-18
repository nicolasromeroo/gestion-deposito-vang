import React, { useState } from 'react';

const initialGroups = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Grupo ${index + 1}`,
  muted: false,
  notificationType: 'All',
}));

function RRHHMensajes() {
  const [groups, setGroups] = useState(initialGroups);

  const toggleMuteGroup = (id) => {
    setGroups(groups.map(group =>
      group.id === id ? { ...group, muted: !group.muted } : group
    ));
  };

  const changeNotificationType = (id, type) => {
    setGroups(groups.map(group =>
      group.id === id ? { ...group, notificationType: type } : group
    ));
  };

  const changeGroupName = (id, newName) => {
    setGroups(groups.map(group =>
      group.id === id ? { ...group, name: newName } : group
    ));
  };

  return (
    <div>
      <h2>Gestión de Grupos de WhatsApp</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <div>
              <input
                type="text"
                value={group.name}
                onChange={(e) => changeGroupName(group.id, e.target.value)}
              />
              <button onClick={() => toggleMuteGroup(group.id)}>
                {group.muted ? 'Activar Sonido' : 'Silenciar'}
              </button>
              <select
                value={group.notificationType}
                onChange={(e) => changeNotificationType(group.id, e.target.value)}
              >
                <option value="All">Todas</option>
                <option value="Mentions">Menciones</option>
                <option value="None">Ninguna</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RRHHMensajes;
