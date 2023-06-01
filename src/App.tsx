import React from 'react'
import { PostList, Comments } from './features'
import { Layout } from 'antd'

import classes from './App.module.css'

const { Content, Sider } = Layout

const App = () => (
  <Layout hasSider className={classes.layout}>
    <Sider className={classes.sider} width={300} theme="light">
      <PostList />
    </Sider>
    <Layout>
      <Content className={classes.content}>
        <Comments />
      </Content>
    </Layout>
  </Layout>
)

export default App
