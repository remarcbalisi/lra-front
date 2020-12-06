import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox
} from 'antd';
import API from "../../helpers/api"
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const history = useHistory()
  const bearer_token = localStorage.getItem('bearer_token')

  useEffect(async () => {
    
    if (bearer_token) {
      history.push("/home");
    }

  }, []);

  const onFinish = async (values) => {
    const {data: {data}} = await API.post('/user/login', values)
    localStorage.setItem('bearer_token', "Bearer " + data.token);
    history.push("/home");
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ paddingTop: "2%" }}>
      <Col span={12}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;