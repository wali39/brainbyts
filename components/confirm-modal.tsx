"use client";

import { Modal } from "antd";
import { useState } from "react";

const ConfirmModal = ({
  onConfirm,
  children,
}: {
  onConfirm: () => void;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <span onClick={() => setIsModalOpen(true)}>{children}</span>
      <Modal
        title="Confirm delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: ` bg-primary text-white` }}
      >
        Are you sure? This action can not be undone!
      </Modal>
    </>
  );
};

export default ConfirmModal;
