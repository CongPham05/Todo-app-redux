import { Col, Row, Input, Button, Select, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addNewTodo } from './todoSlice';
import { todosRemainningSelector } from '../../redux/selectors';
import Todo from '../Todo';

export default function TodoList() {
  let [nameTodo, setNameTodo] = useState("");
  let [priority, setPriority] = useState("Medium")
  const dispatch = useDispatch();


  const handleNameTodo = (e) => {
    setNameTodo(e.target.value)
  }
  const handlePriority = (value) => {
    setPriority(value)
  }
  const handleAddTodo = () => {
    setNameTodo("");
    dispatch(addNewTodo(
      {
        id: uuidv4(),
        name: nameTodo,
        completed: false,
        priority: priority
      }))
  }

  const todos = useSelector(todosRemainningSelector);
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todos.map(todo => {
          return <Todo key={todo.id} name={todo.name} idTodo={todo.id}
            priority={todo.priority} completed={todo.completed}

          />
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input onChange={handleNameTodo} value={nameTodo} placeholder="Input add todo..." />
          <Select defaultValue="Medium" onChange={handlePriority}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
