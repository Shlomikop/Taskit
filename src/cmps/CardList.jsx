import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Droppable } from 'react-beautiful-dnd'
import { CardPreview } from './CardPreview'
import { AddText } from './AddText'
import styled from 'styled-components'
import { SimpleMenu } from './CardListMenu'
import EditableLabel from 'react-inline-editing'
import Scroll from 'react-scroll';
import { updateBoard } from '../store/actions/boardActions'
var Element = Scroll.Element;

const Container = styled.div`
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? '#3493A5' : 'inherit')};
min-height:40px;
`

export class _CardList extends Component {

    state = {
        isAddCard: false,
        isDeleteGroup: false,

    }


    updateState = (key, val) => {
        this.setState({ [key]: val })
    }
    onRemoveGroup = (groupId) => {
        this.props.onRemoveGroup(groupId)
    }
    onShowDeleteTogglle = () => {
        let isDelete = !this.state.isDeleteGroup
        this.setState({ isDeleteGroup: isDelete })
    }



    handleFocusOut = (groupTitle) => {
        const board = this.props.board
        let groups = Array.from(board.groups)
        const idx = groups.findIndex(group => group.id === this.props.group.id)
        let group = this.props.group
        console.log("handleFocusOut -> group", group)
        group.title = groupTitle
        groups.splice(idx, 1, group)
        board.groups = groups
        this.props.updateBoard(board)

    }


  


    calcProgress = (cardId) => {

        const cards = this.props.group.cards
        const card = cards.find(card => card.id === cardId)
        if (card.checklist && card.checklist.todos) {
            const tasks = card.checklist.todos.length
            const doneTasks = (card.checklist.todos.filter(task => task.isDone === true)).length
            return (`${doneTasks}/${tasks}`)
        } return ''

    }



    render() {
        const group = this.props.group
        return (
            <div style={{ backgroundColor: (group.bgColor) ? group.bgColor : '#ebecf0' }} className="card-list flex column" id="card-container">
                <header className="card-header flex space-between align-center">
                  
                        <EditableLabel text={group.title} onFocus={this.onFocus} onFocusOut={this.handleFocusOut}
                            isEditing={this.state.isEditing,''}
                            inputWidth='200px'
                            inputHeight='34px'
                            cursor='pointer'
                            // inputMaxLength='50'
                            labelFontWeight='bold'
                            inputFontWeight='400' />
                   
                   <SimpleMenu isDeleteGroup={this.state.isDeleteGroup} onAddCard={this.updateState} onShowDeleteTogglle={this.onShowDeleteTogglle} onRemove={this.onRemoveGroup} group={group} />
                </header>
                <Element style={{
                    height: 'auto',
                    width: '100%',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    paddingLeft: '8px',
                    paddingRight: '4px'
                }}>

                    <Droppable droppableId={group.id}>
                        {(provided, snapshot) => (

                            <Container ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}>
                                {group.cards.map((card, index) => <CardPreview calcProgress={this.calcProgress} index={index} card={card} key={card.id} updateState={this.props.updateState} groupId={group.id} />)}
                                {provided.placeholder}
                            </Container>
                        )}</Droppable>

                </Element>
                {this.state.isAddCard ?
                    <AddText onAdd={this.props.onAdd} type="Card" groupId={group.id} updateState={this.updateState} />
                    :
                    <button className=" add-card-btn" onClick={() => this.updateState('isAddCard', true)}>+ Add card</button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    board: state.boardReducer.currBoard
})

const mapDispatchToProps = {
    updateBoard,
}

export const CardList = connect(mapStateToProps, mapDispatchToProps)(_CardList)