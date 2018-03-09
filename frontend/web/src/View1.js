import React, { Component } from 'react';
import { Icon, Button, Input, List, Layout } from 'antd';
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

export class View1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: true,
            selectedItem: null
        };
    }

    componentWillMount() {
        this.setState({
            items: [
                { id: 1, title: 'title1' },
                { id: 2, title: 'title2' }
            ],
            selectedItem: { id: 1, title: 'title1', content: 'content1' },
            loading: false
        })
    }

    onItemDeleting(id) {
        console.log("onItemDeleting id => " + id)
    }

    onItemSelecting(id) {
        console.log("onItemSelecting id => " + id)
        this.setState({
            selectedItem: {
                id: 2,
                title: 'title2',
                content: 'content2'
            }
        });
    }

    onItemChange(item) {
        console.log("onItemChange id =>" + item.id + " title => " + item.title + " content => " + item.content);
        this.setState({
            selectedItem: item
        });
    }

    onItemSaving() {
        console.log("onItemSaving id => " + this.state.selectedItem.id);
    }

    render() {
        const { items, loading, selectedItem } = this.state;
        return (
            <Layout>
                <Layout>
                    <Sider style={{ backgroundColor: 'white', paddingBottom: '10px' }}>
                        <Button><Icon type="file-add" />New Item </Button>
                    </Sider>
                </Layout>
                <Layout>
                    <Sider style={{ backgroundColor: 'white', paddingRight: '10px' }} >
                        <NoteList
                            items={items}
                            loading={loading}
                            onItemDeleting={id => this.onItemDeleting(id)}
                            onItemSelecting={id => this.onItemSelecting(id)}
                        />
                    </Sider>
                    <Content style={{ padding: "10px" }}>
                        <NoteEditor
                            selectedItem={selectedItem}
                            onItemChange={item => this.onItemChange(item)}
                            onItemSaving={() => this.onItemSaving()}
                            onItemDeleting={id => this.onItemDeleting(id)}
                        />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

class NoteList extends Component {
    render() {
        const { loading, items, onItemDeleting, onItemSelecting } = this.props;
        return (
            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={items}
                renderItem={item =>
                    <List.Item actions={[<a onClick={() => onItemDeleting(item.id)}>X</a>]} >
                        <List.Item.Meta
                            title={<a onClick={() => onItemSelecting(item.id)} >{item.title}</a>}
                        />
                    </List.Item>
                }
            />
        );
    }
}

class NoteEditor extends Component {
    render() {
        const { loading, selectedItem, onItemSaving, onItemDeleting, onItemChange } = this.props;
        const { id, title, content } = selectedItem;
        return (
            <div>
                <div style={{ paddingBottom: '10px' }}>
                    <Input
                        placeholder={'enter title'}
                        disabled={loading}
                        defaultValue={title}
                        onChange={(e) => onItemChange({ ...selectedItem, title: e.target.value })} />
                </div>
                <div style={{ paddingBottom: '10px' }}>
                    <TextArea
                        placeholder={'enter content'}
                        rows={8}
                        disabled={loading}
                        defaultValue={content}
                        onChange={(e) => onItemChange({ ...selectedItem, content: e.target.value })}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => onItemDeleting(id)}
                        disabled={loading}>
                        <Icon type="delete" />Delete
                    </Button>
                    &nbsp;
                    <Button
                        type="primary"
                        onClick={() => onItemSaving()}
                        disabled={loading} >
                        <Icon type="save" />Save
                        </Button>
                </div>
            </div>
        );
    }
}