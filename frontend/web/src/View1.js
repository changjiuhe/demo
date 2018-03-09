import React, { Component } from 'react';
import { Spin, Card, Icon, Button, Input, List, Layout } from 'antd';
const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

export class View1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loading: true,
            editing: false,
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
        console.log("onItemDeleting id => " + id);
    }

    onItemEditing() {
        console.log("onItemEditing");
        this.setState({
            editing: true
        })
    }

    onItemSelecting(id) {
        console.log("onItemSelecting id => " + id);
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

        this.setState({
            editing: false
        });
    }

    render() {
        const { items, loading, selectedItem } = this.state;
        return (
            <Spin spinning={loading} >
                <Layout>
                    <Sider style={{ backgroundColor: 'white', paddingRight: '10px' }} >
                        <Button><Icon type="file-add" />New Item </Button>
                        <NoteList
                            items={items}
                            loading={loading}
                            onItemDeleting={id => this.onItemDeleting(id)}
                            onItemSelecting={id => this.onItemSelecting(id)}
                        />
                    </Sider>
                    <Content style={{ padding: "10px" }}>
                        {this.state.editing &&
                            <NoteEditor
                                selectedItem={selectedItem}
                                onItemChange={item => this.onItemChange(item)}
                                onItemSaving={() => this.onItemSaving()}
                                onItemDeleting={id => this.onItemDeleting(id)}
                            />
                        }
                        {!this.state.editing &&
                            <NoteDetail
                                selectedItem={selectedItem}
                                onItemEditing={() => this.onItemEditing()}
                            />
                        }

                    </Content>
                </Layout>
            </Spin>
        );
    }
}

class NoteList extends Component {
    render() {
        const { items, onItemDeleting, onItemSelecting } = this.props;
        return (
            <List
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

class NoteDetail extends Component {
    render() {
        const { selectedItem, onItemEditing } = this.props;
        const { title, content } = selectedItem;
        return (
            <Card title={title} extra={<Button onClick={() => onItemEditing()} ><Icon type="edit" />Edit</Button>} >
                {content}
            </Card>
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
                        defaultValue={title}
                        onChange={(e) => onItemChange({ ...selectedItem, title: e.target.value })} />
                </div>
                <div style={{ paddingBottom: '10px' }}>
                    <TextArea
                        placeholder={'enter content'}
                        rows={8}
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
                        onClick={() => onItemSaving()}>
                        <Icon type="save" />Save
                        </Button>
                </div>
            </div>
        );
    }
}