import React, { Component } from 'react'
import { AddImg } from './AddImg';
import { MenuColorModal } from './MenuColorModal'
import { connect } from "react-redux";
import { updateBoard } from "../store/actions/boardActions";
import {Avatar} from '@material-ui/core';
import { VscChromeClose } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";
import { BsListNested } from "react-icons/bs";

export class _SideMenu extends Component {

state={
    isChooseImg:false,
    isChooseBgc:false,
    
   
}

onChangeBoardImg=()=>{
    this.setState({isChooseImg:true})
}
onChangeBoardColor=()=>{
    this.setState({isChooseColor:true})
}
onBackToMenu=()=>{
    this.setState({isChooseImg:false,isChooseColor:false})
}
onChangeImg=(imgUrl) =>{
    const board = this.props.board
    board.style.bgImg=imgUrl
    board.style.bgColor=''
    this.props.updateBoard(board)
    
}
onChangeColor=(color) =>{
    const board = this.props.board
    board.style.bgColor=color
    board.style.bgImg=''
    this.props.updateBoard(board)
    
}
    

    render(){
        const {activities}=this.props.board
    return (
        <div className="side-menu" >
        <div className="menu-header flex space-between"> <IoIosArrowBack  onClick={this.onBackToMenu}/>
       <span style={{color:'black'}}>Menu</span> <VscChromeClose  onClick={this.props.onToggleMenu}/></div>
       
        <hr/>
         {this.state.isChooseImg && <AddImg isForBoard={true} onAddimg={this.onChangeImg}/>}
         {this.state.isChooseColor && <MenuColorModal onAddColor={this.onChangeColor}/>}
        {!this.state.isChooseImg&&!this.state.isChooseColor&& <div>
        <div className="menu-actions flex column">
         <div className="menu-action flex" onClick={this.onChangeBoardImg}><FaFileImage/><span>Change board Img</span></div>
         <div className="menu-action flex" onClick={this.onChangeBoardColor}><MdColorLens/><span>Change board color</span></div>
        {/* <button className="btn" >delete</button> */}
        </div>
        <hr/>
        <div className="activity-log flex align-center"><BsListNested/><span> Activity</span></div>
       {activities&& <div>
        <ul className="side-menu-list">
        {activities.map(activity =><li>
        <Avatar key={activity.byMember._id} src={activity.byMember.imgUrl}>{activity.byMember.userName.substring(0, 1).toUpperCase()}
        {activity.byMember.userName.substring(1, 2).toUpperCase()}</Avatar>{activity.byMember.userName +' '}{activity.txt}</li> )}
        </ul></div>}
        
        
        </div>}
        </div>
    )
    
}
}

const mapStateToProps = (state) => {
    return {
      board: state.boardReducer.currBoard,
    };
  };
  const mapDispatchToProps = {
    updateBoard
  };
  export const SideMenu = connect(
    mapStateToProps,
    mapDispatchToProps
  )(_SideMenu);


