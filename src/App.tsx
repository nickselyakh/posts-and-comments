import React from 'react'
import { PostList, Comments } from './components'
import { Layout } from 'antd'

const { Content, Sider } = Layout

const App = () => (
  <Layout hasSider>
    <Sider
      width={300}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        padding: '20px',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      theme="light"
    >
      <PostList />
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 300 }}>
      <Content style={{ margin: '24px 16px 0', height: '100vh', overflow: 'auto' }}>
        <Comments />
      </Content>
    </Layout>
  </Layout>
)

export default App
