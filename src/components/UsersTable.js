import React, { useState, useEffect } from "react";
import { Table } from "antd";

const UsersTable = ({
  data,
  multiSelect,
  onSelect,
  clearSelections,
  setClearSelections,
}) => {
  const [selectedUserId, setSelectedUserId] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  useEffect(() => {
    setSelectedUserId([]);
    setClearSelections(false);
  }, [clearSelections, setClearSelections]);

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: !multiSelect ? [selectedUserId] : selectedUserId,
          onSelect: (r) => {
            if (onSelect) {
              onSelect(r);
            }
            if (!multiSelect) {
              setSelectedUserId(r.id);
            } else {
              if (selectedUserId.includes(r.id)) {
                setSelectedUserId((users) => {
                  return [...users].filter((u) => u !== r.id);
                });
              } else {
                setSelectedUserId((users) => {
                  return [...users, r.id];
                });
              }
            }
          },
        }}
        onRow={(r) => {
          return {
            onClick: () => {
              if (onSelect) {
                onSelect(r);
              }
              if (!multiSelect) {
                setSelectedUserId(r.id);
              } else {
                if (selectedUserId.includes(r.id)) {
                  setSelectedUserId((users) => {
                    return [...users].filter((u) => u !== r.id);
                  });
                } else {
                  setSelectedUserId((users) => {
                    return [...users, r.id];
                  });
                }
              }
            },
          };
        }}
      />
    </div>
  );
};

export default UsersTable;
