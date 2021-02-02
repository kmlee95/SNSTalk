import React from 'react';
import { Form } from 'antd';

const UserProfile = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-id">패스워드</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangeIdPassword}
          required
        />
      </div>
      <div></div>
    </Form>
  );
};

export default UserProfile;
