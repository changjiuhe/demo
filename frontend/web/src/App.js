import './App.css';

import { View1 } from './View1';
import { View2 } from './View2';
import { View3 } from './View3';

import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentView: "View1"
    };
  }
  componentDidMount() {

  }
  onViewSelected(view) {
    console.log(view);
    this.setState({ currentView: view });
  }
  renderView() {
    switch (this.state.currentView) {
      case "View1":
        return (
          <View1 />
        );
      case "View2":
        return (
          <View2 />
        );
      case "View3":
        return (
          <View3 />
        );
      default:
        return (
          <View1 />
        );
    }
  }
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['View1']}
            style={{ lineHeight: '64px' }}
            onSelect={(e) => this.onViewSelected(e.key)}
          >
            <Menu.Item key="View1" >View 1</Menu.Item>
            <Menu.Item key="View2" >View 2</Menu.Item>
            <Menu.Item key="View3" >View 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.currentView}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            {this.renderView()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Demo ©2018 Created by HCJ
    </Footer>
      </Layout>
    );
  }
}

export default App;
