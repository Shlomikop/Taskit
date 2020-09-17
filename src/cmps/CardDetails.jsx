import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { boardService } from '../services/boardService'

export class _CardDetails extends Component {

    state = {
        card: null
    }
    async componentDidMount() {
        const card = await boardService.getCardById(this.props.board, this.props.groupId, this.props.cardId)
        this.setState({ card })
    }
    onRmoveModal = () => {
        this.props.updateState('isDetailsShown', false)
    }
    onHandleRemove = () => {
        this.onRmoveModal()
        this.props.onRemoveCard(this.state.card.id)
    }

    render() {
        if (!this.state.card) return <div>Loading...</div>
        const card = this.state.card
        console.log("render -> card", card)
        return (
            <div className="card-modal">
                <div className="empty-modal" onClick={this.onRmoveModal}></div>
                <div className="details-modal">
                    <header className="card-header flex space-between">
                        <h3>{card.title}</h3>
                        <button onClick={this.onRmoveModal}>X</button>
                    </header>
                    <button>Invit</button>
                    <section className="avatar-members flex">
                        {card.assignedMembers &&
                            <AvatarGroup max={3}>
                                {card.assignedMembers.map(member => {
                                    console.log("render -> member", member)
                                    return member.imgUrl ?
                                        <Avatar key={member._id} asrc={member.imgUrl}></Avatar>
                                        :
                                        <Avatar key={member._id} src={member.imgUrl}>{member.userName.substring(0, 1).toUpperCase()}{member.userName.substring(1, 2).toUpperCase()}</Avatar>
                                }
                                )}
                            </AvatarGroup>
                        }
                    </section>
                    <p>description:</p>
                    {/* <textarea>{card.description}</textarea> */}

                    <button onClick={this.onHandleRemove} className="btn">Delete Card</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard
    }
}
const mapDispatchToProps = {

}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
