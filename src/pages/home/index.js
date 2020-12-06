import {
  Row,
  Col,
  Table,
  Space
} from 'antd';
import useGlobalAuthUser from "../../global_hooks/auth_user"
import {useEffect} from "react"

const Home = () => {
  const [auth, authActions] = useGlobalAuthUser();
  const { Column, ColumnGroup } = Table;

  const users_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    authActions.getUsers()
  }, []);

  return (
    <Row 
      justify="center" 
      align="middle" 
      style={{ paddingTop: "2%", height: "100vh", backgroundColor: "white" }}>
        <Table dataSource={auth.users} columns={users_columns} rowKey="id"/>
    </Row>
  )
}

export default Home