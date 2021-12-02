import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplete from '../components/admin/adminmodal/ModalTemplete';
import { adminOpen } from '../redux/admin/action';

export default function AdminPage() {
  const isOpen = useSelector((state) => state.adminOpenReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminOpen());
  }, [dispatch]);
  return <div>{isOpen ? <ModalTemplete /> : null}</div>;
}
