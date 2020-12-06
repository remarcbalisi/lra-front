import {
  Row,
  Table,
  Space,
  Modal,
  Button,
  Form,
  Input
} from 'antd';
import useGlobalAuthUser from "../../global_hooks/auth_user"
import {useEffect, useState} from "react"

const Home = () => {
  const [auth, authActions] = useGlobalAuthUser();
  const { Column, ColumnGroup } = Table;
  const [modalState, setModalState] = useState({
    visible: false,
    edit_user: {
      name: ''
    },
    loading: false
  })

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
          <span
            style={{cursor: "pointer", color: "orange"}}
            onClick={()=> showModal(record)}>
            Edit
          </span>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    authActions.getUsers()
  }, []);

  const showModal = (user) => {
    setModalState({...modalState, edit_user: user, visible: true})
  };

  const handleCancel = () => {
    setModalState({ ...modalState, visible: false });
  };

  const onFinish = async (values) => {
    setModalState({ ...modalState, loading: true })
    values['role'] = modalState.edit_user.roles[0].name
    values['id'] = modalState.edit_user.id
    await authActions.updateUser(values)
    setModalState({ ...modalState, loading: false, visible: false })
    authActions.getUsers()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const RenderModal = () => {
    return (
      <Modal
          visible={modalState.visible}
          title={`Edit ${modalState.edit_user.name}`}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>
          ]}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: false,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input defaultValue={modalState.edit_user.name}/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: false,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input defaultValue={modalState.edit_user.email} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: false,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    )
  }

  return (
    <Row 
      justify="center" 
      align="middle" 
      style={{ paddingTop: "2%", height: "100vh", backgroundColor: "white" }}>
        <RenderModal />
        <Table dataSource={auth.users} columns={users_columns} rowKey="id"/>
    </Row>
  )
}

export default Home