import {
  Row,
  Col,
  Table,
  Space,
  Modal,
  Button,
  Form,
  Input,
  Popconfirm,
  message
} from 'antd';
import useGlobalAuthUser from "../../global_hooks/auth_user"
import React, {useEffect, useState} from "react"

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
          <Popconfirm
              title={`Are you sure to delete ${record.name}?`}
              onConfirm={(e) => confirm(e, record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
          >
            <a href="#" style={{color: "red"}}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    authActions.getUsers();

    return () => {
      setModalState({
        visible: false,
        edit_user: {
          name: ''
        },
        loading: false
      });
    }
  }, []);

  const showModal = (user) => {
    setModalState({...modalState, edit_user: user, visible: true})
  };

  const handleCancel = () => {
    setModalState({ ...modalState, visible: false });
  };

  const onFinish = async (values) => {
    setModalState({ ...modalState, loading: true })
  
    if(modalState.edit_user.id) {
      values['role'] = modalState.edit_user.roles[0].name
      values['id'] = modalState.edit_user.id
      await authActions.updateUser(values)      
    }
    else {
      values['role'] = 'customer';
      await authActions.createUser(values);
    }

    setModalState({ ...modalState, loading: false, visible: false })
    authActions.getUsers()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleCreateUser = () => {
    showModal({
      id: '',
      name: '',
      email: '',
      password: ''
    });
  }

  const confirm = async (e, user) => {
    console.log(e);
    await authActions.deleteUser({id: user.id})
    message.success(`Successfully deleted ${user.name}`);
    await authActions.getUsers();
  }

  const cancel = (e) => {
    console.log(e);
  }

  const RenderModal = () => {
    const modal_title = modalState.edit_user.id === '' ? 'Create' : `Edit ${modalState.edit_user.name}`
    const button_label = modalState.edit_user.id === '' ? 'Create' : 'Update'
    return (
      <Modal
          visible={modalState.visible}
          title={modal_title}
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
              name: modalState.edit_user.name,
              email: modalState.edit_user.email,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
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

            {
              modalState.edit_user.id === '' &&
              (
                <Form.Item
                  label="Confirm Password"
                  name="password_confirmation"
                  rules={[
                    {
                      required: false,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              )
            }

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {button_label}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    )
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "white" }}>
      <RenderModal />
      <Row
        style={{ paddingTop: "2%"}}>
          <Col span={12} offset={6} style={{ textAlignLast: 'end' }}>
            <Button type="primary" onClick={() => handleCreateUser()}>Create new</Button>
          </Col>
          <Col span={12} offset={6}>
            <Table dataSource={auth.users} columns={users_columns} rowKey="id"/>
          </Col>
      </Row>
    </div>
  )
}

export default Home