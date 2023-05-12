// import {
//     AppstoreOutlined,
//     MailOutlined,
//   } from '@ant-design/icons';
  import { Layout, Menu, theme,Input, Button} from 'antd';
  import React, { useState } from 'react';
  const { Header, Content,  Sider } = Layout;
  function getItem(label, key,icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
      getItem('菜单一', 'sub1',null, [
      getItem('子菜单1-1', '1', null,  ),
      getItem('子菜单1-2', '2', null,),
    ]),
    getItem('菜单二', 'sub2', null,[
      getItem('子菜单2-1', '5'),
      getItem('子菜单2-2', '6'),
      getItem('子菜单2-3', '7'),
    ]),
  ];
  const App = () => {
    const [content, setContent] = useState(items[0].children[0].label)
    const [meauitems, setMeauitems] = useState(items)
    const [keyPath, setKeyPath] = useState(["1,sub1"])
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const MenuClick = (e) => {
        console.log(e)
        setKeyPath(e.keyPath)
            let meau = items.find(item=>item.key===e.keyPath[1]).children.find(item=>item.key===e.keyPath[0])
            setContent(meau.label)
            return
      };
    const onChange=(e)=>{
        setContent(e.target.value)
    }
    const onClick=()=>{
        console.log(content)
        let meau = meauitems.map((item)=>{
            if(item.key===keyPath[1]){
                item.children = item.children.map(item=>{
                    if(item.key===keyPath[0]) item.label = content
                    return item
                })
            }
            return item
        })
        setMeauitems(meau)
    }
    return (
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}/>
              <Menu
                    onClick={MenuClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme='dark'
                    items={meauitems}
                    />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }} />
          <Content
            style={{
              margin: '24px 16px 0',
              minHeight:"80vh",
              overflow: 'initial',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer,
              }}
            >
              <Input value={content} onChange={onChange}  placeholder="请选择菜单" />
              <div style={{marginTop:"20px"}}><Button type="primary" onClick={onClick} >保存</Button></div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default App;