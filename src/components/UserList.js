import React, { useState, useEffect } from "react";
import { getUsers } from "../api";
import UsersTable from "./UsersTable";
import { Button, Spin, Divider } from "antd";
import { UserCardsDiv, UserCard, Title, ButtonToolBar} from "../styling/styling";
import { Card, Avatar } from "antd";
import { UserOutlined, MailOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [clearSelections, setClearSelections] = useState(false);

  const onSelectUser = (user) => {
    if (selectedUsers.map((user) => user.id).includes(user.id)) {
      // if user has already been selected -  remove from array
      setSelectedUsers((users) => {
        return [...users].filter((u) => u.id !== user.id);
      });
    } else {
      //else add user to the array
      setSelectedUsers((users) => {
        return [...users, user];
      });
    }
  };
  const sortAscending = (e) =>{
    const sorted = selectedUsers.map(u=>u).sort(function(a, b) {
       const textA = a.name.toLowerCase();
       const textB = b.name.toLowerCase();
       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      setSelectedUsers(sorted)
   }

const sortDescending = () =>{
  const sorted = selectedUsers.map(u=>u).sort(function(a, b) {
    const textA = a.name.toLowerCase();
    const textB = b.name.toLowerCase();
    return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
    })
     setSelectedUsers(sorted)
}
  useEffect(() => {
    setSelectedUsers([])
    setIsLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <>
        <Spin size="large" />
        <h3>LOADING....</h3>
      </>
    );
  if (error) return <h3>Error: {`${error}`}</h3>;

  return (
    <div>
      <Title center>Please Select Users From The Table To Create A List</Title>
      {users && (
        <>
          <UsersTable
            multiSelect
            onSelect={onSelectUser}
            data={users}
            clearSelections={clearSelections}
            setClearSelections={setClearSelections}
            hideSelectAll={true}
          ></UsersTable>
          <Divider></Divider>
          <Button
            type="danger"
            onClick={() => {
              setClearSelections(true);
              setSelectedUsers([]);
            }}
          >
            Clear Users
          </Button>
        </>
      )}

      {selectedUsers.length > 0 && (
        <>
          <Divider></Divider>
          <Title center>End User's List ({`${selectedUsers.length} ${selectedUsers.length === 1 ? "user" : "users" }`})</Title>
          <ButtonToolBar>
          <Button type="primary" icon={<SortAscendingOutlined />} onClick={sortAscending}>Sort Ascending</Button>
          <p style={{marginBottom: 0}}>Sort Alphabetically</p>
          <Button type="primary" icon={<SortDescendingOutlined />} onClick={()=>sortDescending()}>Sort Descending</Button>
          </ButtonToolBar>
          <UserCardsDiv>
            {selectedUsers.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  style={{ width: 350 }}
                  cover={
                    <img
                      alt="example"
                      src="https://media-exp1.licdn.com/dms/image/C561BAQGLvRyBUWcYBQ/company-background_10000/0/1579769052996?e=2159024400&v=beta&t=d5K8c2QgR_rT1GpAhoXs50zOrQWPXYRKPcIzboAqNYk"
                    />
                  }
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                      <span>
                        <UserOutlined style={{ marginRight: "1em" }} />
                        {user.name}
                      </span>
                    }
                    description={
                      <span>
                        <MailOutlined style={{ marginRight: "1em" }} />
                        {user.email}
                      </span>
                    }
                  />
                </UserCard>
              );
            })}
          </UserCardsDiv>
        </>
      )}
    </div>
  );
};

export default UserList;
