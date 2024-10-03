import React from 'react';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <h1>Chatroom</h1>
      <div style={{ flex: 1, width: '100%', maxWidth: '600px', borderRadius: '15px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto', marginBottom: '20px' }}>
        {/* Messages will be displayed here */}
      </div>
      <div style={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
        <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '10px', borderRadius: '15px 0 0 15px', border: '1px solid #ccc' }} />
        <button style={{ padding: '10px 20px', borderRadius: '0 15px 15px 0', border: '1px solid #ccc', backgroundColor: '#0070f3', color: '#fff' }}>Send</button>
      </div>
    </div>
  );
};

export default HomePage;