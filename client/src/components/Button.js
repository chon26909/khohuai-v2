import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
    <Link to='sign-up'>
      <button className='signup-btn'>ลงชื่อเข้าใช้</button>
    </Link>
  );
}
